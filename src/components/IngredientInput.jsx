import { useState } from 'react'
import '../styles/IngredientInput.css'

function IngredientInput({ ingredients, setIngredients }) {
  const [text, setText] = useState('')

  function addItem() {
    const val = text.trim()
    if (val && !ingredients.includes(val)) {
      setIngredients([...ingredients, val])
    }
    setText('')
  }

  function handleKey(e) {
    if (e.key === 'Enter') addItem()
  }

  function removeItem(item) {
    setIngredients(ingredients.filter(x => x !== item))
  }

  return (
    <div className="ingredient-input">
      <label>Add your ingredients:</label>
      <div className="ingredient-input-row">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKey}
          placeholder="e.g. eggs, tomatoes..."
        />
        <button onClick={addItem}>Add</button>
      </div>

      <div className="ingredient-tags">
        {ingredients.map(item => (
          <span key={item} className="ingredient-tag">
            {item}
            <span className="ingredient-tag-remove" onClick={() => removeItem(item)}>x</span>
          </span>
        ))}
      </div>

      {ingredients.length > 0 && (
        <button className="clear-all-btn" onClick={() => setIngredients([])}>
          clear all
        </button>
      )}
    </div>
  )
}

export default IngredientInput
