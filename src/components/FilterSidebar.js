import React from "react";

function FilterSidebar({
  filterProducts,
}) {

  return (

    <div className="dashboard-sidebar">

      <h2>Filters</h2>

      <button
        onClick={() =>
          filterProducts("All")
        }
      >
        All
      </button>

      <button
        onClick={() =>
          filterProducts("Men")
        }
      >
        Men
      </button>

      <button
        onClick={() =>
          filterProducts("Women")
        }
      >
        Women
      </button>

      <button
        onClick={() =>
          filterProducts("Kids")
        }
      >
        Kids
      </button>

      <button
        onClick={() =>
          filterProducts("Shoes")
        }
      >
        Shoes
      </button>

      <button
        onClick={() =>
          filterProducts(
            "Electronics"
          )
        }
      >
        Electronics
      </button>

    </div>
  );
}

export default FilterSidebar;