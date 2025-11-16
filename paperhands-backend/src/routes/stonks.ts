import polygonClient, { GetStocksAggregatesSortEnum, GetStocksAggregatesTimespanEnum } from "../../node_modules/@massive.com/client-js/dist/main";

function getRandomDate(startDate: Date, endDate: Date) {
    const startTimestamp = startDate.getTime();

    // Force the endTimestamp to account for 3 months, since reveal is always 3 months.
    const endTimestamp = endDate.getTime() - 7884 * 1000000;
    const fixedValue = Math.random();
    let modifier = 0;
    if (fixedValue <= .7) {
        modifier = .3;
    }
    const randomTimestamp = startTimestamp + fixedValue * (endTimestamp - startTimestamp);
    const randomTimestamp2 = randomTimestamp + 7884 * 1000000;
    console.log(randomTimestamp, randomTimestamp2, fixedValue);
  
    return { start: new Date(randomTimestamp), end: new Date(randomTimestamp2) };
}

function generateAlphabet() {
    const top50Tickers = [
        "AAPL", "MSFT", "AMZN", "GOOGL", "GOOG", "NVDA", "META",
        "BRK.B", "JNJ", "V", "UNH", "WMT", "JPM", "MA", "HD", "PG",
        "DIS", "BAC", "PYPL", "CSCO", "ADBE", "CMCSA", "XOM", "PEP",
        "KO", "NFLX", "ABBV", "CRM", "INTC", "T", "CVX", "ACN", "NKE",
        "MRK", "ABT", "ORCL", "SAP", "IBM", "COST", "QCOM", "TXN",
        "MCD", "NEE", "AMGN", "AMD", "LOW", "LIN", "SBUX", "MMM"
    ];

    const index = Math.floor(Math.random() * top50Tickers.length)
    return top50Tickers[index]!;
}

export default async function getStocksAggregates() {
  try {
    const apiKey = process.env.MASSIVE_API_KEY!;
    const client = polygonClient(apiKey);
    const endDate = new Date();
    const startDate = new Date(endDate.getFullYear() - 2, endDate.getMonth(), endDate.getDate());

    const randomDates = getRandomDate(startDate, endDate); 
    const randomAlphabet = generateAlphabet();
    console.log(randomAlphabet);

    // Add back the amount of 3 months
    const revealEndDate = randomDates.end.getTime() + 7884 * 1000000;
    const response = await client.rest.getStocksAggregates(
        randomAlphabet,
        1,
        GetStocksAggregatesTimespanEnum.Day,
        Math.floor(randomDates.start.getTime() / 1000).toString(),
        Math.floor(randomDates.end.getTime() / 1000).toString(),
        true,
        GetStocksAggregatesSortEnum.Asc,
        120
    );
    const revealResponse = await client.rest.getStocksAggregates(
        randomAlphabet,
        1,
        GetStocksAggregatesTimespanEnum.Day,
        Math.floor(randomDates.end.getTime() / 1000).toString(),
        Math.floor(revealEndDate / 1000).toString(),
        true,
        GetStocksAggregatesSortEnum.Asc,
        120
    );

    let min = Number.MAX_VALUE;
    let revealMin = Number.MAX_VALUE;
    let results = new Array();
    let revealResults = new Array();
    for (let i = 0; i < response.resultsCount; i++) {
        const metric = response.results![i]!
        if (metric.l < min) {
            min = metric.l;
        }
        results.push({
            name: `${(new Date(metric.t).getMonth() + 1).toString().padStart(2, '0')}-${new Date(metric.t).getDate().toString().padStart(2, '0')}-${new Date(metric.t).getFullYear()}`,
            uv: metric.h,
            pv: metric.l,
            amt: metric.h
        });
    }


    for (let i = 0; i < revealResponse.resultsCount; i++) {
        const metric = revealResponse.results![i]!
        if (metric.l < revealMin) {
            revealMin = metric.l;
        }
        revealResults.push({
            name: `${(new Date(metric.t).getMonth() + 1).toString().padStart(2, '0')}-${new Date(metric.t).getDate().toString().padStart(2, '0')}-${new Date(metric.t).getFullYear()}`,
            uv: metric.h,
            pv: metric.l,
            amt: metric.h
        }) 
    }

    return {results: results, min: min, revealResults: revealResults, revealMin: revealMin, alphabet: randomAlphabet}
  } catch (e) {
    console.error('An error happened:', e);
  }
}