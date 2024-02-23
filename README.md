# Northcoders News API

Here is a link to the hosted version of Northcoders News API: [NC_news](https://nc-news-nbi4.onrender.com) 
 - Please enter `/api` at the end of the url. This provides a list of all avaliable endpoints.

N.B The full list of endpoints can be access from `endpoints.js` in the root directory once yu have cloned the repository. 

## Overview
Welcome to my API project. My goal is to build a backend service that provides access to application data programmatically. Much like real-world backend services such as Reddit, my API will serve as the bridge between the front-end architecture and the underlying data storage.

## Installation and Setup
To get started with this project, follow these steps:

1. Clone the repository:

```bash 
git clone https://github.com/Danilo-Piga/nc-news
```

2. Create .env files:

Create two .env files at the root of the project and add your environment variables.

- .env.development: for development environment. e.g. `PGDATABASE=data_base_development`
- .env.test: for testing environment. e.g. `PGDATABASE=data_base_test`

3. Install dependencies:

```bash
npm install
```
4. Seed the local database:
```bash
npm run seed
```

5. Run tests:
```bash
npm test
```

## Requirements
To run this project, you'll need the following minimum versions:

Node.js (version 18.17.1)
PostgreSQL (version 14.10)

## Usage
[Provide usage instructions, such as how to start the server or access the endpoints.]
