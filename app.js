console.log("Начало!");

class App {
  constructor() {
    this.wrapp = document.createElement("div");
    this.title = document.createElement("h1");
    this.search = document.createElement("input");
    this.searchReply = document.createElement("div");
    this.title.textContent = "Поиск постов";
    this.listPostWrapp = document.createElement("div");
    this.listPostTitle = document.createElement("h2");
    this.listPostTitle.textContent = "Список добалвенных репозиториев";
    this.listPostItem = document.createElement("div");

    this.postList = document.createElement("div");
    this.postListItem = document.createElement("li");

    this.wrapp.appendChild(this.title);
    this.wrapp.appendChild(this.search);
    document.body.append(this.wrapp);
    this.listPostWrapp.appendChild(this.listPostTitle);
    this.listPostWrapp.appendChild(this.listPostItem);
    this.wrapp.appendChild(this.searchReply);
    document.body.appendChild(this.listPostWrapp);
  }
}

class Search {
  constructor(app) {
    this.app = app;
    this.debounceSearchPost = this.debounce(this.searchPost.bind(this), 200); // устанавливаем задержку в 300 миллисекунд
    this.app.search.addEventListener("keyup", this.debounceSearchPost);
  }

  async searchPost() {
    return await fetch(
      `https://api.github.com/search/repositories?q=${this.app.search.value}`
    ).then((reply) => {
      reply.json().then((reply) => {
        if (this.app.search.value) {
          this.postList(reply.items);
          this.clickEvent(this.app.searchReply, reply.items);
        }
        if (!this.app.search.value) {
          this.app.searchReply.innerHTML = "";
        }
      });
    });
  }

  debounce(func, wait) {
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

  postList(element) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 5; i++) {
      let listPost = document.createElement("li");
      listPost.textContent = element[i].name;
      fragment.appendChild(listPost);
    }
    this.app.searchReply.innerHTML = "";
    this.app.searchReply.appendChild(fragment);
    console.log(this.app.wrapp);
  }

  clickEvent(list, arr) {
    list.addEventListener("click", (e) => {
      e.stopPropagation();
      try {
        let newArr = arr.find((item) => item.name === e.target.textContent);
        e.target.textContent = `Название: ${newArr.name}`;
        e.target.textContent += "\n" + `Пользователь: ${newArr.owner.login}`;
        e.target.textContent +=
          "\n" + `Количество звезд: ${newArr.stargazers_count}`;
        let delitePost = document.createElement("span");
        delitePost.classList.add("delit-post");
        e.target.appendChild(delitePost);
        delitePost.textContent = "Удалить пост";
        this.app.listPostItem.appendChild(e.target);
        this.deletePost();
      } catch (e) {
        console.log("не знаю, хз, два дня сражался");
      }
    });
  }
  deletePost() {
    console.log(this.app.listPostItem);
    this.app.listPostItem.addEventListener("click", (e) => {
      e.stopPropagation();
      if (e.target.tagName === "SPAN") {
        if (e.target.parentNode) {
          e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        }
      }
    });
  }
}
new Search(new App());

console.log("Пока работает -_-");

// "https://api.github.com/search/repositories?q=Q"

// class App {
//   constructor() {
//   this.wrapp = document.createElement("div");
//   this.title = document.createElement("h1");
//   this.search = document.createElement("input");
//   this.searchReply = document.createElement("div");
//   this.title.textContent = "Поиск постов";
//   this.listPostWrapp = document.createElement("div");
//   this.listPostTitle = document.createElement("h2");
//   this.listPostTitle.textContent = "Список добалвенных репозиториев";
//   this.listPostItem = document.createElement("div");

//   kotlin
//   Copy code
//   this.postList = document.createElement("div");
//   this.postListItem = document.createElement("li");
//   console.log(this.wrapp);

//   this.wrapp.appendChild(this.title);
//   this.wrapp.appendChild(this.search);
//   document.body.append(this.wrapp);
//   this.listPostWrapp.appendChild(this.listPostTitle);
//   this.listPostWrapp.appendChild(this.listPostItem);
//   document.body.appendChild(this.listPostWrapp);
//   }
//   }

//   class Search {
//   constructor(app) {
//   this.app = app;
//   this.app.search.addEventListener("keyup", this.searchPost.bind(this));
//   }

//   async searchPost() {
//   return await fetch(
//   https://api.github.com/search/repositories?q=${this.app.search.value}
//   ).then((reply) => {
//   reply
//   .json()
//   .then((reply) => {
//   console.log(reply);
//   let fragment = document.createDocumentFragment();
//   for (let i = 0; i < 5; i++) {
//   let listItem = document.createElement("li", "listItem");

//           listItem.textContent = reply.items[i].name;
//           console.log(reply.items[i].name);
//           fragment.appendChild(listItem);
//         }
//         this.app.search.addEventListener("keyup", () => {
//           console.log(this.app.search.value.length);
//           console.log(this.app.search.value);
//           let length = this.app.search.value.length;
//           if (length === 0) {
//             this.app.searchReply.innerHTML = "";
//           }
//         });
//         this.app.searchReply.innerHTML = "";
//         this.app.searchReply.appendChild(fragment);
//         return [
//           this.app.wrapp.appendChild(this.app.searchReply),
//           reply.items,
//         ];
//       })
//       .then((resulte) => {
//         const [res, arr] = resulte;
//         this.clickList(res, arr);
//         console.log("111111");
//       });
//   });
//   }
//   clickList(list, arr) {
//   let a = list;
//   a.addEventListener("click", (e) => {
//   if (e.target.tagName === "LI") {
//   const namePost = document.createElement("p");
//   console.log(e.target.textContent);
//   let newArr = arr.find((item) => item.name === e.target.textContent);
//   namePost.textContent = Название ${newArr.name}\n                               Владелец;
//   console.log(this.app.listPostWrapp.appendChild(namePost));
//   this.app.listPostWrapp.appendChild(namePost);
//   }
//   });
//   }
//   }

//   new Search(new App());
