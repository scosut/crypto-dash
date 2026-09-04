const SortSelect = ({ sort, setSort }) => {
    return (
        <div className="controls">
            <label htmlFor="sort">Sort By:</label>
            <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
            >
                <option value="market_cap|desc">
                    Market Cap (High to Low)
                </option>
                <option value="market_cap|asc">Market Cap (Low to High)</option>
                <option value="current_price|desc">Price (High to Low)</option>
                <option value="current_price|asc">Price (Low to High)</option>
                <option value="price_change_percentage_24h|desc">
                    24h Change (High to Low)
                </option>
                <option value="price_change_percentage_24h|asc">
                    24h Change (Low to High)
                </option>
            </select>
        </div>
    );
};

export default SortSelect;
