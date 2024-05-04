console.log("Начало");

const appWrapp = document.createElement("div");
const appSearch = document.createElement("div");
const titleSearch = document.createElement("h1");
const searchInput = document.createElement("input");
const searchList = document.createElement("div");

// const dropList = document.createElement("div");

const titleAdded = document.createElement("h2");
const addedPost = document.createElement("div");
const addedList = document.createElement("li");

titleAdded.textContent = "Добавленные репозитории";
titleSearch.textContent = "Поиск";

appWrapp.append(appSearch);
appWrapp.appendChild(titleSearch);
appWrapp.appendChild(searchInput);
appWrapp.appendChild(searchList);
appWrapp.appendChild(titleAdded);
appWrapp.appendChild(addedPost);
document.body.append(appWrapp);

appWrapp.classList.add("app-wrapper");
addedPost.classList.add("app-add");
searchInput.setAttribute("placeholder", "Поиск");

let listArray = [];

async function searchPost() {
  if (searchInput.value.trim().length === 0) {
    searchList.innerHTML = "";
  }
  if (searchInput.value.trim().length > 0) {
    await requestSearch(searchInput.value);
    downList();
  }
}

async function requestSearch(value) {
  let ListPost = await fetch(
    `https://api.github.com/search/repositories?q=${value}&per_page=5`
  );
  const post = await ListPost.json();
  listArray = post.items;
}

function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

function downList() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; listArray.length > i; i++) {
    const elementList = document.createElement("li");
    elementList.textContent = listArray[i].name;
    fragment.appendChild(elementList);
    elementList.classList.add("li-cursor");
  }
  searchList.innerHTML = "";
  searchList.appendChild(fragment);
  // appWrapp.appendChild(dropList);
}

searchInput.addEventListener("keyup", debounce(searchPost.bind(this), 400));
searchList.addEventListener("click", (e) => {
  let postTarget = listArray.find((el) => el.name === e.target.textContent);
  addedPost.insertAdjacentHTML(
    "beforeEnd",
    `<li><p>Название: ${postTarget.name}</p>
    <p>Владелец: ${postTarget.owner.login}</p>
    <p>Количество звезд: ${postTarget.stargazers_count}</p>
    <button>Удалить репозиторий</button></li>`
  );

  searchList.innerHTML = "";
  searchInput.value = "";
});

addedPost.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
  }
});

console.log("Конец");
