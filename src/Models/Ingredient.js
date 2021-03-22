import { openDbCollection } from '../Utils/db.js';
/**
 * The class Ingredient that handles operations to the db.
 * Some methods are static since it is not required to create a new object.
 */

export class Ingredient {
    // Constructor of the class, instantiated in Controller
    constructor(
        scaleID,
        name,
        weight,
        weightFluc,
        accuracyPortion,
        time,
        order,
    ) {
        this.scaleID = scaleID;
        this.name = name;
        this.weight = weight;
        this.weightFluc = weightFluc;
        this.accuracyPortion = accuracyPortion;
        this.time = time;
        this.order = order; //Added to help getting the weight reading in correct order
    }
    /**
     * @Returns the data in the correct format to add it to db.
     */
    getDataInJSON() {
        return {
            scaleID: this.scaleID,
            name: this.name,
            weight: this.weight,
            weightFlu: this.weightFluc,
            accuracy: this.accuracyPortion,
            time: this.time,
            order: this.order,
        };
    }

    async addWeightReadingDb(dbConnection, dbCollection) {
        // first section, trying to get the db connection
        let obj = this;
        let dbCol;
        dbCol = await openDbCollection(dbConnection, dbCollection);

        // Second section
        return new Promise(function (resolve, reject) {
            dbCol.insertOne(obj.getDataInJSON(), (err, obj) => {
                if (err) reject(err);
                console.log('Weight Reading added');
                resolve(obj);
            });
        });
    }
    static async getWeightReadingRealTime(dbConnection, dbCollection, order) {
        //First section
        let dbCol;
        dbCol = await openDbCollection(dbConnection, dbCollection);
        //Db query
        return new Promise(function (resolve, reject) {
            dbCol.findOne(
                {
                    order: order,
                },
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                },
            );
        });
    }
}
