import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://www.glo.or.th/api/lottery/getLatestLottery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
      cache: 'no-store' // ensure we get the latest data always
    });

    if (!res.ok) {
      throw new Error("Failed to fetch from GLO API");
    }

    const json = await res.json();
    
    if (!json.status || !json.response || !json.response.data) {
      throw new Error("Invalid GLO JSON structure");
    }

    const { data, displayDate } = json.response;

    // Convert displayDate to Thai format string e.g. "16 พฤษภาคม 2569"
    const thaiMonths = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    const monthIndex = parseInt(displayDate.month, 10) - 1;
    let monthTh = "";
    if (monthIndex >= 0 && monthIndex < 12) {
      monthTh = thaiMonths[monthIndex];
    }
    // GLO usually returns Buddhist year or AD year. If it's AD e.g. 2026, convert to BE 2569.
    // If it's already BE, just use it.
    let year = parseInt(displayDate.year, 10);
    if (year < 2500) year += 543;
    
    const formattedDate = `${displayDate.date} ${monthTh} ${year}`;

    // Helper to safely extract values
    const extractValues = (obj: any) => {
      if (!obj || !obj.number || !Array.isArray(obj.number)) return [];
      return obj.number.map((n: any) => n.value);
    };

    // Format matches what LotteryChecker expects
    const formattedResponse = {
      date: formattedDate,
      prizes: [
        { number: extractValues(data.first) },
        { number: extractValues(data.second) },
        { number: extractValues(data.third) },
        { number: extractValues(data.fourth) },
        { number: extractValues(data.fifth) },
      ],
      runningNumbers: [
        { number: extractValues(data.last3f) },
        { number: extractValues(data.last3b) },
        { number: extractValues(data.last2) }
      ]
    };

    return NextResponse.json({ success: true, response: formattedResponse });
    
  } catch (error: any) {
    console.error("Lottery Proxy Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
