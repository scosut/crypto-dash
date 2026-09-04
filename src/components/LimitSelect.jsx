const LimitSelect = ({ limit, setLimit }) => {
    return (
        <div className="controls">
            <label htmlFor="limit">Show: </label>
            <select
                id="limit"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
            >
                <option>5</option>
                <option>10</option>
                <option>20</option>
                <option>50</option>
                <option>100</option>
            </select>
        </div>
    );
};

export default LimitSelect;
