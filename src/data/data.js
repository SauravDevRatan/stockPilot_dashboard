// mockData.js

const stockNames = [
  "RELIANCE", "TCS", "INFY", "HDFCBANK", "ICICIBANK", "SBIN", "BHARTIARTL", "ITC",
  "WIPRO", "M&M", "HUL", "LT", "AXISBANK", "ASIANPAINT", "MARUTI", "BAJFINANCE",
  "TITAN", "POWERGRID", "NTPC", "ADANIENT", "ADANIPORTS", "SUNPHARMA", "TATAMOTORS",
  "ULTRACEMCO", "JSWSTEEL", "ONGC", "COALINDIA", "TECHM", "HCLTECH", "BPCL"
];


function generateRandomStockData() {
  return stockNames.map(name => {
    const basePrice = Math.random() * (5000 - 200) + 200; 
    const percentChange = (Math.random() * 2 - 1).toFixed(2); 
    const isDown = percentChange < 0;

    
    const price = +(basePrice * (1 + percentChange / 100)).toFixed(2);

    return {
      name,
      price,
      percent: `${percentChange}%`,
      isDown
    };
  });
}

export const watchlist = generateRandomStockData();

// export const watchlist = [
//   { name: "RELIANCE", price: 2821.40, percent: "0.72%", isDown: false },
//   { name: "TCS", price: 3925.65, percent: "-0.18%", isDown: true },
//   { name: "INFY", price: 1610.35, percent: "0.54%", isDown: false },
//   { name: "HDFCBANK", price: 1598.20, percent: "0.11%", isDown: false },
//   { name: "ICICIBANK", price: 1189.40, percent: "-0.27%", isDown: true },
//   { name: "SBIN", price: 875.15, percent: "0.42%", isDown: false },
//   { name: "BHARTIARTL", price: 1267.80, percent: "-0.05%", isDown: true },
//   { name: "ITC", price: 451.30, percent: "0.36%", isDown: false },
//   { name: "WIPRO", price: 577.75, percent: "0.32%", isDown: false },
//   { name: "M&M", price: 779.80, percent: "-0.01%", isDown: true },
//   { name: "HUL", price: 512.40, percent: "1.04%", isDown: false },
//   { name: "LT", price: 3662.10, percent: "-0.14%", isDown: true },
//   { name: "AXISBANK", price: 1143.90, percent: "0.28%", isDown: false },
//   { name: "ASIANPAINT", price: 2948.50, percent: "-0.33%", isDown: true },
//   { name: "MARUTI", price: 12225.00, percent: "0.46%", isDown: false },
//   { name: "BAJFINANCE", price: 7395.60, percent: "-0.22%", isDown: true },
//   { name: "TITAN", price: 3445.25, percent: "0.38%", isDown: false },
//   { name: "POWERGRID", price: 323.40, percent: "0.19%", isDown: false },
//   { name: "NTPC", price: 354.65, percent: "0.61%", isDown: false },
//   { name: "ADANIENT", price: 2924.75, percent: "-0.08%", isDown: true },
//   { name: "ADANIPORTS", price: 1187.90, percent: "0.25%", isDown: false },
//   { name: "SUNPHARMA", price: 1728.40, percent: "0.47%", isDown: false },
//   { name: "TATAMOTORS", price: 970.60, percent: "-0.12%", isDown: true },
//   { name: "ULTRACEMCO", price: 10480.50, percent: "0.51%", isDown: false },
//   { name: "JSWSTEEL", price: 858.35, percent: "0.14%", isDown: false },
//   { name: "ONGC", price: 283.75, percent: "0.42%", isDown: false },
//   { name: "COALINDIA", price: 483.50, percent: "-0.18%", isDown: true },
//   { name: "TECHM", price: 1355.90, percent: "0.77%", isDown: false },
//   { name: "HCLTECH", price: 1765.60, percent: "-0.05%", isDown: true },
//   { name: "BPCL", price: 281.45, percent: "0.31%", isDown: false }
// ];



