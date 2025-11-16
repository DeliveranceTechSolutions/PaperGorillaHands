require('dotenv').config();
import express, { Application, Request, Response, NextFunction, Router } from 'express';
import getStocksAggregates from './routes/stonks';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from './db/client';

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
        if (data?.created_at < Number(new Date()) - 30000 || data?.selection?.results.length <= 0) {
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