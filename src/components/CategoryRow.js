function CategoryRow({ setFilter }) {
  return (
    <div className="category-row">

      <div onClick={() => setFilter("Men")} className="category-card">
        <h5>Men</h5>
      </div>

      <div onClick={() => setFilter("Women")} className="category-card">
        <h5>Women</h5>
      </div>

      <div onClick={() => setFilter("Electronics")} className="category-card">
        <h5>Electronics</h5>
      </div>

      <div onClick={() => setFilter("Home")} className="category-card">
        <h5>Home</h5>
      </div>

    </div>
  );
}

export default CategoryRow;