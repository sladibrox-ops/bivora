import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: `Ti si BIVORA poslovni AI asistent. BIVORA je poslovna nadzorna ploča za upravljanje klijentima, fakturama, zaposlenicima, projektima i transakcijama. 
Pomaži korisnicima s poslovnim savjetima, analizom podataka, upravljanjem projektima i financijskim pitanjima.
Odgovaraj na jeziku na kojem ti korisnik piše (bosanski, hrvatski, srpski, engleski, njemački).
Budi koncizan, profesionalan i koristan.`,
        messages,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Greška" }, { status: 500 });
  }
}
