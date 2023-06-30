## Docker Infrastructure

This project demonstrates how to use docker to run multiple services in parallel.

listed below are all the services the project includes and the respective ports the application runs on.

| Service Name | Default Port | Proxy Port |
| ------------- | ---------- | ---------- |
| Users | 3000 | 4000 |
| Orders| 3100 | 5000 |
| Products| 3200 | 6000 |

[**Note**: use the default port if you're setting up the application manually, use the proxy port if you're using docker to run the application.]


## Built With

- [Nest.js](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Caddy](https://caddyserver.com/)

## Prerequisite

- Node.js (version 16.18.1)
- npm (recommended)
- Docker
- PostgreSQL

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

- clone the repository:
```
git clone https://github.com/ckmonish2000/docker-services.git
```

-  now go to the project folder and cd into the service of your choice.
```
cd docker-services/user
```

- install the dependencies:
```
npm i
```

##

- Configuration:
  1. Create a `.env` file in the root directory of the service 
     of your choice and update the environment variables listed 
     below with entries to your Postgres instance.

```
USERNAME=postgres
PASSWORD=postgres
DATABASE=postgres
HOST=localhost
```

- Database Setup:
  1. Make sure your PostgreSQL server is running.
  2. Update the configuration in the respective service's `.env` file.

- Start the services:
  1. Open three separate terminal windows or tabs, navigate to each service's directory (user, order, products), and run the following command:
```
npm run start:dev
```

## Running with docker 

To run the application using Docker, follow these steps:

- Make sure you have Docker installed and running on your machine.

- To run the application in development mode:
```
cd project-directory
cd docker
docker-compose -f .\docker-compose.dev.yml up
```

- To run the application in production mode:
```
cd project-directory
cd docker
docker-compose -f .\docker-compose.dev.yml -f .\docker-compose.prod.yml up
```

- The service should be running inside Docker container you can access each service from the proxy ports mentioned above.

## Testing

In order to run the automation tests run the following command:
```
docker-compose -f .\docker-compose.dev.yml -f .\docker-compose.test.yml up docker-service-name 
```

[**Note**: Try running individual tests for each service as if you do not have sufficient memory the process will exit with exit_code 0 ]

## API Documentation

- You can access each service from either the default or proxy port depending on how you're running the application.
- You can access the Swagger API documentation for each service by visiting `/api/` endpoint.

- For example:
```
Visit: http://localhost:4000/api/
```

[**Note**: you can also use the postman file provided in the root directory.]

## Metrics

- You can access each service from either the default or proxy port depending on how you're running the application.

- Each service exposes default metrics at the endpoint `/metrics/`.
- For Example:
```
Visit: http://localhost:4000/metrics/
```
[**Note**: You can use this endpoint to configure Prometheus.]


