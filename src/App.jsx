import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import IngredientInput from "./components/IngredientInput";
import FridgeScanner from "./components/FridgeScanner";
import Spinner from "./components/Spinner";
import SavedRecipes from "./components/SavedRecipes";
import RecipeCard from "./RecipeCard";
import CookingMode from "./CookingMode";
import { useRecipeGenerator } from "./hooks/useRecipeGenerator";
import { useSavedRecipes } from "./hooks/useSavedRecipes";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [page, setPage] = useState("home");
  const [cookingRecipe, setCookingRecipe] = useState(null);
  const [savedRecipe, setSavedRecipe] = useState(null);

  const { recipe, loading, error, generateRecipe } = useRecipeGenerator();
  const { savedRecipes, saveRecipe, removeRecipe } = useSavedRecipes();

  function handleSave() {
    if (recipe) {
      saveRecipe(recipe);
      alert(recipe.name + " saved!");
    }
  }

  function handleCookSaved(r) {
    setSavedRecipe(r);
    setCookingRecipe(r);
    setPage("cooking");
  }

  if (page === "cooking" && cookingRecipe) {
    return (
      <CookingMode recipe={cookingRecipe} onExit={() => setPage("home")} />
    );
  }

  if (page === "about") {
    return (
      <>
        <Header
          onSavedClick={() => setPage("saved")}
          onAboutClick={() => setPage("home")}
          showBack={true}
        />
        <About onBack={() => setPage("home")} />
        <Footer />
      </>
    );
  }

  if (page === "saved") {
    return (
      <>
        <Header onSavedClick={() => setPage("home")} showBack={true} />
        <SavedRecipes
          savedRecipes={savedRecipes}
          removeRecipe={removeRecipe}
          onBack={() => setPage("home")}
          onCook={handleCookSaved}
        />
      </>
    );
  }

  return (
    <div>
      <Header
        onSavedClick={() => setPage("saved")}
        onAboutClick={() => setPage("about")}
      />
      <Hero />

      <div id="app-section" className="app-container">
        <FridgeScanner
          onIngredientsFound={(found) => {
            const merged = [...new Set([...ingredients, ...found])];
            setIngredients(merged);
          }}
        />

        <IngredientInput
          ingredients={ingredients}
          setIngredients={setIngredients}
        />

        <button
          className="spin-btn"
          onClick={() => generateRecipe(ingredients)}
          disabled={ingredients.length < 2 || loading}
        >
          {loading ? "Working on it..." : "Click to Generate Recipe"}
        </button>

        {ingredients.length < 2 && !recipe && !loading && (
          <p className="hint-msg">Add at least 2 ingredients to get started</p>
        )}

        {error && <p className="error-msg">{error}</p>}
        {loading && <Spinner />}

        {(recipe || savedRecipe) && !loading && (
          <RecipeCard
            recipe={recipe || savedRecipe}
            onRespin={() => generateRecipe(ingredients)}
            onSave={handleSave}
            onStartCooking={() => {
              setCookingRecipe(recipe || savedRecipe);
              setPage("cooking");
            }}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
