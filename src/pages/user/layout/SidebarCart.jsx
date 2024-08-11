import "./SidebarRight.scss";

const SidebarCart = ({ isSidebarCart, toggleSidebarCart }) => (
  <div
    className={`sidebar-right-overlay ${isSidebarCart ? "visible" : ""}`}
    onClick={toggleSidebarCart}
  >
    <div
      className={`sidebar-right ${isSidebarCart ? "open" : ""}`}
      onClick={e => e.stopPropagation()}
    >
      <ul>
        <li className="nav__item" onClick={toggleSidebarCart}>
          <button>카트</button>
        </li>
      </ul>
    </div>
  </div>
);

export default SidebarCart;
