# Preliminary Test (Schedule Job)

### How to run the app:

1. Clone this repo
2. Do `yarn install` or `npm install`
3. Rename .env.example to .env and fill the MySQL DB credentials
4. Adjust MySQL username and password if needed in db/config.json for the migration (i use root as username and no password)
5. Run `npm run db:create` or `yarn run db:create` to create the DB (if you haven't create it manually)
6. Run `npm run db:migrate` or `yarn run db:create` for migration (creating DB tables)
7. Run `npm run db:seed` or `yarn run db:seed` to insert some users (i don't create endpoint to add users)
8. Run `npm start` or `yarn start` to start the application.

--------------------------------------------------------------------------------------------------

This is my first ever Express + Typescript app. And i think i miss the intended result for point 4 of the test. However
i hope for the best.

I also assuming to create auth endpoints first but it didn't metioned in the stories so i just skip it.
