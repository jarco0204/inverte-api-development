import { openDbCollection } from '../Utils/db.js';
import { lookForImportantInfoDoc } from '../Utils/User.js';

/**
 * User class handles the operations to the _id=0, which contains the most important information about a user's collection
 */
export class User {
    //Constructor goes here

    /**
     * Create the document _id=0, which contains the most important information
     * Since method should be the first method called (Only Once)
     * @param {*} dbConnection
     * @param {*} colName
     */
    static async createImportantInfoDoc(dbConnection, colName) {
        //First Section: Open the user's collection
        let dbCol;
        dbCol = await openDbCollection(dbConnection, colName);
        //Create the doc
        return new Promise((resolve, reject) => {
            try {
                let obj = dbCol.insertOne({
                    _id: 0,
                });
                resolve(obj);
            } catch (err) {
                console.log('Error happened while creating _id=0 document');
                reject(err);
            }
        });
    }
    /**
     * Add a weighing scale to the user's collection
     * @param {*} dbConnection
     * @param {*} colName
     * @param {*} scaleID
     */
    static async addWeighingScaleID(dbConnection, colName, scaleID) {
        //First Section: Open the user's collection
        let dbCol;
        dbCol = await openDbCollection(dbConnection, colName);

        //Second section: find if the array exists or not
        // In an effort to prevent repetition, there is a utils function that looks for document with _id=0
        let infoDoc;
        await lookForImportantInfoDoc(dbCol)
            .then((obj) => {
                infoDoc = obj;
            })
            .catch((err) => {
                console.log('Unable to retrieve _id=0');
                throw err; // handled by catch in controller
            });

        //Next section adds the weighingScaleID to the array of trackedScalesIDs
        return new Promise(function (resolve, reject) {
            try {
                if (infoDoc.trackedScalesIDs) {
                    //Loop to prevent repeated items to be inserted
                    for (let i = 0; i < infoDoc.trackedScalesIDs.length; i++) {
                        if (infoDoc.trackedScalesIDs[i] == scaleID) {
                            reject({ err: 'ScaleID already inserted!' });
                        }
                    }
                    infoDoc.trackedScalesIDs.push(scaleID);
                } else {
                    infoDoc.trackedScalesIDs = [scaleID];
                }
                dbCol.updateOne(
                    { _id: 0 },
                    { $set: { trackedScalesIDs: infoDoc.trackedScalesIDs } },
                    (err, obj) => {
                        if (err) reject(err);
                        console.log('Successfully added an scaleID');
                        resolve(obj);
                    },
                );
            } catch (err) {
                console.log('Unable to add the trackedScalesIDs array');
                reject(err);
            }
        });
    }
    /**
     * Delete the weighing scale id from the array from document _id=0
     * @param {*} dbConnection
     * @param {*} colName
     * @param {*} scaleID
     */
    static async deleteWeighingScaleID(dbConnection, colName, scaleID) {
        //First Section: Open the user's collection
        let dbCol;
        dbCol = await openDbCollection(dbConnection, colName);

        //Second section : look for info document
        // In an effort to prevent repetition, there is a utils function that looks for document with _id=0
        let infoDoc;
        await lookForImportantInfoDoc(dbCol)
            .then((obj) => {
                infoDoc = obj;
            })
            .catch((err) => {
                console.log('Unable to retrieve _id=0');
                throw err; // handled by catch in controller
            });

        // Next section Deletes the id

        return new Promise(function (resolve, reject) {
            try {
                if (infoDoc.trackedScalesIDs) {
                    //Loop to scaleID from array
                    for (let i = 0; i < infoDoc.trackedScalesIDs.length; i++) {
                        if (infoDoc.trackedScalesIDs[i] == scaleID) {
                            infoDoc.trackedScalesIDs.pop(i);
                        }
                    }
                } else {
                    reject(); //should not arrive here
                }
                dbCol.updateOne(
                    { _id: 0 },
                    { $set: { trackedScalesIDs: infoDoc.trackedScalesIDs } },
                    (err, obj) => {
                        if (err) reject(err);
                        console.log('Successfully deleted an scaleID');
                        resolve(obj);
                    },
                );
            } catch (err) {
                console.log('Unable to add the trackedScalesIDs array');
                reject(err);
            }
        });
    }
    /**
     * GET the weighing scales IDs
     * @param {*} dbConnection
     * @param {*} colName
     */
    static async getScales(dbConnection, colName) {
        //First section
        let dbCol;
        dbCol = await openDbCollection(dbConnection, colName);

        // Next section
        // look for info document
        // In an effort to prevent repetition, there is a utils function that looks for document with _id=0
        let infoDoc;
        await lookForImportantInfoDoc(dbCol)
            .then((obj) => {
                infoDoc = obj;
            })
            .catch((err) => {
                console.log('Unable to retrieve _id=0');
                throw err; // handled by catch in controller
            });

        //Next Section returns the array
        return new Promise(function (resolve, reject) {
            let scalesAr = infoDoc.trackedScalesIDs;
            if (scalesAr.length >= 1) {
                resolve(scalesAr);
            } else {
                reject({ err: 'No ids inside the array' });
            }
        });
    }

