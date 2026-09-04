import CoinCard from '../components/CoinCard';
import LimitSelect from '../components/LimitSelect';
import FilterInput from '../components/FilterInput';
import SortSelect from '../components/SortSelect';
import Spinner from '../components/Spinner';

const HomePage = ({
    loading,
    error,
    coins,
    filter,
    setFilter,
    limit,
    setLimit,
    sort,
    setSort,
}) => {
    const filteredCoins = coins
        .filter((coin) => {
            return (
                coin.name.toLowerCase().includes(filter.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(filter.toLowerCase())
            );
        })
        .sort((a, b) => {
            const [key, order] = sort.split('|');
            return order === 'asc' ? a[key] - b[key] : b[key] - a[key];
        });

    return (
        <div>
            <h1>🚀 Crypto Dash</h1>
            {loading && <Spinner />}
            {error && <div className="error">{error}</div>}
            <div className="top-controls">
                <FilterInput filter={filter} setFilter={setFilter} />
                <LimitSelect limit={limit} setLimit={setLimit} />
                <SortSelect sort={sort} setSort={setSort} />
            </div>

            {!loading && !error && (
                <main className="grid">
                    {filteredCoins.length ? (
                        filteredCoins.map((coin) => (
                            <CoinCard coin={coin} key={coin.id} />
                        ))
                    ) : (
                        <p>No matching coins.</p>
                    )}
                </main>
            )}
        </div>
    );
};

export default HomePage;
