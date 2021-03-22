import express from 'express';
import ingredientRouter from './Routers/Ingredient.js';
import userRouter from './Routers/User.js';
import cors from 'cors';
import { connectToDB, closeDBConnection } from './Utils/db.js';

//Instantiation of main app
const app = express();
let server;
let mongoDb;

//DB initialization
//Gurantees that the connection is opened, once the server is started
async function loadDBClient() {
    try {
        mongoDb = await connectToDB();
    } catch (err) {
        throw new Error('Could not connect to the Mongo DB');
    }
}
loadDBClient();

//Middleware
app.use(express.json()); // support json encoded bodies
app.use(cors());
// This method is executed every time a new request arrives.
// We add the variable db to the request object, to be retrieved in the route req object
app.use((req, res, next) => {
    req.db = mongoDb;
    next();
});

// Routes
app.use('/api/user', userRouter);
app.use('/ingredient', ingredientRouter);

// Properly Close the DB connection before closing the server
process.on('SIGINT', () => {
    console.info('SIGINT signal received.');
    console.log('Closing Mongo Client.');
    closeDBConnection();
    server.close(() => {
        console.log('Http server closed.');
    });
});
// Start of the Express API
export const start = async () => {
    const port = 8000;
    server = app.listen(port, () => {
        console.log('Express API server is listening on port 8000');
    });
};
