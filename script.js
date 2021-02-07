// The core link of the API
const thelink = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

// Search Button Click Hanndler
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
  const getResultArea = document.getElementById('result-area');
  getResultArea.innerHTML = "";
  const getDetailArea = document.getElementById('detail-area');
  getDetailArea.innerHTML = "";
  const searchInput = document.getElementById('form').value;
  fetch(`${thelink}${searchInput}`)
    .then(theResponse => theResponse.json())
    .then(convertedData => mealsList(convertedData));
  const rowInResult = document.createElement('div');
  rowInResult.classList.add('row');
  getResultArea.appendChild(rowInResult);
  const mealsList = listMeals => {
    const listItems = listMeals.meals;
    if (listItems === null) {
      const alertItem = `
        <div class="alert alert-warning alert-dismissible fade show alert-style" role="alert">
          <h3>Nothing Found</h3>Apologize, but no results were found for the requested item.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
      getResultArea.innerHTML = alertItem;
    }
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
});

const displayMealName = mealName => {
  const fullLink = `${thelink}${mealName}`;
  fetch(fullLink)
  .then(secondResponse => secondResponse.json())
  .then(singleMealDetail => renderMealDetails(singleMealDetail));
}
const renderMealDetails = mealDetail => {
  const singleMeal = mealDetail.meals[0];
  const detailArea = document.getElementById('detail-area');
  detailArea.innerHTML = `
    <div class="card detail-card-style">
      <img class="card-img-top" src="${singleMeal.strMealThumb}" alt="Card image cap">
      <div class="card-body">
        <h1>${singleMeal.strMeal}</h1>
        <h5 class="py-3">Ingredients</h5>
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
      </div>
    </div>
  `;
}

const ingredientsFunction = ingredient => {
  const theInnerHTML = `
    <div class="form-check text-secondary">
      <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
      <label class="form-check-label" for="flexCheckChecked">${ingredient}</label>
    </div>
  `;
  return theInnerHTML;
}