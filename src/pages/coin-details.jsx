import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Spinner from '../components/Spinner';
import CoinChart from '../components/CoinChart';

const CoinDetailsPage = ({ coins }) => {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCoin = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_COIN_API_URL}/${id}?${import.meta.env.VITE_COIN_API_PARAMS}`,
                );
                if (!res.ok) {
                    throw new Error('Failed to fetch coin data.');
                }
                const data = await res.json();
                setCoin(data);
            } catch (err) {
                setError(err.message);
            } finally {
                const timer = setTimeout(() => {
                    setLoading(false);
                }, 500);

                return () => clearTimeout(timer);
            }
        };

        fetchCoin();
    }, [id]);

    return (
        <>
            {loading && <Spinner />}
            <div className="coin-details-container">
                {error && <div className="error">{error}</div>}
                {coin && (
                    <>
                        <h1 className="coin-details-title">
                            {!loading && !error
                                ? `${coin.name} ${coin.symbol.toUpperCase()}`
                                : 'Coin Details'}
                        </h1>
                        <img
                            src={coin.image.large}
                            alt={coin.name}
                            className="coin-details-image"
                        />
                        <p>{coin.description.en.split('. ')[0] + '.'}</p>
                        <div className="coin-details-info">
                            <h3>Rank: #{coin.market_cap_rank}</h3>
                            <h3>
                                Current Price:{' '}
                                {coin.market_data.current_price.usd.toLocaleString(
                                    'en-US',
                                    {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    },
                                )}
                            </h3>
                            <h4>
                                Market Cap:{' '}
                                {coin.market_data.market_cap.usd.toLocaleString(
                                    'en-US',
                                    {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    },
                                )}
                            </h4>
                            <h4>
                                24h High:{' '}
                                {coin.market_data.high_24h.usd.toLocaleString(
                                    'en-US',
                                    {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    },
                                )}
                            </h4>
                            <h4>
                                24h Low:{' '}
                                {coin.market_data.low_24h.usd.toLocaleString(
                                    'en-US',
                                    {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    },
                                )}
                            </h4>
                            <h4>
                                24h Price Change:{' '}
                                {coin.market_data.price_change_24h.toLocaleString(
                                    'en-US',
                                    {
                                        style: 'currency',
                                        currency: 'USD',
                                    },
                                )}
                                &nbsp; (
                                {coin.market_data.price_change_percentage_24h.toFixed(
                                    2,
                                )}
                                %)
                            </h4>
                            <h4>
                                Circulating Supply:{' '}
                                {coin.market_data.circulating_supply.toLocaleString(
                                    'en-US',
                                    {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    },
                                )}
                            </h4>
                            <h4>
                                Total Supply:{' '}
                                {coin.market_data.total_supply?.toLocaleString(
                                    'en-US',
                                    {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    },
                                ) || 'N/A'}
                            </h4>
                            <h4>
                                All-Time High:{' '}
                                {coin.market_data.ath.usd.toLocaleString(
                                    'en-US',
                                    {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    },
                                )}{' '}
                                on{' '}
                                {new Date(
                                    coin.market_data.ath_date.usd,
                                ).toLocaleDateString()}
                            </h4>
                            <h4>
                                All-Time Low:{' '}
                                {coin.market_data.atl.usd.toLocaleString(
                                    'en-US',
                                    {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    },
                                )}{' '}
                                on{' '}
                                {new Date(
                                    coin.market_data.atl_date.usd,
                                ).toLocaleDateString()}
                            </h4>
                            <h4>
                                Last Updated:{' '}
                                {new Date(
                                    coin.last_updated,
                                ).toLocaleDateString()}
                            </h4>
                        </div>
                        <CoinChart coinId={coin.id} />
                        <div className="coin-details-links">
                            {coin.links.homepage.length && (
                                <p>
                                    🌐{' '}
                                    <a
                                        href={coin.links.homepage[0]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Website
                                    </a>
                                </p>
                            )}
                            {coin.links.blockchain_site.length && (
                                <p>
                                    🧩{' '}
                                    <a
                                        href={coin.links.blockchain_site[0]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Blockchain Explorer
                                    </a>
                                </p>
                            )}
                            {coin.categories.length && (
                                <p>
                                    <strong>Categories:</strong>{' '}
                                    {coin.categories.join(', ')}
                                </p>
                            )}
                        </div>
                    </>
                )}
                {!loading && !error && !coin && <p>No Data Found.</p>}
            </div>
        </>
    );
};

export default CoinDetailsPage;
