import '../styles/SavedRecipes.css'

function SavedRecipes({ savedRecipes, removeRecipe, onBack, onCook }) {
  return (
    <div className="saved-recipes">
      <div className="saved-recipes-header">
        <button className="saved-back-btn" onClick={onBack}>← Back</button>
        <h2>Saved Recipes ({savedRecipes.length})</h2>
      </div>

      {savedRecipes.length === 0 ? (
        <div className="saved-empty">
          <p className="empty-icon">🍽</p>
          <p>No saved recipes yet. Go spin something!</p>
        </div>
      ) : (
        <div className="saved-list">
          {savedRecipes.map((r, i) => (
            <div key={i} className="saved-recipe-card">
              <div className="saved-recipe-card-header">
                <div>
                  <h3>{r.name}</h3>
                  <p className="saved-recipe-meta">⏱ {r.cookTime} &nbsp;•&nbsp; {r.difficulty}</p>
                </div>
                <button className="saved-remove-btn" onClick={() => removeRecipe(r.name)}>×</button>
              </div>
              <p className="saved-recipe-description">{r.description}</p>
              <button className="saved-cook-btn" onClick={() => onCook(r)}>Cook This</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedRecipes
