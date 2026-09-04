import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale,
);

const CoinChart = ({ coinId }) => {
    const [chart, setChart] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_COIN_API_URL}/${coinId}/market_chart?${import.meta.env.VITE_CHART_API_PARAMS}`,
                );
                if (!res.ok) {
                    throw new Error('Failed to fetch chart data.');
                }
                const data = await res.json();
                const prices = data.prices.map((price) => ({
                    x: price[0],
                    y: price[1],
                }));
                setChart({
                    datasets: [
                        {
                            label: 'Price (USD)',
                            data: prices,
                            fill: true,
                            borderColor: '#007BFF',
                            backgroundColor: 'rgba(0, 123, 255, 0.1)',
                            pointRadius: 0,
                            tension: 0.3,
                        },
                    ],
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, [coinId]);

    return (
        <>
            {loading && <p>Loading Chart...</p>}
            {error && <div className="error">{error}</div>}
            {chart && (
                <div className="chart-wrapper">
                    <Line
                        data={chart}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { display: false },
                                tooltip: { mode: 'index', intersect: false },
                            },
                            scales: {
                                x: {
                                    type: 'time',
                                    time: {
                                        unit: 'day',
                                    },
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: 7,
                                    },
                                },
                                y: {
                                    ticks: {
                                        callback: (value) =>
                                            value.toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            }),
                                    },
                                },
                            },
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default CoinChart;
