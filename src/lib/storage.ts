import type { DailyJournal } from "@/types";

const PREFIX = "enso-journal-";

export const storage = {
  get<T>(key: string): T | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(PREFIX + key);
      if (raw === null) return null;
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      console.error("[enso-journal] storage.set failed:", key);
    }
  },

  remove(key: string): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(PREFIX + key);
  },

  /** enso-journal- プレフィックスのキーをすべて削除 */
  clearAll(): void {
    if (typeof window === "undefined") return;
    const keys = Object.keys(localStorage).filter((k) => k.startsWith(PREFIX));
    keys.forEach((k) => localStorage.removeItem(k));
  },
};

export const STORAGE_KEYS = {
  ENTRIES:    "entries",
  THEME:      "theme",
  LOCALE:     "locale",
  ONBOARDED:  "onboarded",
} as const;

/** データエクスポート（JSON文字列を返す） */
export function exportData(): string {
  const entries = storage.get<DailyJournal[]>(STORAGE_KEYS.ENTRIES) ?? [];
  return JSON.stringify({
    version: "1.0.0",
    app: "enso-journal",
    exportedAt: new Date().toISOString(),
    entries,
  }, null, 2);
}

/** データインポート（JSON文字列を受け取り、成功したらtrue） */
export function importData(json: string): boolean {
  try {
    const data = JSON.parse(json);
    if (!data || !Array.isArray(data.entries)) return false;
    const existing = storage.get<DailyJournal[]>(STORAGE_KEYS.ENTRIES) ?? [];
    const existingMap = new Map(existing.map((e) => [e.date, e]));
    for (const entry of data.entries) {
      if (entry.date) existingMap.set(entry.date, entry);
    }
    storage.set(STORAGE_KEYS.ENTRIES, Array.from(existingMap.values()));
    return true;
  } catch {
    return false;
  }
}
