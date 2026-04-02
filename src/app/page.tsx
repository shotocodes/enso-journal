"use client";

import { useState, useEffect, useCallback } from "react";
import { type Locale, t } from "@/lib/i18n";
import { storage, STORAGE_KEYS } from "@/lib/storage";
import type { DailyJournal, ThemeMode } from "@/types";

import BottomTabBar, { type TabId } from "@/components/BottomTabBar";
import TodayTab from "@/components/tabs/TodayTab";
import TimelineTab from "@/components/tabs/TimelineTab";
import SettingsTab from "@/components/tabs/SettingsTab";
import MenuTab from "@/components/tabs/MenuTab";

function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") return;
  const resolved =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  document.documentElement.setAttribute("data-theme", resolved);
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabId>("today");
  const [locale, setLocale] = useState<Locale>("ja");
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [entries, setEntries] = useState<DailyJournal[]>([]);

  // 初期化
  useEffect(() => {
    const savedLocale = storage.get<Locale>(STORAGE_KEYS.LOCALE);
    const savedTheme = storage.get<ThemeMode>(STORAGE_KEYS.THEME);
    const savedEntries = storage.get<DailyJournal[]>(STORAGE_KEYS.ENTRIES);
    if (savedLocale) setLocale(savedLocale);
    if (savedTheme) setTheme(savedTheme);
    if (savedEntries) setEntries(savedEntries);
  }, []);

  // テーマ適用
  useEffect(() => {
    applyTheme(theme);
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme]);

  // Service Worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/journal/sw.js").catch(console.error);
    }
  }, []);

  // ハンドラー
  const handleLocaleChange = useCallback((l: Locale) => {
    setLocale(l);
    storage.set(STORAGE_KEYS.LOCALE, l);
  }, []);

  const handleThemeChange = useCallback((t: ThemeMode) => {
    setTheme(t);
    storage.set(STORAGE_KEYS.THEME, t);
  }, []);

  const handleEntriesChange = useCallback((next: DailyJournal[]) => {
    setEntries(next);
    storage.set(STORAGE_KEYS.ENTRIES, next);
  }, []);

  const handleClearData = useCallback(() => {
    storage.clearAll();
    window.location.reload();
  }, []);

  return (
    <main className="min-h-screen max-w-lg mx-auto px-4 pt-[max(1.5rem,env(safe-area-inset-top))] pb-24">
      {/* ヘッダー */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight">{t("app.name", locale)}</h1>
        <p className="text-xs text-muted mt-0.5">{t("app.tagline", locale)}</p>
      </div>

      {/* コンテンツ */}
      <div key={`${activeTab}-${locale}`}>
        {activeTab === "today" && (
          <TodayTab
            locale={locale}
            entries={entries}
            onEntriesChange={handleEntriesChange}
          />
        )}
        {activeTab === "timeline" && (
          <TimelineTab locale={locale} entries={entries} />
        )}
        {activeTab === "settings" && (
          <SettingsTab
            locale={locale}
            onLocaleChange={handleLocaleChange}
            theme={theme}
            onThemeChange={handleThemeChange}
            onClearData={handleClearData}
          />
        )}
        {activeTab === "menu" && (
          <MenuTab locale={locale} />
        )}
      </div>

      {/* タブバー */}
      <BottomTabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        locale={locale}
      />
    </main>
  );
}
