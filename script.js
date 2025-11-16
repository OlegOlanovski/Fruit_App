/*async function fetchDataText() {
  try {
    let response = await fetch("https://www.fruityvice.com/api/fruit/all");
    let data = await response.json();
    console.log(data);

    let html = "";
    for (let i = 0; i < data.length; i++) {
      let fruit = data[i];
      html += `
        <div class="card" style="width: 18rem;">
           <div class="card-header">
            <h3> Name: ${fruit.name}<h3>
            </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Family: ${fruit.family}</li>
           <li class="list-group-item">Order: ${fruit.order}</li>
            <li class="list-group-item">Genus: ${fruit.genus}</li>
             <li class="list-group-item">Calories: ${fruit.nutritions.calories}</li>
              <li class="list-group-item">Fat: ${fruit.nutritions.fat}</li>
               <li class="list-group-item">Sugar: ${fruit.nutritions.sugar}</li>
                <li class="list-group-item">Carbohydrates: ${fruit.nutritions.carbohydrates}</li>
                 <li class="list-group-item">Protein: ${fruit.nutritions.protein}</li>
            
            </ul>
        </div>`;
    }

    document.getElementById("content").innerHTML = html;
  } catch (error) {
    console.error("Daten nicht verfügbar:", error);
    document.getElementById("content").innerHTML =
      "Fehler Daten nicht verfügbar";
  }
}
 этот код отображает полный список фруктов через цикл for (for - schleife)*/

async function fetchDataText() {
  try {
    let response = await fetch("https://www.fruityvice.com/api/fruit/all");
    let data = await response.json();

    // используем универсальную версию
    renderCards(data);
  } catch (error) {
    console.error("Fehler:", error);
    document.getElementById("content").innerHTML = "Daten nicht verfügbar";
  }
}
/*
// поиск фрукта вызывает только дин фрукт если пишешь ALL то выдает ошибку так как потому что запрос https://www.fruityvice.com/api/fruit/all
возвращает массив, а твоя функция renderCards показывает только первый фрукт.

async function searchFruit(event) {
  event.preventDefault();

  const input = document.getElementById("searchInput");
  const fruitName = input.value.trim().toLowerCase();
  if (!fruitName) return;

  try {
    let response = await fetch(
      "https://www.fruityvice.com/api/fruit/" + fruitName
    );

    if (!response.ok) {
      document.getElementById(
        "content"
      ).innerHTML = `<div class="alert alert-danger">Frucht "${fruitName}" nicht gefunden</div>`;
      return;
    }

    let fruit = await response.json();

    // передаём объект — универсальная функция всё сама обработает
    renderCards(fruit);
  } catch (error) {
    console.error("Fehler:", error);
    document.getElementById("content").innerHTML = "Fehler beim Laden";
  }
}*/

async function searchFruit(event) {
  event.preventDefault();

  const input = document.getElementById("searchInput");
  const fruitName = input.value.trim().toLowerCase();
  if (!fruitName) return;

  //  Если ввели "all" — показать все фрукты
  if (fruitName === "all") {
    let response = await fetch("https://www.fruityvice.com/api/fruit/all");
    let data = await response.json();
    renderAllFruits(data); // <-- показать весь список
    return;
  }

  //  Иначе показываем один фрукт
  try {
    let response = await fetch(
      "https://www.fruityvice.com/api/fruit/" + fruitName
    );

    if (!response.ok) {
      document.getElementById(
        "content"
      ).innerHTML = `<div class="alert alert-danger">Frucht "${fruitName}" nicht gefunden</div>`;
      return;
    }

    let fruit = await response.json();

    renderCards(fruit); // одна карточка
  } catch (error) {
    console.error("Fehler:", error);
    document.getElementById("content").innerHTML = "Fehler beim Laden";
  }
}

// УНИВЕРСАЛЬНЫЙ ВАРИАНТ
function renderCards(data) {
  // если data — массив → берём первый элемент
  const fruit = Array.isArray(data) ? data[0] : data;

  const html = `
      <div class="card m-3" style="width: 18rem;">
        <div class="card-header">
          <h3>${fruit.name}</h3>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Family: ${fruit.family}</li>
          <li class="list-group-item">Order: ${fruit.order}</li>
          <li class="list-group-item">Genus: ${fruit.genus}</li>
          <li class="list-group-item">Calories: ${fruit.nutritions.calories}</li>
          <li class="list-group-item">Fat: ${fruit.nutritions.fat}</li>
          <li class="list-group-item">Sugar: ${fruit.nutritions.sugar}</li>
          <li class="list-group-item">Carbohydrates: ${fruit.nutritions.carbohydrates}</li>
          <li class="list-group-item">Protein: ${fruit.nutritions.protein}</li>
        </ul>
      </div>
    `;

  document.getElementById("content").innerHTML = html;
  console.log(data);
}
// Нужно добавить отдельную функцию для отображения массива
function renderAllFruits(dataArray) {
  let html = "";

  dataArray.forEach((fruit) => {
    html += `
        <div class="card m-3" style="width: 18rem;">
          <div class="card-header">
            <h3>${fruit.name}</h3>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Family: ${fruit.family}</li>
            <li class="list-group-item">Order: ${fruit.order}</li>
            <li class="list-group-item">Genus: ${fruit.genus}</li>
            <li class="list-group-item">Calories: ${fruit.nutritions.calories}</li>
            <li class="list-group-item">Fat: ${fruit.nutritions.fat}</li>
            <li class="list-group-item">Sugar: ${fruit.nutritions.sugar}</li>
            <li class="list-group-item">Carbohydrates: ${fruit.nutritions.carbohydrates}</li>
            <li class="list-group-item">Protein: ${fruit.nutritions.protein}</li>
          </ul>
        </div>`;
  });

  document.getElementById("content").innerHTML = html;
}
