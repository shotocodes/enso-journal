"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { type Locale, t, tFormat } from "@/lib/i18n";
import type { DailyJournal, ManualEntry, EntryIcon } from "@/types";
import { ENTRY_ICONS } from "@/types";
import { TrashIcon, MoodFace1, MoodFace2, MoodFace3, MoodFace4, MoodFace5 } from "@/components/Icons";

const MOOD_FACES = [MoodFace1, MoodFace2, MoodFace3, MoodFace4, MoodFace5] as const;

interface TodayTabProps {
  locale: Locale;
  entries: DailyJournal[];
  onEntriesChange: (entries: DailyJournal[]) => void;
}

function getTodayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function getTimeOfDay(): "morning" | "afternoon" | "evening" | "night" {
  const h = new Date().getHours();
  if (h < 6) return "night";
  if (h < 12) return "morning";
  if (h < 18) return "afternoon";
  if (h < 22) return "evening";
  return "night";
}

function formatDate(dateStr: string, locale: Locale): string {
  const d = new Date(dateStr + "T00:00:00");
  const loc = locale === "ja" ? "ja-JP" : locale === "en" ? "en-US" : locale === "zh" ? "zh-CN" : "ko-KR";
  return d.toLocaleDateString(loc, { month: "long", day: "numeric", weekday: "long" });
}

