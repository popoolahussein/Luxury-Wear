import PropTypes from 'prop-types';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      className="search-box"
      type="text"
      placeholder="Search for items..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;
