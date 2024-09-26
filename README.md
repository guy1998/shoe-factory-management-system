# Shoe Factory Management System
Tailored web app for management of a shoe factory built with MERN architecture. The application includes multiple features such as expense tracking, employee registration, user management, dashboard statistics, and income tracking. Front end is built using MUI based on the components provided by this creative tim template: https://www.creative-tim.com/product/material-dashboard-react-nodejs. Server side is built from scratch using node.js and express api, as well as MongoDb for database. All database operation are done using Mongoose ODM.

## Starting the app

create a .env file with 3 fields: MONGO_URI (the connection string to your local or cloud db), JWT_KEY (a randomly generated 256 key), and SUPER_ADM_ID (when you add the first user make sure to select one that controls the rest of them). 

To start the app run the following commands:

```
cd server

npm run build

npm start

cd client

npm start
```
Open http://localhost:3000 with your browser to see the result.

Keep in mind that this project was developed using node v20 so it is recommended to be using that version while trying to run the project.
