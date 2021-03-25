import express from "express";
import {
    createImportantInfoDoc,
    addWeighingScale,
    deleteWeighingScale,
    getAllWeighingScales,
    addWeighingScaleData,
    getWeighingScaleData,
    updateNameWeighingScaleData,
    updatePortionWeighingScaleData,
    validateUserLogIn,
    getArrayOfPlateOrders,
    initiateUserDataInDB,
} from "../Controllers/User.js";

const userRouter = express.Router(); // Handles all routes starting with /api/user

/**
 * A-priori function that executes whenever a user sign-ins in for the first time
 * In a near future, it would be modified so that it only executes when a user signs up
 * It creates the basic documents in the database so that web-client works as expected.
 */
userRouter.route("/initiate").post(initiateUserDataInDB);

/**
 * Request to /api/user/validate
 * Function to validate user sign in
 * Right now it only works for one user, or unless it is added.
 */
userRouter.route("/validate").post(validateUserLogIn);

/**
 * Request to /api/user/create
 * Creates the doc with _id=0 for a user's collection
 * Must be called before any other operation
 */
userRouter.route("/create").post(createImportantInfoDoc);

/**
 * Requests to /api/user/weighingScale
 * POST the weighingScaleID to the user's collection
 * GET all the weighingScalesIDs
 */
userRouter
    .route("/weighingScale")
    .post(addWeighingScale)
    .get(getAllWeighingScales)
    .delete(deleteWeighingScale);

/**
 * Requests to /api/user/weighingScale/data
 * POST the weighingScale data to document with _id=0 for the first time()
 * GET the weightingScael data
 */
userRouter
    .route("/weighingScale/data")
    .post(addWeighingScaleData)
    .get(getWeighingScaleData);

/**
 * Requests to /api/user/weighingScale/data/name
 * PUT the updated name of the tracked ingredient
 */
userRouter.route("/weighingScale/data/name").put(updateNameWeighingScaleData);

/**
 * Requests to /api/user/weighingScale/data/portion
 * PUT the updated portion of the tracked ingredient
 */
userRouter
    .route("/weighingScale/data/portion")
    .put(updatePortionWeighingScaleData);

/**
 * Requests to /api/user/getPlateOrders
 */
userRouter.route("/getPlateOrders").get(getArrayOfPlateOrders);

export default userRouter;
