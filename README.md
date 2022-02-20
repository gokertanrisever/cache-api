# Cache API

- Cache API integration using **Typescript, ExpressJS and MongoDB with Mongoose**.

## Usage
Rename `.env.example` file to `.env` 

Running docker compose will create API and MongoDB instances
```basah
docker compose up
```


## List of Routes

```sh
# API Routes:

+--------+-------------------------+
  Method | URI
+--------+-------------------------+
  GET    | /api/cache/
  GET    | /api/cache/:key
  POST   | /api/cache/:key
  DELETE | /api/cache/:key
  DELETE | /api/cache/
+--------+-------------------------+
```


