const FilterInput = ({ filter, setFilter }) => {
    return (
        <div className="filter">
            <input
                type="text"
                placeholder="Filter by name or symbol..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
        </div>
    );
};

export default FilterInput;
