import { Link } from 'react-router';

const CoinCard = ({ coin }) => {
    return (
        <Link to={`/coins/${coin.id}`}>
            <div className="coin-card">
                <div className="coin-header">
                    <img
                        src={coin.image}
                        alt={coin.name}
                        className="coin-image"
                    />
                    <div>
                        <h2>{coin.name}</h2>
                        <p className="symbol">{coin.symbol}</p>
                    </div>
                </div>
                <p>
                    Price:{' '}
                    {coin.current_price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    })}
                </p>
                <p
                    className={
                        coin.price_change_percentage_24h < 0
                            ? 'negative'
                            : 'positive'
                    }
                >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
                <p>
                    Market Cap:{' '}
                    {coin.market_cap.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                    })}
                </p>
            </div>
        </Link>
    );
};

export default CoinCard;
