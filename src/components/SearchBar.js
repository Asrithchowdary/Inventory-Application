import React from "react";

import "../styles/search.css";

function SearchBar({
  search,
  setSearch,
}) {

  return (

    <div className="search-bar">

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

    </div>
  );
}

export default SearchBar;