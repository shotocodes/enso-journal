import type { Locale } from "@/lib/i18n";

export type { Locale };

export type ThemeMode = "dark" | "light" | "system";

// ===== ENSO JOURNAL データモデル =====

/** 1日分のジャーナル（1日1レコード） */
export interface DailyJournal {
  date: string;                  // "YYYY-MM-DD"
  mood?: 1 | 2 | 3 | 4 | 5;
  comment?: string;              // 後方互換: 旧フリーテキスト
  notes: string[];               // 箇条書きメモ
  aiSummary?: string;            // AI生成の日記テキスト
  manualEntries: ManualEntry[];
  createdAt: string;             // ISO 8601
  updatedAt: string;             // ISO 8601
}

/** 手動追加の行動ログ */
export interface ManualEntry {
  id: string;                    // Date.now().toString()
  time: string;                  // "HH:MM"
  text: string;
  icon: EntryIcon;
}

export type EntryIcon = "focus" | "done" | "memo" | "idea";

/** エントリーアイコンの絵文字マッピング */
export const ENTRY_ICONS: Record<EntryIcon, string> = {
  focus: "🎯",
  done:  "✅",
  memo:  "📝",
  idea:  "💡",
} as const;

/** 気分の絵文字（1〜5） */
export const MOODS = ["😔", "😐", "🙂", "😊", "😄"] as const;

export interface AppSettings {
  locale: Locale;
  theme: ThemeMode;
}
