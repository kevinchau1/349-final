import '../styles/Hero.css'

function Hero() {
  function scrollToApp() {
    document.getElementById('app-section').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>🍴 Fridge Roulette</h1>
        <p>
          Don't know what to cook? Just tell us what's in your fridge
          and we'll come up with something delicious.
        </p>
        <button className="hero-scroll-btn" onClick={scrollToApp}>
          Let's Get Cooking
        </button>
      </div>
      <div className="hero-arrow" onClick={scrollToApp}>↓</div>
    </div>
  )
}

export default Hero
