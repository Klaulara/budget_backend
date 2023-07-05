# Budget Control Project

This project was created as a small API to test different front-end frameworks.

## Getting Started


```
npm install
```

## Database

This project uses postgreSQL as a database, you can set up a local database to run this project locally. You can use the following query to create the tables

```
create table category (id int primary key, name varchar, image varchar)
```
```
create table budget (id int primary key, name varchar, value int, status varchar, created_at date, updated_at date);
```
```
create table expenses (id int primary key, budget_id int, name varchar, value int, category_id int, created_at date, updated_at date);
```

## ENV VARIABLES

Create a file named .env with the variable included in .env.example. 

## POSTMAN COLLECTION

Postman collection is included to test all endpoints. 