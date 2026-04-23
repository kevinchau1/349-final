import { useState } from "react";
import "./styles/CookingMode.css";

function CookingMode({ recipe, onExit }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const total = recipe.steps.length;

  function next() {
    if (step === total - 1) {
      setDone(true);
    } else {
      setStep(step + 1);
    }
  }

  if (done) {
    return (
      <div className="cooking-done">
        <p className="done-icon">Done!</p>
        <h2>You're done!</h2>
        <p>Enjoy your {recipe.name}!</p>
        <button className="cooking-done-btn" onClick={onExit}>
          Back to Recipe
        </button>
      </div>
    );
  }

  return (
    <div className="cooking-mode">
      <div className="cooking-mode-header">
        <button className="cooking-exit-btn" onClick={onExit}>
          ← Exit
        </button>
        <span className="cooking-step-counter">
          Step {step + 1} of {total}
        </span>
      </div>

      <div className="cooking-progress-bar">
        <div
          className="cooking-progress-fill"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      <div className="cooking-step-box">
        <p>{recipe.steps[step]}</p>
      </div>

      <div className="cooking-ingredients">
        <p className="cooking-ingredients-label">Ingredients</p>
        <div className="cooking-ingredients-list">
          {recipe.ingredients.map((ing, i) => (
            <span key={i} className="cooking-ingredient-tag">
              {ing.amount} {ing.item}
            </span>
          ))}
        </div>
      </div>

      <div className="cooking-nav">
        <button
          className="cooking-back-btn"
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
        >
          ← Back
        </button>
        <button className="cooking-next-btn" onClick={next}>
          {step === total - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default CookingMode;
