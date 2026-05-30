import "../styles/sidebar.css";

function Sidebar({ setFilter }) {
  return (
    <div className="sidebar">
      <h3>Filters</h3>

      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("summer")}>Summer Deals</button>
      <button onClick={() => setFilter("week")}>Week Deals</button>
    </div>
  );
}

export default Sidebar;