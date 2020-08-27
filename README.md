# [Shopping](https://drombel.github.io/shopping/)
## [Code](https://github.com/drombel/shopping/tree/master)

Shopping is responsive frontend app based on framework React and using hooks.

---

#### Basic functions of App are:
- browsing pages,
- browsing products,
- forms validations,
- adding / updating / removing products to / in / from basket, 

---

#### Application is using:
- Redux (createStore, useDispatch, useSelector)
- Router (BrowserRouter, HashRouter, Link, NavLink, useHistory, useLocation) (because of gh-pages it has to be HashRouter, normally it would be BrowserRouter)
- React (useStae, useEffect, useRef)
- propTypes
- Toastify
- CSSTransition
- SCSS
- Bootstrap 4

---

#### Application has been divided into 
- [components](https://github.com/drombel/shopping/tree/master/src/components)
  - [App](https://github.com/drombel/shopping/tree/master/src/components/App)
  - [Header](https://github.com/drombel/shopping/tree/master/src/components/Header)
  - [Footer](https://github.com/drombel/shopping/tree/master/src/components/Footer)
  - [Searchbar](https://github.com/drombel/shopping/tree/master/src/components/Searchbar)
  - [Products](https://github.com/drombel/shopping/tree/master/src/components/Products)
  - [Basket](https://github.com/drombel/shopping/tree/master/src/components/Basket)
  - [Routes](https://github.com/drombel/shopping/tree/master/src/components/Routes)
- [reducers](https://github.com/drombel/shopping/tree/master/src/reducers)
- [actions](https://github.com/drombel/shopping/tree/master/src/actions) 

---

To start project on localhost just run command npm install.
To make it work without hashes in url on localhost, 
You need to change in component [App.js](https://github.com/drombel/shopping/tree/master/src/components/App/App.js) from 'HashRouter' to 'BrowserRouter' 
and run command npm start

---

App is running on github pages [here](https://drombel.github.io/shopping/)