    /**
     * Add the scale data as a key/value to doc with _id=0
     * the format for the key is scaleID_data
     * @param {*} dbConnection
     * @param {*} colName
     * @param {*} scaleID
     * @param {*} scaleData [name,correctPortion]
     */
    static async addWeighingScaleData(
        dbConnection,
        colName,
        scaleID,
        scaleData,
    ) {
        //First section
        let dbCol;
        dbCol = await openDbCollection(dbConnection, colName);

        // Next section
        // look for info document
        // In an effort to prevent repetition, there is a utils function that looks for document with _id=0
        let infoDoc;
        await lookForImportantInfoDoc(dbCol)
            .then((obj) => {
                infoDoc = obj;
            })
            .catch((err) => {
                console.log('Unable to retrieve _id=0');
                throw err; // handled by catch in controller
            });

        //Next Section that checks to see if ingredientID exists

        let found;
        for (let i = 0; i < infoDoc.trackedScalesIDs.length; i++) {
            if (infoDoc.trackedScalesIDs[i] === scaleID) {
                found = true;
                break; // No need to keep going
            }
        }
        return new Promise(function (resolve, reject) {
            if (found) {
                let addKey = scaleID + '_data'; // Dynamically creating key; NOTE it cannot contain .
                dbCol.updateOne(
                    { _id: 0 },
                    { $set: { [addKey]: scaleData } },
                    (err, obj) => {
                        if (err) reject(err);
                        console.log('Scale data successfully added');
                        resolve(obj);
                    },
                );
            } else {
                console.log('The ID has not been created yet');
                reject();
            }
        });
    }
    /**
     * GET the weighing scale data associated with this scaleID
     * @param {*} dbConnection
     * @param {*} colName
     * @param {*} scaleID
     */
    static async getWeighingScaleData(dbConnection, colName, scaleID) {
        //First section
        let dbCol;
        dbCol = await openDbCollection(dbConnection, colName);

        // Next section
        // look for info document
        // In an effort to prevent repetition, there is a utils function that looks for document with _id=0
        let infoDoc;
        await lookForImportantInfoDoc(dbCol)
            .then((obj) => {
                infoDoc = obj;
            })
            .catch((err) => {
                console.log('Unable to retrieve _id=0');
                throw err; // handled by catch in controller
            });

        //Next Section that checks to see if scaleID exists

        let found;
        for (let i = 0; i < infoDoc.trackedScalesIDs.length; i++) {
            if (infoDoc.trackedScalesIDs[i] == scaleID) {
                found = true;
                break; // No need to keep going
            }
        }
        return new Promise(function (resolve, reject) {
            if (found) {
                let keyData = scaleID + '_data';
                resolve(infoDoc[keyData]);
            } else {
                reject({ err: 'ScaleID not present in the array' });
            }
        });
    }

    /**
     * PUT the weighing scale name associated with this scaleID
     * @param {*} dbConnection
     * @param {*} colName
     * @param {*} scaleID
     * @param {*} newName to update
     */
    static async updateNameData(dbConnection, colName, scaleID, newName) {
        //First section
        let dbCol;
        dbCol = await openDbCollection(dbConnection, colName);

        // Next section
        // look for info document
        // In an effort to prevent repetition, there is a utils function that looks for document with _id=0
        let infoDoc;
        await lookForImportantInfoDoc(dbCol)
            .then((obj) => {
                infoDoc = obj;
            })
            .catch((err) => {
                console.log('Unable to retrieve _id=0');
                throw err; // handled by catch in controller
            });

        //Next Section that checks to see if scaleID exists

        let found;
        for (let i = 0; i < infoDoc.trackedScalesIDs.length; i++) {
            if (infoDoc.trackedScalesIDs[i] == scaleID) {
                found = true;
                break; // No need to keep going
            }
        }
        return new Promise(function (resolve, reject) {
            if (found) {
                let updateKey = scaleID + '_data'; // Dynamically creating key; NOTE it cannot contain .
                let dataAr = infoDoc[updateKey]; // FORMAT [name,correctPortion]
                dataAr[0] = newName;
                dbCol.updateOne(
                    { _id: 0 },
                    { $set: { [updateKey]: dataAr } },
                    (err, obj) => {
                        if (err) reject(err);
                        console.log('Scale data name successfully updated');
                        resolve(obj);
                    },
                );
            } else {
                reject({ err: 'ScaleID not present in the array' });
            }
        });
    }

    /**
     * PUT the weighing scale name associated with this scaleID
     * @param {*} dbConnection
     * @param {*} colName
     * @param {*} scaleID
     * @param {*} newPortion to update
     */
    static async updatePortionData(dbConnection, colName, scaleID, newPortion) {
        //First section
        let dbCol;
        dbCol = await openDbCollection(dbConnection, colName);

        // Next section
        // look for info document
        // In an effort to prevent repetition, there is a utils function that looks for document with _id=0
        let infoDoc;
        await lookForImportantInfoDoc(dbCol)
            .then((obj) => {
                infoDoc = obj;
            })
            .catch((err) => {
                console.log('Unable to retrieve _id=0');
                throw err; // handled by catch in controller
            });

        //Next Section that checks to see if scaleID exists

        let found;
        for (let i = 0; i < infoDoc.trackedScalesIDs.length; i++) {
            if (infoDoc.trackedScalesIDs[i] == scaleID) {
                found = true;
                break; // No need to keep going
            }
        }
        return new Promise(function (resolve, reject) {
            if (found) {
                let updateKey = scaleID + '_data'; // Dynamically creating key; NOTE it cannot contain .
                let dataAr = infoDoc[updateKey]; // FORMAT [name,correctPortion]
                dataAr[1] = newPortion;
                dbCol.updateOne(
                    { _id: 0 },
                    { $set: { [updateKey]: dataAr } },
                    (err, obj) => {
                        if (err) reject(err);
                        console.log('Scale data portion successfully updated');
                        resolve(obj);
                    },
                );
            } else {
                reject({ err: 'ScaleID not present in the array' });
            }
        });
    }
}
