# wallet-backend

## A litle introduction
A didactical proposal E-wallet management backend maked  in `node.js` with the framework `Express.js` and for sockets `Socket.io`

## Documentation

The documentation is in the folder `docs` but you if changes a endpoint in this project or add more functionality can run the command that describe more later.

## Getting Started

 First: Your need install these packages :
 - [Mysql](https://www.mysql.com/downloads/): Choose the option for your operative system download and install.
 - [Node.js](https://nodejs.org) or I recommend use [nvm](https://github.com/creationix/nvm) 
 - [Postman](https://www.getpostman.com/apps) or any rest client for test this api.

## How Install ?

**Easy**, when finished install mysql and node.js with a `terminal` move to your path directory and run for each case:

* `npm install` for install all dependencies.
* `npm run config:db` for create a database and all tables from a file .sql in `app/db/schemaDb.sql`, when you started this command it require a password user root for create database in your mysql engine.
* `npm run docs` this command generate or rewrite the folder `docs` with a documentation readable better.

## Config Database

The file config is in the folder `app/db/db.js` add your data username, password, host and port of database.

## How run ?

**Very more easy**, Only run:

* `npm start` and `rs` for refresh the console when running. For proposal didactical, this backend running in localhost with the port 8080 so, the route is `http://localhost:8080`

## All in one 

**Run** : `npm run full:install`
