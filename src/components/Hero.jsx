import "../styles/Hero.css";

function Hero() {
  function scrollToApp() {
    document
      .getElementById("app-section")
      .scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>Fridge Roulette</h1>
        <p>Click the button to get started.</p>
        <button className="hero-scroll-btn" onClick={scrollToApp}>
          Get Cooking
        </button>
      </div>
    </div>
  );
}

export default Hero;
