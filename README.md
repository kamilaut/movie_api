# movie_api
 
The server-side component of a “movies” web application. The web application will provide users with access to information about different movies, directors, and genres. Users will be able to sign up, update their personal information, and create a list of their favorite movies.

Movie_api is the client-side component of an application using REACT. A web application (client-side and server-side) built using full-stack JavaScript technologies. The project will demonstrate a full-stack JavaScript development, including APIs, web server frameworks, databases, business logic, authentication, data security, and more. 

# Movie API Documentation

Welcome to the documentation for the Movie API, which allows you to access and manage information about movies and users. This API is built using Node.js, Express.js, and MongoDB.

## Table of Contents

- [Setup](#setup)
- [API Endpoints](#api-endpoints)
  - [Get All Movies](#get-all-movies)
  - [Get All Users](#get-all-users)
  - [Get Movie by Title](#get-movie-by-title)
  - [Get User's Favorite Movies](#get-users-favorite-movies)
  - [Get User by Username](#get-user-by-username)
  - [Get Movie by Genre](#get-movie-by-genre)
  - [Get Movies by Director](#get-movies-by-director)
  - [Add User](#add-user)
  - [Update User](#update-user)
  - [Add Movie to User's Favorites](#add-movie-to-users-favorites)
  - [Delete Movie from User's Favorites](#delete-movie-from-users-favorites)
  - [Delete User](#delete-user)
- [Run the Server](#run-the-server)

## Setup

1. Install Node.js and MongoDB.
2. Clone the repository: `git clone https://github.com/your-username/movie-api.git`
3. Navigate to the project directory: `cd movie-api`
4. Install dependencies: `npm install`
5. Set up your MongoDB connection in `index.js`.

## API Endpoints
#### Get All Movies
```
GET /movies  
```

#### Get All Users
```
GET /users
```


#### Get Movie by Title
```
GET /movies/:Title
```

#### Get User's Favorite Movies
```
GET /users/:Username/favorites
 ```

#### Get User by Username
```
 GET /users/:Username
 ```

#### Get Movie by Genre
```
 GET /movies/genres/:genreName
 ```

#### Get Movies by Director
```
 GET /movies/directors/:directorName
```
#### Add User
```
 POST /users
 ```

#### Update User
```
 PUT /users/:Username
 ```

#### Add Movie to User's Favorites
``` 
 POST /users/:Username/movies/:MovieID
```
 
#### Delete Movie from User's Favorites
```
 DELETE /users/:Username/movies/:MovieID
 ```

#### Delete User
```
 DELETE /users/:Username
```
 
Start the server:
 bash
 
```
npm start ```

The server will be running on port 8080 by default.

