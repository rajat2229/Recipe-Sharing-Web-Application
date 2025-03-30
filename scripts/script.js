document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("recipe-form");
    const container = document.getElementById("recipes-container");
    const filterSelect = document.getElementById("filter");

    function getRecipes() {
        return JSON.parse(localStorage.getItem("recipes")) || [];
    }

    function saveRecipes(recipes) {
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }

    function displayRecipes(filter = "All") {
        const recipes = getRecipes();
        container.innerHTML = recipes
            .filter(recipe => filter === "All" || recipe.category === filter)
            .map(recipe => `
                <article>
                    <h2>${recipe.name}</h2>
                    <p><strong>Category:</strong> ${recipe.category}</p>
                    <table>
                        <tr><td>${recipe.ingredients.replace(/\n/g, "<br>")}</td></tr>
                    </table>
                    <p>${recipe.preparation.replace(/\n/g, "<br>")}</p>
                </article>
            `).join('');
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("recipe-name").value.trim();
            const ingredients = document.getElementById("ingredients").value.trim();
            const category = document.getElementById("category").value;
            const preparation = document.getElementById("preparation").value.trim();

            if (!name || !ingredients || !preparation) {
                alert("Please fill out all required fields.");
                return;
            }

            const newRecipe = { name, ingredients, category, preparation };
            const recipes = getRecipes();
            recipes.push(newRecipe);
            saveRecipes(recipes);

            alert("Recipe added successfully!");
            form.reset();
        });
    }

    if (container) {
        displayRecipes();
    }

    if (filterSelect) {
        filterSelect.addEventListener("change", () => {
            displayRecipes(filterSelect.value);
        });
    }
});
const darkModeToggle = document.getElementById("dark-mode-toggle");

if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode"));
    });

    if (localStorage.getItem("dark-mode") === "true") {
        document.body.classList.add("dark-mode");
    }
}

