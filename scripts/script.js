document.addEventListener("DOMContentLoaded", () => { const form = document.getElementById("recipe-form"); const container = document.getElementById("recipes-container");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("recipe-name").value;
        const ingredients = document.getElementById("ingredients").value;
        const category = document.getElementById("category").value;
        const preparation = document.getElementById("preparation").value;
        
        const recipe = { name, ingredients, category, preparation };
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.push(recipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));
        alert("Recipe added successfully!");
        form.reset();
    });
}

if (container) {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    container.innerHTML = recipes.map(recipe => `
        <article>
            <h2>${recipe.name}</h2>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <table border="1">
                <tr><td>${recipe.ingredients.replace(/\n/g, "<br>")}</td></tr>
            </table>
            <p>${recipe.preparation}</p>
        </article>
    `).join('');
}

});
