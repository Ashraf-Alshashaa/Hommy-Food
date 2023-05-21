# Hommy Food

![React](https://camo.githubusercontent.com/67a01fa7cf337616274f39c070a11638f2e65720e414ef55b8dd3f9c2a803b2a/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d526561637426636f6c6f723d323232323232266c6f676f3d5265616374266c6f676f436f6c6f723d363144414642266c6162656c3d)
![Mongoose](https://camo.githubusercontent.com/eb3676422a9e186ce18237e6c1ffee703068f7850c2a513b9a261f33ee335ed6/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d4d6f6e676f444226636f6c6f723d343741323438266c6f676f3d4d6f6e676f4442266c6f676f436f6c6f723d464646464646266c6162656c3d)
<img src="https://camo.githubusercontent.com/e6b67b27998fca3bccf4c0ee479fc8f9de09d91f389cccfbe6cb1e29c10cfbd7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f637373332d2532333135373242362e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d63737333266c6f676f436f6c6f723d7768697465" alt="css" width="100" height="28" />
<img src="https://github.com/richnologies/richnologies/raw/master/stripe_partner_badge_community_blurple.png" alt="stripe" width="150" />
![Express](https://camo.githubusercontent.com/0a95585d6b3a07028298a45d60b85a1331358bc336549d64dbbc27977f1495f3/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d4578707265737326636f6c6f723d303030303030266c6f676f3d45787072657373266c6f676f436f6c6f723d464646464646266c6162656c3d)
<img src="https://i.ibb.co/bHS8SqH/Cloudinary.jpg" alt="cloudinary" width="109" >
![Nodejs](https://camo.githubusercontent.com/faec9d89bd2c7d47b91d988dcd0f27011c27e8191d45836cfa36bf2b3c2a92bd/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d4e6f64652e6a7326636f6c6f723d333339393333266c6f676f3d4e6f64652e6a73266c6f676f436f6c6f723d464646464646266c6162656c3d)

## 1. Description

This app helps the freelance chefs to post their meals and sale them online.
Our registered clients can order the meals they want or choosing a specific chef to order from according to his rate or cuisine.
The guest user can have overview about our app also but with a limited permissions.

![App view](./client/public/images/app-view.png)
_Project link is available at_ [Hommy food App](https://646a511b498134218dd83f28--dreamy-lolly-40c181.netlify.app/)

## 2. Usage

- User (guest) can overview the app.
- User can create an account and choose between a chef or client.
- Ability to search for a meal according to the meal name, ingredients, category or cuisine.
- Adding a specific chef to a favorite.
- Finding the top 10 rated chefs.
- Viewing the chef details, the service his offering (Delivery or Pickup), rating him and see his meal list.
- Users (chef, customer) can edit thier personal profile.
- The user can request several different meals from the same chef for one order.
- In Delivery service, the user can change his default address at the checkout page to a different address.
- In the Pickup service it will be showing the contact and the address of the chef.
- Apple to pay online or cash.
- User can check his order history.
- Order to prepare page helps the chef to organize the orders he has.

## 3. Setup

First, to setup all the directories run the following in the main directory:

`npm install`

`npm run setup`

The first command will install `cypress` and some small libraries needed for running the rest of the commands. The second will go into the `client` and `server` directories and set those up to be ran.

In the `client` and `server` directory there are two `.env.example` files. Create a copy and rename that to `.env`. Then follow the instructions in those files to fill in the right values.

To run the app in dev mode you can run the following command in the main directory:

`npm run dev`

## 4. Code structure

```
client
├── public
    └── images
    └── index.html
└── src
    └── __tests__
    └── __testUtils__
    └── components
        └── __tests__
        └── Banner
        └── CategoryListCards
        └── CuisineListButtons
        └── CustomerPersonalInfo
        └── Dropdown
        └── EditFromPopUp
        └── FavoriteChefCard
        └── Footer
        └── Header
        └── InputForm
        └── LoginForm
        └── mealCard
        └── MealList
        └── MsgPopUp
        └── OrderDetailsCards
        └── OrderHistoryCard
        └── OrdersHistory
        └── OrderToPrepareCard
        └── OrderToPrepareItem
        └── OrderToPreparePopup
        └── PersonalInfo
        └── ProfileHeader
        └── RateOfChef
        └── RatingStar
        └── SearchField
        └── ShoppingCart
        └── ShoppingCartCard
        └── TopTenChefsSlider
        └── UploadImgWidget
    └── contexts
        └── authentication.js
        └── msgPopup.js
    └── hooks
        └── __tests__
        └── fetchOptions.js
        └── postLoginInfo.js
        └── useFetch.js
        └── useWindowSize.js
    └── pages
        └── CheckoutPage
        └── CreateMeal
        └── EditMeal
        └── FavoritesPage
        └── Home
        └── Login
        └── MealDetailPage
        └── OrdersHistoryPage
        └── OrderToPrepare
        └── Payment
        └── ProfilePage
        └── resultPage
        └── ShoppingCart
        └── SignUp
        └── User
    └── util
    App.jsx
    App.css
    AppWrapper.jsx
    index.jsx
cypress
    └── fixtures
    └── integration
    └── plugins
    └── support
server
└── src
    └── __tests__
    └── __testUtils__
    └── controllers
        └── category.js
        └── cuisine.js
        └── favorites.js
        └── meal.js
        └── orders.js
        └── payment.js
        └── rate.js
        └── shoppingCart.js
        └── user.js
    └── db
        └── connectDB.js
    └── models
        └── Category.js
        └── Cuisine.js
        └── Meal.js
        └── User.js
    └── routes
        └── category.js
        └── cuisine.js
        └── favorites.js
        └── meal.js
        └── orders.js
        └── payment.js
        └── rate.js
        └── shoppingCart.js
        └── user.js
    └── util
        └── __tests__
        └── logging.js
        └── validateAllowedFields.js
        └── validationErrorMessage.js
    app.js
    index.js
    testRouter.js
README.md
```

### 5. Client structure

- `public` || public facing client code.
- `__tests__` || any `jest` tests for specific components will be in a `__tests__` folder on the same level.
- `__testUtils__` || any code that is only being used in the tests is put in the .`__testUtils__` folder to separate that away from the rest of the code.
- `components` || all of our shared components that are used over multiple pages.
- `hooks` || all of our custom hooks.
- `pages` || the page components of our app, any routing will go between these components.
- `pages/components` || components used specifically on those pages.
- `util` || any utility functions that can be used anywhere on the client side.
- `index.jsx` || the start point of the client with providers.
- `app.jsx` || storing the app routes.

### 5.1 Cypress structure

- `fixtures` || any data/files that `cypress` needs can be placed here.
- `integration` || all of our tests are in here, separated in folders based on the pages in our app.
- `plugins` || any plugins for our `cypress` configuration can be placed here.
- `support` || custom commands and other support files for `cypress` can be placed here.

### 5.2 Server structure

- `__tests__` || any `jest` tests for the api endpoints as that is our testing strategy for the backend.
- `__testUtils__` || any code that is only being used in the tests is put in the `__testUtils__` folder to separate that away from the rest of the code.
- `controllers` || all of our controller functions that interact with the database.
- `db` || all of our configuration for the database.
- `models` || all of our `mongoose` models will be placed here.
- `routes` || code to match up the API with our controllers.
- `util` || any utility functions that can be used anywhere on the server side.
- `index.js` || the start point of the server.
- `app.js` || creates express server and attaches the routes.

## 6. Stack / external libraries

The base stack of the app is a MERN stack (Mongoose, Express, React, Node). Next to that we make use of the following extras:

### 6.1 Configuration libraries

- `dotenv` || To load the .env variables into the process environment. See [docs](https://www.npmjs.com/package/dotenv)
- `webpack` / `html-webpack-plugin` || To bundle our React app and create a static app to host. See [docs](https://webpack.js.org/)
- `husky` || To run our tests and linter before committing. See [docs](https://typicode.github.io/husky/#/)
- `eslint` || To check our code. We have different configurations for frontend and backend. You can check out the configuration in the `.eslintrc.(c)js` files in the respective `client` and `server` folders. See [docs](https://eslint.org/)
- `prettier` || To automatically format our code. See [docs](https://prettier.io/)
- `concurrently` || To run commands in parallel. See [docs](https://github.com/open-cli-tools/concurrently#readme)

For more information on how these work together including the automatic deployment to heroku, have a look at our detailed [DEV](./DEV.md) file.

### 6.2 Client-side libraries

- `@testing-library/*` || We use React Testing Library to write all of our tests. See [docs](https://testing-library.com/docs/react-testing-library/intro/)
- `jest` || To run our tests and coverage. See [docs](https://jestjs.io/)
- `jest-fetch-mock` || To mock out the backend for our testing purposes. See [docs](https://github.com/jefflau/jest-fetch-mock#readme)
- `prop-types` || To type-check our components. See [docs](https://github.com/facebook/prop-types)
- `cloudinary` || To help us upload images and save the url of it in database. See [docs](https://cloudinary.com/documentation/media_library_widget)
- `emailjs` || It help us creating contact form without using backend code. See [docs](https://www.emailjs.com/docs/tutorial/overview/)
- `bootstrap` || To help us styling our app. See [docs](https://getbootstrap.com/docs/5.2/getting-started/introduction/)
- `react-stripe-checkout` || To connect our frontend payment data to the backend. See [docs](https://www.npmjs.com/package/react-stripe-checkout)

### 6.3 Server-side libraries

- `nodemon` || To automatically restart the server when in development mode. See [docs](https://nodemon.io/)
- `jest` || To run our tests and coverage. See [docs](https://jestjs.io/)
- `supertest` || To more easily test our endpoints. See [docs](https://github.com/visionmedia/supertest#readme)
- `mongodb-memory-server` || To mock out our database in our backend tests. See [docs](https://github.com/nodkz/mongodb-memory-server)
- `cors` || To open up our API. See [docs](https://github.com/expressjs/cors#readme)
- `mongoose` || To add schemas to our database. See [docs](https://mongoosejs.com/)
- `stripe` || To allow our app online payment by using the third party payment process. See [docs](https://stripe.com/en-nl)
- `bcrypt` || Helping us hashing the passwords. see [docs](https://www.npmjs.com/package/bcrypt)
- `dotenv` || To Store configuration in the environment separate. see [dosc](https://www.npmjs.com/package/dotenv)
- `jsonwebtoken` || To share security information between two parties (client and server). see [docs](https://www.npmjs.com/package/jsonwebtoken)
