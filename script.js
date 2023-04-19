//-------------Creating References----------------------

const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

//-------------Showing Recepies on Page Load----------------------

getMealList();

//-------------Adding Event Listener----------------------

searchBtn.addEventListener('click', getMealList);

//-------------Creating Function for Search----------------------

function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=ec991d7219394d28af708e2c207da519&query=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.results) {
                data.results.forEach(meal => {
                    html += `
                    <div class = "meal-item" data-id = "${meal.id}">
                        <div class = "meal-img">
                            <img src = "${meal.image}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.title}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
                });
                mealList.innerHTML = html;
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry, your meal was not found!";
                mealList.classList.add('notFound');
            }

        });
}

//-------------Adding Event Listener for Second Page----------------------

mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

//-------------Creating Function for Second Page----------------------

function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://api.spoonacular.com/recipes/${mealItem.dataset.id}/information?apiKey=ec991d7219394d28af708e2c207da519`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data));
    }
}

//-------------Creating Function for Instructions----------------------

function mealRecipeModal(meal) {
    console.log(meal);
    let html = `
        <h2 class = "recipe-title">${meal.title}</h2>
            <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.instructions}</p>
        </div>
       
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}