# E-Learning sph-els-vali

### Tech Stack
- **Expressjs** - _https://expressjs.com/_
- **Sequelize** - _https://sequelize.org/_
- **Reactjs** - _https://reactjs.org/_

## Setup

1. Create `.env` file for backend and `.env.local` file for frontend

```
cp .env.example && env.local.example to .env && .env.local
```

2. Fill up the necessary information inside `.env` and `.env.local` files
3. Run `npm install` on both backend and frontend
4. Run your mysql

```
sudo -S service mysql start
```

5. Generate migration on backend

```
npx sequelize db:migrate
```

6. Run the seeder on backend

```
npx sequelize db:seed:all
```

7. Run npm start on both backend and frontend 

## Documentation

- ERD - https://app.diagrams.net/#G1oOWZ4sriJWC01aIcjb0wLkZ4_QBsSBsC
- Postman APIs - https://grey-firefly-150180.postman.co/workspace/e-learning~b9d71430-452d-47cc-8c64-e2b2e960bd99/example/22825265-04fdb3a0-77bc-42fe-8dae-153965b37c87