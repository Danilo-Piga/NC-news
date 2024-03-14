# Northcoders News API

Here's a link to the hosted version of Northcoders News API: [NC_news](https://nc-news-nbi4.onrender.com/api) Please note, it may takea few seconds for the API to load.

## Overview
Welcome to my API project 👋. My goal is to build a backend service using Node.js and PostgreSQL which provides access to application data programmatically. Much like real-world backend services such as **Reddit**, my API will serve as the bridge between the front-end architecture and the underlying data storage. 

## What Does My API Do?  
My API encompasses various types of data essential for application functionality, including users, comments, articles, and topics. With endpoints designed for GET, POST, PATCH, and DELETE operations, developers can interact with these data entities efficiently and securely.

## Installation and Setup 
To get started with this project, follow these steps:

1. Fork and clone the repository:

```console 
git clone https://github.com/Danilo-Piga/nc-news
```

2. Create .env files:

Create two .env files in the root folder of the project, then add your **environment variables** to those files. 

### example

Test environment:
- .env.test - `PGDATABASE=data_base_test`

Development environment:
- .env.development - `PGDATABASE=data_base_development`

> Find the required database names in **setup.sql** located here > `/db/setup.sql`

3. Install dependencies:

```console
npm install
```
4. Setup database
```console
npm run setup-dbs
```
5. Seed the local database:
```console
npm run seed
```

6. Run tests:
```console
npm test app.test.js   
```

## Minimum requirements
To run this project, you'll need the following minimum versions:

**Node.js** (version 18.17.1)

**PostgreSQL** (version 14.10)
