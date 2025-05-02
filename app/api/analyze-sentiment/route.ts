import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { text } = await req.json()
    if (!text) return NextResponse.json({ error: "Text is required" }, { status: 400 })

    const res = await fetch("https://http://localhost:5000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })

    if (!res.ok) {
      return NextResponse.json({ error: "Flask API error" }, { status: 500 })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
