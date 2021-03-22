import { Ingredient } from '../Models/Ingredient.js';
/**
 * Controller that handles posts requests to /ingredient/real-time
 * In a near fututure, a web-socket will be used.
 * The db connection is opened in App.js and the collection is looked in the model.
 * @param req contains the data sent in req.body and db connection in req.db
 * @param res answers back the status of the request
 */
export const saveReadingToDB = async (req, res) => {
    //Create a function that can verify if the requests has an userid and if it is valid

    //Create Ingredient object and call its add method
    let ingredient = new Ingredient(
        req.body.weighingScaleID,
        req.body.name,
        req.body.weight,
        req.body.weightFluc,
        req.body.accuracyWeight,
        req.body.time,
        req.body.order,
    );

    // DESIGN CHOICE: the db collection will be its own userid
    let collectionName = req.body.userID;
    ingredient
        .addWeightReadingDb(req.db, collectionName)
        .then(() => {
            //Send
            res.status(202).send({
                message: 'Weight successfully added to the DB.',
            });
        })
        .catch(() => {
            //Handles rejects
            res.status(404).send({ message: 'Internal server error' });
        });
};

/**
 * Controller that handles GET requests to /ingredient/real-time
 * Mimics how the web-socket will load the data to the front-end
 * @param {*} req
 * @param {*} res
 */
export const getRealTimeWeight = async (req, res) => {
    // DESIGN CHOICE: the db collection will be its own userid
    let collectionName = req.body.userID;
    //order parameter was added to retrieve the weight reading in the envisioned order
    let order = req.body.order;
    Ingredient.getWeightReadingRealTime(req.db, collectionName, order)
        .then((obj) => {
            //Send
            res.status(202).send({
                message:
                    'Weight reading successfully retrieved from DB. This will be replaced by web-socket.',
                obj: obj,
            });
        })
        .catch(() => {
            //Handles rejects
            res.status(404).send({
                message: 'Error while retrieving the weightReading',
            });
        });
};
