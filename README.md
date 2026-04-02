# fund_investment_backend
A backend service for managing private market funds and investor commitments.

How To Run the API:

- Create the database:

    - npm install - to install all necessary libraries

    - Prerequisites: Docker | in order to be run in any environment in the same way - Have Docker running - docker ps

    - In .env have : DATABASE_URL="postgresql://postgres:postgres@localhost:5433/titanbay" for Prisma connection

    - Add to the command line - pick a port that you are not using 5433 for example: 
        docker run --name postgres-db\
            -e POSTGRES_USER=postgres\
            -e POSTGRES_PASSWORD=postgres\
            -e POSTGRES_DB=titanbay\
            -p 5433:5432\
            -d postgres
    
    - Tables are outlined in prisma/schema.prisma

    - Create tables in PostgreSQL
        - npx prisma migrate dev --name init

    - Libraries for Prisma:
        - npm install prisma @types/pg --save-dev
        - npm install @prisma/client @prisma/adapter-pg pg dotenv

    - Generate Prisma Client:
        - npx prisma generate

    - Run the server:
        - npx ts-node src/server.ts

    - Make the requests through the terminal:
        - Example: 
            - curl -X GET http://localhost:3000/funds/

    - To view db tables:
        - npx prisma studio

    - To check db connection in case of errors:
        - docker exec -it postgres-db psql -U postgres -d titanbay



    




    

