# Basic GIPHY App

This is a learning repo. This repo is developed using React and GIPHY Api

## Tech used

- React
- GIPHY Api (for giphs)
- Bootstrap (For styling)
- Axios (For http calling)
- NanoId (to generate short Ids).

## Screens

Home
![](./public/assests/home.png)

Post
![](./public/assests/post.png)

Gif
![](./public/assests/gif-page.png)

## To Run Dev Server

- Clone the repo into local system
- Install the necessary dependencies using below command

```js
npm install
```

- run the dev server using below command

```js
npm start
```

# Note:

- After cloning and installing all the dependencies in the project change the api key in `dotEnv(.env)` file, obtained from [GIPHY API](https://giphy.com/). You can change the name of the key in the `.env` file, as you like but don't forget to add `REACT_APP<name>` before the name.

- In this project, to store the post data I used `localstorage`. If you want to make this as a primary project I recommend using DB to store the post data.

- There is no authnetication for this project,if interested you can implement.
