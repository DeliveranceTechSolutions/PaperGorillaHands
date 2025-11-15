require('dotenv').config();
import express, { Application, Request, Response, NextFunction, Router } from 'express';
import polygonClient, { GetStocksAggregatesSortEnum, GetStocksAggregatesTimespanEnum } from "../node_modules/@massive.com/client-js/dist/main";
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from './db/client';

const apiKey = process.env.MASSIVE_API_KEY!;

function getRandomDate(startDate: Date, endDate: Date) {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    const fixedValue = Math.random();
    const randomTimestamp = startTimestamp + fixedValue * (endTimestamp - startTimestamp);
    const randomTimestamp2 = startTimestamp + (fixedValue + .3) * (endTimestamp - startTimestamp);
  
    return { start: new Date(randomTimestamp), end: new Date(randomTimestamp2) };
}



function generateAlphabet() {
    const dictionary = {
        0: String.fromCharCode(65),
        1: String.fromCharCode(66),
        2: String.fromCharCode(67),
        3: String.fromCharCode(68),
        4: String.fromCharCode(69),
        5: String.fromCharCode(70),
        6: String.fromCharCode(71),
        7: String.fromCharCode(72),
        8: String.fromCharCode(73),
        9: String.fromCharCode(74),
        10:String.fromCharCode(75),
        11:String.fromCharCode(76),
        12:String.fromCharCode(77),
        13:String.fromCharCode(78),
        14:String.fromCharCode(79),
        15:String.fromCharCode(80),
        16:String.fromCharCode(81),
        17:String.fromCharCode(82),
        18:String.fromCharCode(83),
        19:String.fromCharCode(84),
        20:String.fromCharCode(85),
        21:String.fromCharCode(86),
        22:String.fromCharCode(87),
        23:String.fromCharCode(88),
        24:String.fromCharCode(89),
        25:String.fromCharCode(90),
    }
    console.log(dictionary[0])
    let alphabet = ""
    alphabet += String.fromCharCode(Math.random() * (90 - 65) + 65) 
    alphabet += String.fromCharCode(Math.random() * (90 - 65) + 65) 
    alphabet += String.fromCharCode(Math.random() * (90 - 65) + 65) 
    return alphabet;
}

async function getStocksAggregates() {
  try {
    const client = polygonClient(apiKey);
    const endDate = new Date();
    const startDate = new Date(endDate.getFullYear() - 2, endDate.getMonth() - 3, endDate.getDay());

    const randomDates = getRandomDate(startDate, endDate); 
    const randomAlphabet = generateAlphabet();
    console.log(randomAlphabet);
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
    let min = Number.MAX_VALUE;
    let results = new Array();
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

    return {results: results, min: min}
  } catch (e) {
    // console.error('An error happened:', e);
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
        console.log(data);
        if (error) {
            res.send(error)
        }
        if (data?.created_at < Number(new Date()) - 60000) {
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
            console.log(data);
            console.log("here outside");
            res.send(data?.selection);
        }
    } catch (e) {
        console.log(e);
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