import { useState } from 'react'

export function useSavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState(() => {
    try {
      const stored = localStorage.getItem('fridgeRouletteSaved')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  function saveRecipe(recipe) {
    const alreadySaved = savedRecipes.some(r => r.name === recipe.name)
    if (alreadySaved) return

    const updated = [{ ...recipe, savedAt: new Date().toISOString() }, ...savedRecipes]
    setSavedRecipes(updated)
    localStorage.setItem('fridgeRouletteSaved', JSON.stringify(updated))
  }

  function removeRecipe(recipeName) {
    const updated = savedRecipes.filter(r => r.name !== recipeName)
    setSavedRecipes(updated)
    localStorage.setItem('fridgeRouletteSaved', JSON.stringify(updated))
  }

  return { savedRecipes, saveRecipe, removeRecipe }
}
