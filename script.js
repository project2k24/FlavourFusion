const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRecipes();
});
if (searchInput) {
    // Log the input element to the console
    console.log(searchInput);
} else {
    console.error('Element with ID "search" not found.');
}
async function searchRecipes() {

    try {
        const response = await fetch(`https://api.edamam.com/search?q=${searchInput}&app_id=74193a31&app_key=808d4c6b03a8f91ab0835f42621deedd&from=0&to=10`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error('Error fetching and parsing data:', error);
        resultsList.innerHTML = '<p>Failed to fetch recipes. Please try again later.</p>';
    }
}

function displayRecipes(recipes) {
    let html = '';
    recipes.forEach((recipe) => {
        html += `
        <div>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
            <ul>
                ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div> 
        `;
    });
    resultsList.innerHTML = html;
}
