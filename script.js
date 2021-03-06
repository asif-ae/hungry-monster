// The core link of the API
const thelink = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

// Search Button Click Hanndler
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
  // Get result area section
  const getResultArea = document.getElementById('result-area');
  getResultArea.innerHTML = "";

  // Get detail area section
  const getDetailArea = document.getElementById('detail-area');
  getDetailArea.innerHTML = "";

  // Get form input value
  const searchInput = document.getElementById('form').value;

  // Fetch the link generated with user input
  fetch(`${thelink}${searchInput}`)
    .then(theResponse => theResponse.json())
    .then(convertedData => mealsList(convertedData));
  
  // Created an arrow function for handling result area section's items
  const mealsList = listMeals => {
    const listItems = listMeals.meals;

    // Created a condition for the "Not Found" alert
    if (listItems === null) {
      const alertItem = `
        <div class="alert alert-warning alert-dismissible fade show alert-style" role="alert">
          <h3>Nothing Found</h3>Apologize, but no results were found for the requested item.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
      getResultArea.innerHTML = alertItem;
    }

    // Control all mini card's information
    listItems.forEach(theMeal => {
      const theCard = document.createElement('div');
      theCard.classList.add('col-md-6', 'col-lg-4', 'col-xl-3', 'py-3');
      rowInResult.appendChild(theCard);
      const mealCard = `
        <div id="select-card" onclick="displayMealName('${theMeal.strMeal}')" class="card card-style">
          <img class="card-img-top" src="${theMeal.strMealThumb}" alt="${theMeal.strMeal}">
          <div class="card-body text-center">
            <h5>${theMeal.strMeal}</h5>
          </div>
        </div>
      `;
      theCard.innerHTML = mealCard;      
    });
  }

  // Create new div, added classes and append it to the result area
  const rowInResult = document.createElement('div');
  rowInResult.classList.add('row');
  getResultArea.appendChild(rowInResult);
});

// This function is created for getting single meal name from the list of html cards
// and organize the link for creating meal card with details.
const displayMealName = mealName => {
  const fullLink = `${thelink}${mealName}`;
  fetch(fullLink)
  .then(secondResponse => secondResponse.json())
  .then(singleMealDetail => renderMealDetails(singleMealDetail));
}

// Get the link from display name function and render the meal detail card
const renderMealDetails = mealDetail => {
  const singleMeal = mealDetail.meals[0];
  const detailArea = document.getElementById('detail-area');
  detailArea.innerHTML = `
    <div class="card detail-card-style">
      <img class="card-img-top" src="${singleMeal.strMealThumb}" alt="Card image cap">
      <div class="card-body">
        <h1>${singleMeal.strMeal}</h1>
        <h5 class="py-3">Ingredients</h5>
        <!-- This function is created at the bottom of the script document -->
        ${ingredientsFunction(singleMeal.strIngredient1)}
        ${ingredientsFunction(singleMeal.strIngredient2)}
        ${ingredientsFunction(singleMeal.strIngredient3)}
        ${ingredientsFunction(singleMeal.strIngredient4)}
        ${ingredientsFunction(singleMeal.strIngredient5)}
        ${ingredientsFunction(singleMeal.strIngredient6)}
        ${ingredientsFunction(singleMeal.strIngredient7)}
        ${ingredientsFunction(singleMeal.strIngredient8)}
        ${ingredientsFunction(singleMeal.strIngredient9)}
        ${ingredientsFunction(singleMeal.strIngredient10)}
        <!-- /This function is created at the bottom of the script document -->
      </div>
    </div>
  `;
}

// This function is created for ingredients section
const ingredientsFunction = ingredient => {
  const theInnerHTML = `
    <div class="form-check text-secondary">
      <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
      <label class="form-check-label" for="flexCheckChecked">${ingredient}</label>
    </div>
  `;
  return theInnerHTML;
}