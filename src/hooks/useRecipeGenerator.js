import { useState } from 'react'

export function useRecipeGenerator() {
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function generateRecipe(ingredients, dietaryFilters = []) {
    setLoading(true)
    setError(null)
    setRecipe(null)

    const filterText = dietaryFilters.length > 0
      ? `The recipe MUST be: ${dietaryFilters.join(', ')}.`
      : ''

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: `You are a creative chef. Given these ingredients: ${ingredients.join(', ')}, generate a recipe.
              ${filterText}
              
              Respond ONLY with a JSON object, no markdown, no backticks, just raw JSON in this exact format:
              {
                "name": "Recipe Name",
                "description": "One sentence flavor description",
                "cookTime": "25 min",
                "servings": "2",
                "difficulty": "Easy",
                "dietaryTags": ["Vegetarian"],
                "ingredients": [
                  { "amount": "1 can", "item": "chickpeas" }
                ],
                "steps": [
                  "Step one instruction here",
                  "Step two instruction here"
                ]
              }`
            }
          ]
        })
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.message)
      }

      const text = data.content[0].text
      const cleaned = text.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(cleaned)
      setRecipe(parsed)

    } catch (err) {
      setError('Something went wrong generating your recipe. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return { recipe, loading, error, generateRecipe }
}