function getNowTime(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

export default function TodayTab({ locale, entries, onEntriesChange }: TodayTabProps) {
  const [todayStr, setTodayStr] = useState(getTodayStr);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [showAiGenerate, setShowAiGenerate] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // 日付変更検知
  useEffect(() => {
    const handler = () => {
      const now = getTodayStr();
      if (now !== todayStr) setTodayStr(now);
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [todayStr]);

  // 今日のエントリーを取得 or 作成
  const today = useMemo(() => {
    return entries.find((e) => e.date === todayStr) ?? null;
  }, [entries, todayStr]);

  const ensureTodayExists = useCallback((): DailyJournal => {
    const existing = entries.find((e) => e.date === todayStr);
    if (existing) return { ...existing, notes: existing.notes ?? [] };
    const newEntry: DailyJournal = {
      date: todayStr,
      notes: [],
      manualEntries: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onEntriesChange([newEntry, ...entries]);
    return newEntry;
  }, [entries, todayStr, onEntriesChange]);

  // デバウンス付き更新
  const updateToday = useCallback((updater: (entry: DailyJournal) => DailyJournal) => {
    const current = ensureTodayExists();
    const updated = updater({ ...current, updatedAt: new Date().toISOString() });
    const next = entries.map((e) => (e.date === todayStr ? updated : e));
    if (!entries.find((e) => e.date === todayStr)) next.unshift(updated);
    // React state は即座に更新
    onEntriesChange(next);
  }, [entries, todayStr, ensureTodayExists, onEntriesChange]);

  // 3年日記: 去年と一昨年の同日
  const flashbacks = useMemo(() => {
    const [y, m, d] = todayStr.split("-");
    const results: { year: number; label: string; entry: DailyJournal | null }[] = [];
    for (let offset = 1; offset <= 2; offset++) {
      const pastDate = `${Number(y) - offset}-${m}-${d}`;
      const entry = entries.find((e) => e.date === pastDate) ?? null;
      results.push({
        year: Number(y) - offset,
        label: offset === 1 ? t("today.flashback", locale) : t("today.flashback2", locale),
        entry,
      });
    }
    return results;
  }, [entries, todayStr, locale]);

  // ストリーク計算
  const streak = useMemo(() => {
    const dates = new Set(entries.map((e) => e.date));
    let count = 0;
    const current = new Date();
    for (let i = 0; i < 1000; i++) {
      const dateStr = current.toISOString().slice(0, 10);
      if (dates.has(dateStr)) {
        count++;
        current.setDate(current.getDate() - 1);
      } else break;
    }
    return count;
  }, [entries]);

  const handleMoodChange = (mood: 1 | 2 | 3 | 4 | 5) => {
    updateToday((e) => ({ ...e, mood: e.mood === mood ? undefined : mood }));
  };

  const handleNotesChange = (notes: string[]) => {
    updateToday((e) => ({ ...e, notes }));
  };

  const handleAddNote = () => {
    const current = today?.notes ?? [];
    handleNotesChange([...current, ""]);
  };

  const handleUpdateNote = (index: number, value: string) => {
    const current = [...(today?.notes ?? [])];
    current[index] = value;
    handleNotesChange(current);
  };

  const handleRemoveNote = (index: number) => {
    const current = [...(today?.notes ?? [])];
    current.splice(index, 1);
    handleNotesChange(current);
  };

  const handleSetAiSummary = (aiSummary: string) => {
    updateToday((e) => ({ ...e, aiSummary }));
  };

  const handleAddEntry = (entry: ManualEntry) => {
    updateToday((e) => ({
      ...e,
      manualEntries: [...e.manualEntries, entry].sort((a, b) => a.time.localeCompare(b.time)),
    }));
    setShowAddEntry(false);
  };

  const handleDeleteEntry = (id: string) => {
    updateToday((e) => ({
      ...e,
      manualEntries: e.manualEntries.filter((m) => m.id !== id),
    }));
    setDeleteId(null);
  };

  const hasFlashbackData = flashbacks.some((f) => f.entry !== null);
  const isFirstTime = entries.length <= 1 && !hasFlashbackData;

  return (
    <div className="animate-tab-enter space-y-5">
      {/* 日付 + ストリーク */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{formatDate(todayStr, locale)}</h2>
        {streak > 0 && (
          <span className="text-sm font-medium">{tFormat("today.streak", locale, streak)}</span>
        )}
      </div>

      {/* 3年日記セクション */}
      {(hasFlashbackData || isFirstTime) && (
        <div className="space-y-3">
          {isFirstTime ? (
            <div className="bg-card border border-emerald-500/10 rounded-2xl p-5 text-center space-y-2">
              <svg width={32} height={32} viewBox="0 0 100 100" fill="none" className="mx-auto text-emerald-500 opacity-60">
                <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="5" fill="none" opacity="0.9" />
                <line x1="38" y1="42" x2="62" y2="42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                <line x1="38" y1="50" x2="62" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
                <line x1="38" y1="58" x2="62" y2="58" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="1" />
              </svg>
              <p className="text-xs text-muted">{t("today.flashback.first", locale)}</p>
            </div>
          ) : (
            flashbacks.map(({ year, label, entry }) =>
              entry ? (
                <div key={year} className="bg-card border border-card rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted font-medium">{label}</span>
                    <span className="text-xs text-muted tabular-nums">{entry.date}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    {entry.mood && (() => {
                      const Face = MOOD_FACES[entry.mood - 1];
                      return <Face size={24} className="text-emerald-500 shrink-0" />;
                    })()}
                    <div className="flex-1 min-w-0">
                      {entry.comment && (
                        <p className="text-sm leading-relaxed line-clamp-2">{entry.comment}</p>
                      )}
                      {entry.manualEntries.length > 0 && (
                        <p className="text-xs text-muted mt-1">
                          {tFormat("timeline.activities", locale, entry.manualEntries.length)}
                        </p>
                      )}
                      {!entry.comment && entry.manualEntries.length === 0 && (
                        <p className="text-xs text-muted italic">—</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : null
            )
          )}
        </div>
      )}

      {/* アクティビティログ */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold">{t("today.activity", locale)}</h3>
          <button
            onClick={() => setShowAddEntry(true)}
            className="text-xs font-medium text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            {t("today.addEntry", locale)}
          </button>
        </div>

        {(!today || today.manualEntries.length === 0) ? (
          <div className="border-2 border-dashed border-card rounded-2xl p-6 text-center">
            <p className="text-3xl mb-2">📋</p>
            <p className="text-sm text-muted">{t("today.noActivity", locale)}</p>
            <p className="text-xs text-muted mt-1 opacity-50">{t("today.noActivityHint", locale)}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {today.manualEntries.map((entry) => (
              <div key={entry.id} className="bg-card border border-card rounded-xl p-3 flex items-center gap-3">
                <span className="text-lg shrink-0">{ENTRY_ICONS[entry.icon]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{entry.text}</p>
                  <p className="text-xs text-muted tabular-nums">{entry.time}</p>
                </div>
                <button
                  onClick={() => setDeleteId(entry.id)}
                  className="text-muted hover:text-red-400 transition-colors shrink-0"
                >
                  <TrashIcon size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOCUS連携 CTA（MVPプレースホルダー） */}
      <p className="text-center text-[10px] text-muted opacity-40">{t("today.focusCTA", locale)}</p>

      {/* 今日のまとめ（箇条書き + AI生成） */}
      <div className="bg-card border border-card rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold">{t("today.notes", locale)}</h3>
          <button
            onClick={handleAddNote}
            className="text-xs font-medium text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            {t("today.addNote", locale)}
          </button>
        </div>

        {/* AI生成の日記 */}
        {today?.aiSummary && (
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3">
            <p className="text-xs text-emerald-500/60 mb-1">AI</p>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{today.aiSummary}</p>
          </div>
        )}

        {/* 箇条書きメモ */}
        {(today?.notes ?? []).length > 0 ? (
          <div className="space-y-2">
            {(today?.notes ?? []).map((note, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-emerald-500 mt-2.5 text-xs shrink-0">•</span>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => handleUpdateNote(i, e.target.value)}
                  placeholder={t(`today.comment.${getTimeOfDay()}`, locale)}
                  className="flex-1 bg-transparent text-sm py-1.5 border-b border-card focus:border-emerald-500/50 focus:outline-none placeholder:text-muted transition-colors"
                  style={{ color: "var(--text)" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") { e.preventDefault(); handleAddNote(); }
                    if (e.key === "Backspace" && note === "") { e.preventDefault(); handleRemoveNote(i); }
                  }}
                  autoFocus={note === ""}
                />
                <button
                  onClick={() => handleRemoveNote(i)}
                  className="text-muted hover:text-red-400 transition-colors mt-2 shrink-0"
                >
                  <TrashIcon size={12} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted text-center py-2 opacity-50">{t("today.notesHint", locale)}</p>
        )}

        {/* AI日記生成ボタン */}
        {(today?.manualEntries ?? []).length > 0 && (
          <button
            onClick={async () => {
              if (aiLoading) return;
              setAiLoading(true);
              try {
                const res = await fetch("/journal/api/generate", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    activities: (today?.manualEntries ?? []).map((e) => ({
                      time: e.time,
                      text: e.text,
                      icon: e.icon,
                    })),
                    notes: (today?.notes ?? []).filter((n) => n.trim()),
                    mood: today?.mood,
                    locale,
                  }),
                });
                const data = await res.json();
                if (data.summary) handleSetAiSummary(data.summary);
              } catch (e) {
                console.error("AI generation failed:", e);
              } finally {
                setAiLoading(false);
              }
            }}
            disabled={aiLoading}
            className="w-full py-2.5 rounded-xl text-sm font-medium bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-colors border border-emerald-500/20 disabled:opacity-50"
          >
            {aiLoading ? t("today.aiGenerating", locale) : t("today.generateAi", locale)}
          </button>
        )}
      </div>

      {/* 気分セレクター（SVGフェイス） */}
      <div className="bg-card border border-card rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-bold">{t("today.mood", locale)}</h3>
        <div className="flex justify-around">
          {MOOD_FACES.map((Face, i) => {
            const moodVal = (i + 1) as 1 | 2 | 3 | 4 | 5;
            const isActive = today?.mood === moodVal;
            return (
              <button
                key={i}
                onClick={() => handleMoodChange(moodVal)}
                className="flex flex-col items-center gap-2 transition-all"
              >
                <Face
                  size={36}
                  className={`transition-all duration-200 ${
                    isActive
                      ? "text-emerald-500 scale-110"
                      : "text-muted opacity-40 hover:opacity-70 scale-90"
                  }`}
                />
                <span className={`text-[10px] font-medium ${
                  isActive ? "text-emerald-500" : "text-muted"
                }`}>
                  {t(`today.mood.${moodVal}`, locale)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 自動保存済み */}
      <p className="text-center text-xs text-muted">{t("today.autosaved", locale)}</p>

      {/* エントリー追加モーダル */}
      {showAddEntry && (
        <AddEntryModal
          locale={locale}
          onSave={handleAddEntry}
          onClose={() => setShowAddEntry(false)}
        />
      )}

      {/* エントリー削除確認モーダル */}
      {deleteId && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center animate-fade-in"
          onClick={() => setDeleteId(null)}
        >
          <div
            className="w-full sm:max-w-sm bg-modal rounded-t-3xl sm:rounded-2xl p-6 animate-celebrate space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center sm:hidden">
              <div className="w-10 h-1 rounded-full bg-subtle" />
            </div>
            <p className="text-sm text-center">{t("modal.confirm", locale)}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl text-sm bg-subtle text-muted hover:opacity-80 transition-opacity"
              >
                {t("modal.cancel", locale)}
              </button>
              <button
                onClick={() => handleDeleteEntry(deleteId)}
                className="flex-1 py-2.5 rounded-xl text-sm text-red-400 bg-subtle hover:opacity-80 transition-opacity"
              >
                {t("modal.delete", locale)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== エントリー追加モーダル =====
function AddEntryModal({
  locale,
  onSave,
  onClose,
}: {
  locale: Locale;
  onSave: (entry: ManualEntry) => void;
  onClose: () => void;
}) {
  const [time, setTime] = useState(getNowTime);
  const [text, setText] = useState("");
  const [icon, setIcon] = useState<EntryIcon>("memo");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const handleSave = () => {
    if (!text.trim()) return;
    onSave({
      id: Date.now().toString(),
      time,
      text: text.trim(),
      icon,
    });
  };

  const icons: { id: EntryIcon; key: string }[] = [
    { id: "focus", key: "entry.focus" },
    { id: "done",  key: "entry.done" },
    { id: "memo",  key: "entry.memo" },
    { id: "idea",  key: "entry.idea" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-sm bg-modal rounded-t-3xl sm:rounded-2xl p-6 animate-celebrate space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center sm:hidden">
          <div className="w-10 h-1 rounded-full bg-subtle" />
        </div>

        <h3 className="text-sm font-bold text-center">{t("entry.add.title", locale)}</h3>

        {/* 時刻 */}
        <div>
          <label className="text-xs text-muted block mb-1">{t("entry.add.time", locale)}</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-input border border-input rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--text)" }}
          />
        </div>

        {/* 内容 */}
        <div>
          <label className="text-xs text-muted block mb-1">{t("entry.add.text", locale)}</label>
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("entry.add.placeholder", locale)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSave(); }}
            className="w-full bg-input border border-input rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder:text-muted"
            style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--text)" }}
          />
        </div>

        {/* アイコン選択 */}
        <div>
          <label className="text-xs text-muted block mb-2">{t("entry.add.icon", locale)}</label>
          <div className="flex gap-2">
            {icons.map(({ id, key }) => (
              <button
                key={id}
                onClick={() => setIcon(id)}
                className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl text-xs transition-colors ${
                  icon === id
                    ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
                    : "bg-subtle text-muted border border-transparent hover:opacity-80"
                }`}
              >
                <span className="text-lg">{ENTRY_ICONS[id]}</span>
                <span>{t(key, locale)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ボタン */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm bg-subtle text-muted hover:opacity-80 transition-opacity"
          >
            {t("modal.cancel", locale)}
          </button>
          <button
            onClick={handleSave}
            disabled={!text.trim()}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            {t("entry.add.save", locale)}
          </button>
        </div>
      </div>
    </div>
  );
}
