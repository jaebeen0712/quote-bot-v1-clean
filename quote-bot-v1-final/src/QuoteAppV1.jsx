
import { useState } from "react"

export default function QuoteAppV1() {
  const [date, setDate] = useState("")
  const [nights, setNights] = useState(2)
  const [room, setRoom] = useState("")
  const [quote, setQuote] = useState("")

  const data = [
    {
      season: "하이시즌",
      start: "2025-07-10",
      end: "2025-08-31",
      room: "Deluxe Villa",
      price: "16,146,000/N",
      benefit: "FLOATING ABF, DNR"
    },
    {
      season: "숄더시즌",
      start: "2025-09-01",
      end: "2025-10-09",
      room: "Deluxe Villa",
      price: "9,108,000/N",
      benefit: "FLOATING ABF, DNR"
    },
    {
      season: "숄더시즌",
      start: "2025-09-01",
      end: "2025-10-09",
      room: "Premier Ocean Villa",
      price: "14,559,000/N",
      benefit: "FLOATING LUN, DNR"
    }
  ]

  function match(dateStr, room) {
    const d = new Date(dateStr)
    return data.find(e => {
      const start = new Date(e.start)
      const end = new Date(e.end)
      return e.room === room && d >= start && d <= end
    })
  }

  const handle = () => {
    const found = match(date, room)
    if (!found) {
      setQuote("해당 룸타입의 시즌 정보가 없습니다.")
      return
    }
    const startDate = new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
    const benefitDate = new Date(new Date(date).getTime() + 86400000).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
    setQuote(`${startDate} (${nights}N) FS JIMBARAN / ${room.toUpperCase()} ${found.price} (${found.season.toUpperCase()} - BENEFIT : ${found.benefit} - ${benefitDate})`)
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>견적 생성기</h2>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} /><br />
      <input type="number" value={nights} onChange={e => setNights(Number(e.target.value))} placeholder="숙박일수" /><br />
      <select value={room} onChange={e => setRoom(e.target.value)}>
        <option value="">룸타입 선택</option>
        <option value="Deluxe Villa">Deluxe Villa</option>
        <option value="Premier Ocean Villa">Premier Ocean Villa</option>
      </select><br />
      <button onClick={handle}>견적 생성</button>
      <p style={{ marginTop: "20px" }}>{quote}</p>
    </div>
  )
}
