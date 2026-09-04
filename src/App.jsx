import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import Header from './components/Header';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import NotFoundPage from './pages/not-found';
import CoinDetailsPage from './pages/coin-details';

const App = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(10);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('market_cap|desc');

    const updateParams = (key, value) => {
        const url = new URL(
            `${import.meta.env.VITE_COINS_API_URL}?${import.meta.env.VITE_COINS_API_PARAMS}`,
        );

        if (key && value) {
            url.searchParams.set(key, value);
        }

        return url;
    };

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const res = await fetch(updateParams('per_page', limit));
                if (!res.ok) {
                    throw new Error('Failed to fetch coins data.');
                }
                const data = await res.json();
                setCoins(data);
            } catch (err) {
                setError(err.message);
            } finally {
                const timer = setTimeout(() => {
                    setLoading(false);
                }, 500);

                return () => clearTimeout(timer);
            }
        };

        fetchCoins();
    }, [limit]);

    return (
        <>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            loading={loading}
                            error={error}
                            coins={coins}
                            filter={filter}
                            setFilter={setFilter}
                            limit={limit}
                            setLimit={setLimit}
                            sort={sort}
                            setSort={setSort}
                        />
                    }
                />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/coins/:id" element={<CoinDetailsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
};

export default App;
