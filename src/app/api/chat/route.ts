import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are the SimpleHome.ca AI assistant, helping users find pre-construction condos and new developments in Toronto and the Greater Toronto Area.

You have knowledge of pre-construction projects across Toronto neighborhoods including Downtown Core, King West, Liberty Village, Queen West, Yorkville, Midtown, North York, Scarborough, Etobicoke, Mississauga, Vaughan, and more.

Guidelines:
- Be helpful, concise, and friendly
- Recommend projects based on user preferences (budget, neighborhood, move-in timeline)
- Mention TTC subway stations and GO Transit stops near projects when relevant
- NEVER give specific investment advice or guarantee returns
- Always remind users to consult licensed real estate professionals for decisions
- If asked about specific pricing, note that all prices are approximate and subject to change
- You can discuss general market trends but not predict future prices

SimpleHome.ca is an informational platform that partners with licensed Ontario real estate professionals. We are not a licensed real estate brokerage.`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        message: "I'm currently in demo mode. In production, I can help you find the perfect pre-construction condo in Toronto! Try browsing our listings or contact us directly.",
      });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    const data = await response.json();
    const assistantMessage = data.content?.[0]?.text || 'Sorry, I could not generate a response.';

    return NextResponse.json({ message: assistantMessage });
  } catch {
    return NextResponse.json(
      { message: 'Sorry, something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
