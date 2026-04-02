import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const { activities, notes, mood, locale } = await request.json();

    const moodLabels: Record<string, string[]> = {
      ja: ["つらい", "まあまあ", "ふつう", "いい感じ", "最高"],
      en: ["Tough", "Okay", "Normal", "Good", "Great"],
    };

    const lang = locale === "ja" ? "日本語" : "English";
    const moodText = mood ? (moodLabels[locale] ?? moodLabels.en)[mood - 1] : null;

    const activitiesText = activities.length > 0
      ? activities.map((a: { time: string; text: string; icon: string }) =>
          `${a.time} - ${a.text} (${a.icon})`
        ).join("\n")
      : "No activities recorded";

    const notesText = notes.length > 0
      ? notes.filter((n: string) => n.trim()).join("\n")
      : "";

    const prompt = `You are a personal journal writer. Based on the following data from today, write a short, warm, and personal journal entry in ${lang}.

Activities:
${activitiesText}

${notesText ? `User's notes:\n${notesText}` : ""}
${moodText ? `Mood: ${moodText}` : ""}

Rules:
- Write 2-4 sentences max
- Be concise and natural, like a real diary
- ${locale === "ja" ? "日本語でカジュアルに書いてください。敬語不要。" : "Write casually in first person."}
- Don't add greetings or dates
- Focus on what was done and how it felt
- If there are notes from the user, incorporate them naturally`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-20241022",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("[generate] Anthropic API error:", err);
      return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? "";

    return NextResponse.json({ summary: text.trim() });
  } catch (error) {
    console.error("[generate] Error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
