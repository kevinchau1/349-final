import "../styles/About.css";

function About({ onBack }) {
  return (
    <div className="about">
      <div className="about-header">
        <button className="about-back-btn" onClick={onBack}>
          ← Back
        </button>
        <h2>About Fridge Roulette</h2>
      </div>

      <div className="about-section">
        <h3>What is this?</h3>
        <p>
          Fridge Roulette is a web application that helps you figure out what to
          cook using whatever ingredients you already have at home. Just add
          your ingredients, hit generate, and let AI come up with a creative
          recipe for you.
        </p>
        <p>
          You can also scan a photo of your fridge and the app will
          automatically detect your ingredients for you. No more staring at the
          fridge wondering what to make!
        </p>
      </div>

      <div className="about-section">
        <h3>Project Info</h3>
        <p>
          <strong>Created by:</strong> Kevin Chau
        </p>
        <p>
          <strong>Course:</strong> CPSC 349: Front-End Web Development
        </p>
        <p>
          <strong>Project Type:</strong> React Project with AI integration!
        </p>
      </div>

      <div className="about-section">
        <h3>Technologies & Credits</h3>

        <div className="credit-item">
          <div className="credit-info">
            <strong>React</strong>
            <span>
              JavaScript framework used to build the entire UI and manage app
              state
            </span>
          </div>
        </div>

        <div className="credit-item">
          <div className="credit-info">
            <strong>Vite</strong>
            <span>
              Build tool used to set up and run the React development
              environment
            </span>
          </div>
        </div>

        <div className="credit-item">
          <div className="credit-info">
            <strong>AI (ChatGPT)</strong>
            <span>
              AI API used to generate recipes from ingredients and scan fridge
              photos for food items
            </span>
          </div>
        </div>

        <div className="credit-item">
          <div className="credit-info">
            <strong>CSS</strong>
            <span>
              Custom CSS stylesheets used for all styling and layout throughout
              the app
            </span>
          </div>
        </div>

        <div className="credit-item">
          <div className="credit-info">
            <strong>Unsplash</strong>
            <span>
              Free stock photography used for the fridge background image on the
              hero section
            </span>
          </div>
        </div>

        <div className="credit-item">
          <div className="credit-info">
            <strong>localStorage (Browser API)</strong>
            <span>
              Built-in browser feature used to save and persist recipes across
              sessions
            </span>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h3>Features</h3>
        <p>AI-powered recipe generation from your ingredients</p>
        <p>Fridge photo scanning to auto-detect ingredients</p>
        <p>Step-by-step cooking mode</p>
        <p>Save and revisit your favourite recipes</p>
        <p>Dietary filter support</p>
      </div>
    </div>
  );
}

export default About;
