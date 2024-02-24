const searchbtn = document.querySelector(".search");
const userInput = document.querySelector(".search-box");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetails = document.querySelector(".recipe-details")
const closeBtn =document.querySelector(".close-popup");



const fetchRecipe = async (input) =>{
    recipeContainer.innerHTML="<h2>Fetching recipe........</h2>";
    //  const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=${input}";
     const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);
     const data = await res.json();
    
     recipeContainer.innerHTML="";


     data.meals.forEach( meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = ` 
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strCategory}</p>
        <p>${meal.strArea} Dish</p>`

        const button = document.createElement('button');
        button.textContent="View Recipe";
        recipeDiv.appendChild(button);

        // add button event listner
        button.addEventListener('click', () => {
            recipePopup(meal)
        })
        recipeContainer.appendChild(recipeDiv);
     });
}

// function of ingredients
const fetchIngredents = (meal)=>{
    let ingredientsList = "";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`]
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else {
            break;
        }
    }
    return ingredientsList;
}

const recipePopup = (meal) => {
    recipeDetails.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredientList">${fetchIngredents(meal)}</ul>
    <div class="recipeinstructions">
    <h3>Instructions</h3>
    <p>${meal.strInstructions}</p>
    </div>
    `
    recipeDetails.parentElement.style.display="block";
    
}

closeBtn.addEventListener("click", ()=>{
    recipeDetails.parentElement.style.display="none";
    
})

searchbtn.addEventListener("click", (e) => {
    e.preventDefault();
    if(!userInput.value.trim()){
        recipeContainer.innerHTML=`<h2>Type meal in the search box</h2>`;
        return;
    }
    fetchRecipe(userInput.value);
});