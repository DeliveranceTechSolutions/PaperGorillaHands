import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
import { useStonkStore } from '../stores/stonkStore';

async function getStocksAggregates () {
    try {
        const res = await fetch("http://localhost:3000/stonks", {
            method: "GET",
            headers: {
                "Content-Type": "json/application"
            }
        });
        console.log(res);
        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
        }

        const result = await res.json();
        return result;
    } catch (e) {
        console.log(e);
        return {};
    }
}

export default function PaperHandsLineChart({ isAnimationActive = true }) {
    const {
        buy, sell, 
        min, setMin,
        stonks, setStonks,
        revealStonks, setStonksReveal,
        ticker, setTicker,
    } = useStonkStore();

    const queryClient = useQueryClient();
    const { data } = useQuery({
            queryKey: [`stonks`],
            queryFn: getStocksAggregates,
            staleTime: 1000 * 60,
            gcTime: 1000 * 60,
            refetchInterval: 1000 * 20,
        },
        queryClient
    );

    if (data && ticker !== data?.alphabet) {
        setStonks(data?.results);
        setStonksReveal(data?.revealResults);
        setTicker(data?.alphabet);
        setMin(data?.min);
    }
    console.log(revealStonks, buy, sell);
    return(
        <div>
            <div className="w-full justify-center items-center flex font-bold text-4xl">{ticker || "AAAAAA"}</div>
            <LineChart
            style={{ width: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={buy === 0 && sell === 0 ? stonks : stonks.concat(revealStonks)}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[min - 10 || 0, 'dataMax + 10']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" isAnimationActive={isAnimationActive} />
            </LineChart>
        </div>
    )
};
