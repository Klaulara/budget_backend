# Budget Control Project

This project was created as a small API to test different front-end frameworks.

## Getting Started


```
npm install
```

## Database

This project uses postgreSQL as a database, you can set up a local database to run this project locally. You can use the following query to create the tables

```
create table category (id serial primary key, name varchar not null, image varchar);
```
```
create table users (id serial primary key, name varchar not null, email varchar not null, password varchar not null, created_at date, updated_at date);
```
```
create table budget (id serial primary key, name varchar not null, value int not null, status varchar not null, user_id int not null, created_at date, updated_at date, foreign key (user_id) references users (id));
```
```
create table expenses (id serial primary key, budget_id int not null, name varchar not null, value int not null, category_id int not null, created_at date, updated_at date, foreign key (budget_id) references budget (id), foreign key (catego
ry_id) references category (id));
```

## ENV VARIABLES

Create a file named .env with the variable included in .env.example. 

## POSTMAN COLLECTION

Postman collection is included to test all endpoints. 