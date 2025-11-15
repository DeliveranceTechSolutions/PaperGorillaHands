require('dotenv').config();
import express, { Application, Request, Response, NextFunction, Router } from 'express';
import polygonClient, { GetStocksAggregatesSortEnum, GetStocksAggregatesTimespanEnum } from "../node_modules/@massive.com/client-js/dist/main";
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from './db/client';

const apiKey = process.env.MASSIVE_API_KEY!;

function getRandomDate(startDate: Date, endDate: Date) {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime() - 7884 * 1000000;
    const fixedValue = Math.random();
    const randomTimestamp = startTimestamp + fixedValue * (endTimestamp - startTimestamp);
    const randomTimestamp2 = startTimestamp + (fixedValue + .3) * (endTimestamp - startTimestamp);
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

async function getStocksAggregates() {
  try {
    const client = polygonClient(apiKey);
    const endDate = new Date();
    const startDate = new Date(endDate.getFullYear() - 2, endDate.getMonth() - 3, endDate.getDay());

    const randomDates = getRandomDate(startDate, endDate); 
    const randomAlphabet = generateAlphabet();
    console.log(randomAlphabet);
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
        if (metric.l < min) {
            min = metric.l;
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
const db: SupabaseClient = supabase;
const cors = require('cors');
const app: Application = express();
const port: Number = 3000;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send("Home");
});

app.get('/stonks', async (req: Request, res: Response) => {
    try{
        const { data, error } = await db
            .from("stonks")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle();
        if (error) {
            res.send(error)
        }
        if (data?.created_at < Number(new Date()) - 60000 || data?.selection?.results.length <= 0) {
            const aggs = await getStocksAggregates();
            const schema = {
                selection: aggs,
                created_at: Number(new Date()),
            };
            const { data: stonks, error: stonksError } = await db
                .from("stonks")
                .insert(schema)
                .select();
            stonksError ? res.send(stonksError) : res.send(stonks[0]?.selection);
        } else {
            res.send(data?.selection);
        }
    } catch (e) {
        res.send(e);
    }
});

app.get('/about', (req: Request, res: Response) => {
    res.send('Welcome to about us page');
});

app.get('/contact', (req: Request, res: Response) => {
    res.send('Welcome to contact us page');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});