import express from 'express';
import {
    saveReadingToDB,
    getRealTimeWeight,
} from '../Controllers/Ingredient.js';

const ingredientRouter = express.Router(); // Handles all routes starting with /ingredient

/**
 * Handles POST and GET operations to /ingredient/real-time
 * Implemented to test how a web-socket would work
 */
ingredientRouter
    .route('/real-time')
    .post(saveReadingToDB)
    .get(getRealTimeWeight);

export default ingredientRouter;
