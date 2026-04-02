export type Locale = "ja" | "en" | "zh" | "ko";

export const LOCALES: { code: Locale; label: string }[] = [
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "ko", label: "한국어" },
];

type Translations = Record<string, Record<Locale, string>>;

const translations: Translations = {
  // ===== App =====
  "app.name":        { ja: "ENSO JOURNAL", en: "ENSO JOURNAL", zh: "ENSO JOURNAL", ko: "ENSO JOURNAL" },
  "app.tagline":     { ja: "やったことが、勝手に日記になる", en: "Your actions become your journal", zh: "你的行动自动成为日记", ko: "행동이 자동으로 일기가 됩니다" },
  "app.description": { ja: "3年日記 × 行動ログ自動生成。書かなくていい日記アプリ。", en: "3-year journal with auto action logs. A journal that writes itself.", zh: "三年日记 × 自动行动日志。不需要写的日记。", ko: "3년 일기 × 자동 행동 로그. 쓰지 않아도 되는 일기." },
  "app.credit":      { ja: "by CreativeStudio SHOTO.", en: "by CreativeStudio SHOTO.", zh: "by CreativeStudio SHOTO.", ko: "by CreativeStudio SHOTO." },

  // ===== Tabs =====
  "tabs.today":    { ja: "今日",       en: "Today",    zh: "今天",   ko: "오늘" },
  "tabs.timeline": { ja: "タイムライン", en: "Timeline", zh: "时间线", ko: "타임라인" },
  "tabs.settings": { ja: "設定",       en: "Settings", zh: "设置",   ko: "설정" },
  "tabs.menu":     { ja: "メニュー",    en: "Menu",     zh: "菜单",   ko: "메뉴" },

  // ===== Today =====
  "today.streak":          { ja: "{0}日", en: "{0}d", zh: "{0}天", ko: "{0}일" },
  "today.flashback":       { ja: "去年の今日", en: "This day last year", zh: "去年的今天", ko: "작년 오늘" },
  "today.flashback2":      { ja: "一昨年の今日", en: "This day 2 years ago", zh: "前年的今天", ko: "재작년 오늘" },
  "today.flashback.empty": { ja: "来年、ここにあなたの記録が表示されます", en: "Next year, your entry will appear here", zh: "明年，你的记录将显示在这里", ko: "내년에 여기에 기록이 표시됩니다" },
  "today.flashback.first": { ja: "来年の今日、この日を振り返りましょう", en: "Next year, you'll look back on today", zh: "明年的今天，回顾这一天", ko: "내년 오늘, 이 날을 돌아봅시다" },
  "today.activity":        { ja: "今日のアクティビティ", en: "Today's Activity", zh: "今天的活动", ko: "오늘의 활동" },
  "today.addEntry":        { ja: "+ 追加", en: "+ Add", zh: "+ 添加", ko: "+ 추가" },
  "today.noActivity":      { ja: "まだ記録がありません", en: "No entries yet", zh: "暂无记录", ko: "기록이 없습니다" },
  "today.noActivityHint":  { ja: "「+ 追加」で今日の行動を記録しましょう", en: "Tap \"+ Add\" to log your activities", zh: "点击\"+ 添加\"记录今天的活动", ko: "\"+ 추가\"를 눌러 오늘의 활동을 기록하세요" },
  "today.comment":         { ja: "ひとこと", en: "Quick Note", zh: "一句话", ko: "한마디" },
  "today.comment.morning": { ja: "今日の目標は？", en: "What's your goal today?", zh: "今天的目标是什么？", ko: "오늘의 목표는?" },
  "today.comment.afternoon": { ja: "午前中はどうでした？", en: "How was your morning?", zh: "上午怎么样？", ko: "오전은 어땠나요?" },
  "today.comment.evening": { ja: "今日を一言で表すなら？", en: "Sum up your day in a word?", zh: "用一句话总结今天？", ko: "오늘을 한마디로 표현하면?" },
  "today.comment.night":   { ja: "おつかれさまでした", en: "Good job today", zh: "辛苦了", ko: "수고하셨어요" },
  "today.mood":            { ja: "今日の気分", en: "Today's Mood", zh: "今天的心情", ko: "오늘의 기분" },
  "today.mood.1":          { ja: "つらい", en: "Tough", zh: "很难", ko: "힘듦" },
  "today.mood.2":          { ja: "まあまあ", en: "Okay", zh: "一般", ko: "그저 그래" },
  "today.mood.3":          { ja: "ふつう", en: "Normal", zh: "普通", ko: "보통" },
  "today.mood.4":          { ja: "いい感じ", en: "Good", zh: "不错", ko: "좋은" },
  "today.mood.5":          { ja: "最高！", en: "Great!", zh: "太棒了！", ko: "최고!" },
  "today.notes":           { ja: "今日のまとめ", en: "Today's Notes", zh: "今日总结", ko: "오늘의 정리" },
  "today.addNote":         { ja: "+ メモ", en: "+ Note", zh: "+ 备注", ko: "+ 메모" },
  "today.notesHint":       { ja: "「+ メモ」で今日の気づきを書き留めよう", en: "Tap \"+ Note\" to capture your thoughts", zh: "点击\"+ 备注\"记下今天的想法", ko: "\"+ 메모\"를 눌러 오늘의 생각을 적어보세요" },
  "today.generateAi":      { ja: "AIで日記を生成", en: "Generate with AI", zh: "AI生成日记", ko: "AI로 일기 생성" },
  "today.aiGenerating":    { ja: "生成中...", en: "Generating...", zh: "生成中...", ko: "생성 중..." },
  "today.autosaved":       { ja: "自動保存済み ✓", en: "Auto-saved ✓", zh: "已自动保存 ✓", ko: "자동 저장됨 ✓" },
  "today.focusCTA":        { ja: "ENSO FOCUSで集中を記録しよう", en: "Track focus with ENSO FOCUS", zh: "使用ENSO FOCUS记录专注", ko: "ENSO FOCUS로 집중을 기록하세요" },

  // ===== Entry Icons =====
  "entry.focus": { ja: "集中", en: "Focus", zh: "专注", ko: "집중" },
  "entry.done":  { ja: "完了", en: "Done",  zh: "完成", ko: "완료" },
  "entry.memo":  { ja: "メモ", en: "Memo",  zh: "备忘", ko: "메모" },
  "entry.idea":  { ja: "アイデア", en: "Idea", zh: "想法", ko: "아이디어" },

  // ===== Add Entry Modal =====
  "entry.add.title":       { ja: "アクティビティを追加", en: "Add Activity", zh: "添加活动", ko: "활동 추가" },
  "entry.add.time":        { ja: "時刻", en: "Time", zh: "时间", ko: "시각" },
  "entry.add.text":        { ja: "内容", en: "What did you do?", zh: "做了什么？", ko: "무엇을 했나요?" },
  "entry.add.placeholder": { ja: "例: React開発、ミーティング...", en: "e.g. React coding, Meeting...", zh: "例如: React开发, 会议...", ko: "예: React 개발, 미팅..." },
  "entry.add.icon":        { ja: "種類", en: "Type", zh: "类型", ko: "유형" },
  "entry.add.save":        { ja: "追加する", en: "Add", zh: "添加", ko: "추가하기" },
  "entry.edit.title":      { ja: "アクティビティを編集", en: "Edit Activity", zh: "编辑活动", ko: "활동 편집" },
  "entry.edit.save":       { ja: "保存する", en: "Save", zh: "保存", ko: "저장하기" },

  // ===== Timeline =====
  "timeline.title":     { ja: "タイムライン", en: "Timeline", zh: "时间线", ko: "타임라인" },
  "timeline.empty":     { ja: "まだ日記がありません", en: "No journals yet", zh: "暂无日记", ko: "아직 일기가 없습니다" },
  "timeline.emptyHint": { ja: "今日タブで最初の記録を始めましょう", en: "Start your first entry in the Today tab", zh: "在今天标签开始你的第一条记录", ko: "오늘 탭에서 첫 기록을 시작하세요" },
  "timeline.search":    { ja: "検索...", en: "Search...", zh: "搜索...", ko: "검색..." },
  "timeline.all":       { ja: "すべて", en: "All", zh: "全部", ko: "전체" },
  "timeline.entries":   { ja: "{0}件", en: "{0}", zh: "{0}条", ko: "{0}건" },
  "timeline.activities":{ ja: "{0}件のアクティビティ", en: "{0} activities", zh: "{0}项活动", ko: "{0}개의 활동" },

  // ===== Settings =====
  "settings.title":          { ja: "設定",           en: "Settings",        zh: "设置",       ko: "설정" },
  "settings.theme":          { ja: "テーマ",         en: "Theme",           zh: "主题",       ko: "테마" },
  "settings.theme.dark":     { ja: "ダーク",         en: "Dark",            zh: "深色",       ko: "다크" },
  "settings.theme.light":    { ja: "ライト",         en: "Light",           zh: "浅色",       ko: "라이트" },
  "settings.theme.system":   { ja: "システム",       en: "System",          zh: "系统",       ko: "시스템" },
  "settings.language":       { ja: "言語",           en: "Language",        zh: "语言",       ko: "언어" },
  "settings.data":           { ja: "データ管理",     en: "Data",            zh: "数据管理",   ko: "데이터 관리" },
  "settings.export":         { ja: "データをエクスポート", en: "Export Data", zh: "导出数据", ko: "데이터 내보내기" },
  "settings.import":         { ja: "データをインポート", en: "Import Data",   zh: "导入数据", ko: "데이터 가져오기" },
  "settings.importSuccess":  { ja: "インポート成功！", en: "Import successful!", zh: "导入成功！", ko: "가져오기 성공!" },
  "settings.importFail":     { ja: "インポートに失敗しました", en: "Import failed", zh: "导入失败", ko: "가져오기 실패" },
  "settings.clear":          { ja: "すべてのデータを削除", en: "Delete All Data", zh: "删除所有数据", ko: "모든 데이터 삭제" },
  "settings.clearConfirm":   { ja: "すべてのデータが削除されます。この操作は取り消せません。", en: "All data will be deleted. This cannot be undone.", zh: "所有数据将被删除。此操作无法撤消。", ko: "모든 데이터가 삭제됩니다. 이 작업은 취소할 수 없습니다." },

  // ===== Menu =====
  "menu.title":            { ja: "メニュー",       en: "Menu",          zh: "菜单",       ko: "메뉴" },
  "menu.ensoApps":         { ja: "ENSO Apps",     en: "ENSO Apps",     zh: "ENSO Apps",  ko: "ENSO Apps" },
  "menu.ensoDashboard":    { ja: "ENSO Dashboard", en: "ENSO Dashboard", zh: "ENSO Dashboard", ko: "ENSO Dashboard" },
  "menu.ensoDashboardDesc":{ ja: "人生をより意識的に生きる", en: "Live more consciously", zh: "更有意识地生活", ko: "더 의식적으로 살다" },
  "menu.ensoTimer":        { ja: "ENSO TIMER",    en: "ENSO TIMER",    zh: "ENSO TIMER", ko: "ENSO TIMER" },
  "menu.ensoTimerDesc":    { ja: "人生という時間を可視化する", en: "Visualize life's time", zh: "将人生时间可视化", ko: "인생의 시간을 시각화하다" },
  "menu.ensoFocus":        { ja: "ENSO FOCUS",    en: "ENSO FOCUS",    zh: "ENSO FOCUS", ko: "ENSO FOCUS" },
  "menu.ensoFocusDesc":    { ja: "ポモドーロで集中力を鍛える", en: "Train focus with Pomodoro", zh: "用番茄钟训练专注力", ko: "포모도로로 집중력을 키우다" },
  "menu.ensoTask":         { ja: "ENSO TASK",     en: "ENSO TASK",     zh: "ENSO TASK",  ko: "ENSO TASK" },
  "menu.ensoTaskDesc":     { ja: "タスクを管理する", en: "Manage your tasks", zh: "管理你的任务", ko: "작업을 관리하다" },
  "menu.ensoCommunity":    { ja: "ENSO COMMUNITY", en: "ENSO COMMUNITY", zh: "ENSO COMMUNITY", ko: "ENSO COMMUNITY" },
  "menu.ensoCommunityDesc":{ ja: "仲間と繋がる", en: "Connect with others", zh: "与伙伴连接", ko: "동료와 연결하다" },
  "menu.comingSoon":       { ja: "近日公開",       en: "Coming Soon",   zh: "即将推出",   ko: "출시 예정" },
  "menu.credits":          { ja: "Credits",       en: "Credits",       zh: "Credits",    ko: "Credits" },
  "menu.version":          { ja: "Version",       en: "Version",       zh: "Version",    ko: "Version" },

  // ===== Modal =====
  "modal.confirm": { ja: "確認", en: "Confirm", zh: "确认", ko: "확인" },
  "modal.cancel":  { ja: "キャンセル", en: "Cancel", zh: "取消", ko: "취소" },
  "modal.delete":  { ja: "削除する", en: "Delete", zh: "删除", ko: "삭제" },
  "modal.close":   { ja: "閉じる", en: "Close", zh: "关闭", ko: "닫기" },
};

/** キーを翻訳して返す。該当なし → 英語 → キーそのまま */
export function t(key: string, locale: Locale): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[locale] ?? entry["en"] ?? key;
}

/** プレースホルダー {0}, {1} を置換 */
export function tFormat(key: string, locale: Locale, ...args: (string | number)[]): string {
  let str = t(key, locale);
  args.forEach((arg, i) => {
    str = str.replace(new RegExp(`\\{${i}\\}`, "g"), String(arg));
  });
  return str;
}
