import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';

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
    const queryClient = useQueryClient();
    const { data, error } = useQuery({
            queryKey: [`stonks`],
            queryFn: getStocksAggregates,
        },
        queryClient
    );
    console.log(data!);
    console.log(error);

    return(
        <LineChart
        style={{ width: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
        responsive
        data={(data as any)?.results!}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[(data as any)?.min! - 10, 'dataMax + 10']} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" isAnimationActive={isAnimationActive} />
        </LineChart>
    )
};
