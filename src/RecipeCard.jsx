import "./styles/RecipeCard.css";

function RecipeCard({ recipe, onRespin, onSave, onStartCooking }) {
  return (
    <div className="recipe-card">
      <div className="recipe-card-header">
        <h2>{recipe.name}</h2>
        <button className="save-btn" onClick={onSave} title="Save recipe">
          🤍
        </button>
      </div>

      <p className="recipe-description">{recipe.description}</p>

      <div className="recipe-meta">
        <span>{recipe.cookTime}</span>
        <span>{recipe.servings} servings</span>
        <span>{recipe.difficulty}</span>
      </div>

      {recipe.dietaryTags?.length > 0 && (
        <div className="recipe-tags">
          {recipe.dietaryTags.map((tag) => (
            <span key={tag} className="recipe-tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <hr className="recipe-divider" />

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>
            {ing.amount} {ing.item}
          </li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <ol>
        {recipe.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      <div className="recipe-card-buttons">
        <button className="cook-btn" onClick={onStartCooking}>
          Start Cooking
        </button>
        <button className="respin-btn" onClick={onRespin}>
          Respin
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
