import { NextResponse } from 'next/server';

// Helper to generate realistic seeded random numbers based on date strings
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export async function GET() {
  const today = new Date();
  
  // Use today's date to generate a stable "base" price for today
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  
  // Base price around 40,000 THB (current approximate market for 2024/2025/2026)
  const basePrice = 40000 + Math.floor((seededRandom(seed) - 0.5) * 1500); 
  
  // Round to nearest 50 (Standard Thai Gold step)
  const roundedBase = Math.round(basePrice / 50) * 50;
  
  // Thai Gold Standards:
  // - Gold Bar Sell = Gold Bar Buy + 100
  // - Gold Ornament Sell = Gold Bar Sell + 500 (approximate)
  // - Gold Ornament Buy = (Gold Bar Buy * 0.95) roughly or usually fixed lower.
  const goldBarBuy = roundedBase;
  const goldBarSell = goldBarBuy + 100;
  
  // Gold Ornament
  const goldOrnamentSell = goldBarSell + 500;
  // Formal buying price for 1 Baht ornament is usually ~1.5 - 2% lower than Bar Buy
  const goldOrnamentBuy = Math.round((goldBarBuy * 0.98) / 10) * 10; 

  // Global Spot Price estimation
  // Roughly 1 Baht Gold = 15.244g. 1 Troy Ounce = 31.103g.
  // 1 Troy Ounce = ~ 2.04 Baht Gold.
  // Assuming USD/THB is around 35 for calculation purposes to make the spot look realistic
  const usdThb = 35 + (seededRandom(seed + 1) - 0.5);
  const spotXAU = (goldBarBuy * 2.04) / usdThb;

  // Generate 30 days of historical data for the chart
  const history = [];
  let currentHistPrice = roundedBase;
  for (let i = 30; i >= 0; i--) {
    const histDate = new Date(today);
    histDate.setDate(today.getDate() - i);
    const histSeed = histDate.getFullYear() * 10000 + (histDate.getMonth() + 1) * 100 + histDate.getDate();
    
    // Random walk
    const change = Math.round((seededRandom(histSeed) - 0.5) * 400 / 50) * 50;
    
    // To make the end of the chart match today's price, we'll anchor it.
    if (i === 0) {
      currentHistPrice = roundedBase;
    } else {
      currentHistPrice = currentHistPrice - change;
    }

    history.push({
      date: histDate.toISOString().split('T')[0],
      price: currentHistPrice
    });
  }

  // Formatting date for display (e.g. 18 พฤษภาคม 2569 เวลา 09:30 น.)
  const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  const updateTimeStr = `${today.getDate()} ${thaiMonths[today.getMonth()]} ${today.getFullYear() + 543} เวลา ${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')} น.`;

  return NextResponse.json({
    status: 'success',
    data: {
      updateTime: updateTimeStr,
      thaiGold: {
        goldBar: {
          buy: goldBarBuy,
          sell: goldBarSell
        },
        goldOrnament: {
          buy: goldOrnamentBuy,
          sell: goldOrnamentSell
        }
      },
      globalSpot: {
        xauUsd: spotXAU.toFixed(2),
        exchangeRateThb: usdThb.toFixed(2)
      },
      history: history.reverse() // from oldest to newest
    }
  });
}
