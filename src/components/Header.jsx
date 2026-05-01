import "../styles/Header.css";

function Header({ onSavedClick, onAboutClick, showBack }) {
  return (
    <div className="header">
      <h1>Fridge Roulette</h1>
      <div className="header-buttons">
        {!showBack && (
          <button className="header-btn-outline" onClick={onAboutClick}>
            About
          </button>
        )}
        <button className="header-btn" onClick={onSavedClick}>
          {showBack ? "Back" : "Saved"}
        </button>
      </div>
    </div>
  );
}

export default Header;
