import { User } from '../Models/User.js';
/**
 * Handle operations to /api/user/create
 * Creates the doc with _id=0
 * @param {*} req
 * @param {*} res
 */
export const createImportantInfoDoc = (req, res) => {
    // DESIGN CHOICE: the db collection will be its own userid
    let collectionName = req.body.userID;
    //Static method to create _id=0 to a user's collection
    User.createImportantInfoDoc(req.db, collectionName)
        .then((result) => {
            res.status(202).send({
                arrayOfScales: result,
                message: 'Successfully created the info doc',
            });
        })
        .catch((err) => {
            res.status(404).send({
                obj: err,
                message: 'Failed to create _id=0!',
            });
        });
};

/**
 * Handles operations to /api/user/weighingScale
 * @param {*} req.body.userID & req.body.scaleID
 * @param {*} res
 */
export const addWeighingScale = (req, res) => {
    // DESIGN CHOICE: the db collection will be its own userid
    let collectionName = req.body.userID;
    //Static method to link a weighingScaleID to a user's collection
    User.addWeighingScaleID(req.db, collectionName, req.body.scaleID)
        .then((result) => {
            res.status(202).send({
                arrayOfScales: result,
                message: 'Successfully linked the weighing scale to the user',
            });
        })
        .catch((err) => {
            res.status(404).send({
                obj: err,
                message: 'Failed to add weighing scale!',
            });
        });
};

/**
 * Handles DELETE operation to /api/user/weighingScale
 * Note that the scaleID_data should also be deleted
 * @param {*} req.body.userID & req.body.scaleID
 * @param {*} res
 */
export const deleteWeighingScale = (req, res) => {
    // DESIGN CHOICE: the db collection will be its own userid
    let collectionName = req.body.userID;

    //Static method to delete a weighingScaleID from a user's collection
    User.deleteWeighingScaleID(req.db, collectionName, req.body.scaleID)
        .then((result) => {
            res.status(202).send({
                arrayOfScales: result,
                message: 'Successfully deleted the weighing scale',
            });
        })
        .catch((err) => {
            res.status(404).send({
                obj: err,
                message: 'Failed to delete weighing scale!',
            });
        });
};
/**
 * Handles GET operation to /api/user/weighingScale
 * @param {*} req.body.userID & req.body.scaleID
 * @param {*} res
 */
export const getAllWeighingScales = (req, res) => {
    // DESIGN CHOICE: the db collection will be its own userid
    let collectionName = req.body.userID;

    //Static method to update the weighing scale portion from a user's collection
    User.getScales(req.db, collectionName)
        .then((result) => {
            res.status(202).send({
                arrayOfScales: result,
                message: 'Successfully retrieved all weighing scales',
            });
        })
        .catch((err) => {
            res.status(404).send({
                obj: err,
                message: 'Failed to get the weighing scales!',
            });
        });
};

/**
 * Handles POST operation to /api/user/weighingScale/data
 * Executed Once after POSTING scale id
 * @param {*} req.body.userID & req.body.scaleID
 * @param {*} res
 */
export const addWeighingScaleData = (req, res) => {
    // DESIGN CHOICE: the db collection will be its own userid
    let collectionName = req.body.userID;
    let scaleData = req.body.scaleData;

    //Static method to delete a weighingScaleID from a user's collection
    User.addWeighingScaleData(
        req.db,
        collectionName,
        req.body.scaleID,
        scaleData,
    )
        .then((result) => {
            res.status(202).send({
                arrayOfScales: result,
                message:
                    'Successfully added the weighing scale data for the first time',
            });
        })
        .catch((err) => {
            res.status(404).send({
                obj: err,
                message: 'Failed to add weighing scale data!',
            });
        });
};

/**
 * Handles GET operation to /api/user/weighingScale/data
 * @param {*} req.body.userID & req.body.scaleID
 * @param {*} res
 */
export const getWeighingScaleData = (req, res) => {
    // DESIGN CHOICE: the db collection will be its own userid
    let collectionName = req.body.userID;

    //Static method to delete a weighingScaleID from a user's collection
    User.getWeighingScaleData(req.db, collectionName, req.body.scaleID)
        .then((result) => {
            res.status(202).send({
                arrayOfScales: result,
                message: 'Successfully retrieved the weighing scale data',
            });
        })
        .catch((err) => {
            res.status(404).send({
                obj: err,
                message: 'Failed to get weighing scale data!',
            });
        });
};

/**
 * Handles PUT operation to /api/user/weighingScale/data/name
 * @param {*} req.body.userID & req.body.scaleID & req.body.newName
 * @param {*} res
 */
export const updateNameWeighingScaleData = (req, res) => {
    // DESIGN CHOICE: the db collection will be its own userid
    let collectionName = req.body.userID;
    let newName = req.body.newName;

    //Static method to delete a weighingScaleID from a user's collection
    User.updateNameData(req.db, collectionName, req.body.scaleID, newName)
        .then((result) => {
            res.status(202).send({
                arrayOfScales: result,
                message:
                    'Successfully updated the weighing scale ingredient name',
            });
        })
        .catch((err) => {
            res.status(404).send({
                obj: err,
                message: 'Failed to update the weighing scale name data!',
            });
        });
};

/**
 * Handles PUT operation to /api/user/weighingScale/data/portion
 * @param {*} req.body.userID & req.body.scaleID & req.body.newPortion
 * @param {*} res
 */
export const updatePortionWeighingScaleData = (req, res) => {
    // DESIGN CHOICE: the db collection will be its own userid
    let collectionName = req.body.userID;
    let newPortion = req.body.newPortion;

    //Static method to update the weighing scale portion from a user's collection
    User.updatePortionData(req.db, collectionName, req.body.scaleID, newPortion)
        .then((result) => {
            res.status(202).send({
                arrayOfScales: result,
                message:
                    'Successfully updated the weighing scale ingredient portion',
            });
        })
        .catch((err) => {
            res.status(404).send({
                obj: err,
                message: 'Failed to update the weighing scale portion data!',
            });
        });
};
