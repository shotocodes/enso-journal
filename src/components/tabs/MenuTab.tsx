"use client";

import { type Locale, t } from "@/lib/i18n";
import EnsoLogo from "@/components/EnsoLogo";

interface MenuTabProps {
  locale: Locale;
}

export default function MenuTab({ locale }: MenuTabProps) {
  return (
    <div className="animate-tab-enter space-y-5">
      <h2 className="text-lg font-bold mb-4">{t("menu.title", locale)}</h2>

      {/* App Info */}
      <div className="bg-card rounded-2xl p-6 border border-card text-center">
        <EnsoLogo size={64} className="mx-auto mb-3 text-emerald-500" animate />
        <h3 className="text-lg font-bold">{t("app.name", locale)}</h3>
        <p className="text-xs text-muted mt-1">{t("app.tagline", locale)}</p>
        <p className="text-xs text-muted mt-3 leading-relaxed">{t("app.description", locale)}</p>
      </div>

      {/* ENSO Apps */}
      <div className="bg-card rounded-2xl p-5 border border-card">
        <h3 className="text-sm font-bold mb-3">{t("menu.ensoApps", locale)}</h3>
        <div className="space-y-1">
          {/* Dashboard */}
          <a href="https://ensolife.app/dashboard" className="flex items-center gap-3 p-3 -mx-1 rounded-xl hover:bg-subtle transition-colors">
            <svg width={36} height={36} viewBox="0 0 100 100" fill="none" className="text-emerald-500 shrink-0">
              <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="5" fill="none" opacity="0.9" />
            </svg>
            <div className="min-w-0 flex-1">
              <span className="text-sm font-medium block">{t("menu.ensoDashboard", locale)}</span>
              <span className="text-xs text-muted block">{t("menu.ensoDashboardDesc", locale)}</span>
            </div>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-muted shrink-0"><polyline points="9 18 15 12 9 6" /></svg>
          </a>

          {/* ENSO TIMER */}
          <a
            href="https://ensolife.app/timer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 -mx-1 rounded-xl hover:bg-subtle transition-colors"
          >
            <svg width={36} height={36} viewBox="0 0 100 100" fill="none" className="text-emerald-500 shrink-0">
              <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="5" fill="none" opacity="0.9" />
              <circle cx="50" cy="18" r="5" fill="currentColor" />
            </svg>
            <div className="min-w-0 flex-1">
              <span className="text-sm font-medium block">{t("menu.ensoTimer", locale)}</span>
              <span className="text-xs text-muted block">{t("menu.ensoTimerDesc", locale)}</span>
            </div>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-muted shrink-0">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>

          {/* ENSO FOCUS */}
          <a
            href="https://ensolife.app/focus"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 -mx-1 rounded-xl hover:bg-subtle transition-colors"
          >
            <svg width={36} height={36} viewBox="0 0 100 100" fill="none" className="text-emerald-500 shrink-0">
              <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="5" fill="none" opacity="0.9" />
              <circle cx="50" cy="50" r="5" fill="currentColor" />
            </svg>
            <div className="min-w-0 flex-1">
              <span className="text-sm font-medium block">{t("menu.ensoFocus", locale)}</span>
              <span className="text-xs text-muted block">{t("menu.ensoFocusDesc", locale)}</span>
            </div>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-muted shrink-0">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>

          {/* ENSO TASK */}
          <a href="https://ensolife.app/task" className="flex items-center gap-3 p-3 -mx-1 rounded-xl hover:bg-subtle transition-colors">
            <svg width={36} height={36} viewBox="0 0 100 100" fill="none" className="text-emerald-500 shrink-0">
              <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="5" fill="none" opacity="0.9" />
              <polyline points="38,50 46,58 62,40" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="min-w-0 flex-1">
              <span className="text-sm font-medium block">{t("menu.ensoTask", locale)}</span>
              <span className="text-xs text-muted block">{t("menu.ensoTaskDesc", locale)}</span>
            </div>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-muted shrink-0"><polyline points="9 18 15 12 9 6" /></svg>
          </a>

          {/* ENSO COMMUNITY - Coming Soon */}
          <div className="flex items-center gap-3 p-3 -mx-1 rounded-xl opacity-40">
            <svg width={36} height={36} viewBox="0 0 100 100" fill="none" className="text-emerald-500 shrink-0">
              <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="5" fill="none" opacity="0.9" />
              <circle cx="38" cy="45" r="6" stroke="currentColor" strokeWidth="3" fill="none" />
              <circle cx="62" cy="45" r="6" stroke="currentColor" strokeWidth="3" fill="none" />
              <path d="M35 62 Q50 72 65 62" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
            <div className="min-w-0">
              <span className="text-sm font-medium block">{t("menu.ensoCommunity", locale)}</span>
              <span className="text-xs text-muted block">{t("menu.ensoCommunityDesc", locale)}</span>
              <span className="text-[10px] text-muted block mt-0.5">{t("menu.comingSoon", locale)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Credits */}
      <div className="bg-card rounded-2xl p-5 border border-card">
        <h3 className="text-sm font-bold mb-2">{t("menu.credits", locale)}</h3>
        <p className="text-xs text-muted">{t("app.credit", locale)}</p>
      </div>

      {/* Version */}
      <div className="bg-card rounded-2xl p-5 border border-card">
        <h3 className="text-sm font-bold mb-2">{t("menu.version", locale)}</h3>
        <p className="text-xs text-muted">v1.0.0</p>
      </div>
    </div>
  );
}
