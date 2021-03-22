import {
    connectToDB,
    openDbCollection,
    closeDBConnection,
} from '../src/Utils/db.js';
import request from 'request';
// import axios from 'axios';
import * as assert from 'assert';
import { User } from '../src/Models/User.js';

var db;
let userCollection;
let userCollectName;

// This method runs once and connects to the mongoDB
before(async () => {
    let userName = 'johanArcos_5680';
    db = await connectToDB();
    userCollection = await openDbCollection(db, userName);
    userCollectName = userName;
});

// this method will close your connection to MongoDB after the tests
after(async () => {
    closeDBConnection();
});

describe('Testing the User API', async () => {
    describe('Testing the User Model - Simple cases', () => {
        it('Pass 1 - Test success creation of an important information doc for the user', async () => {
            let commandRes = await User.createImportantInfoDoc(
                db,
                userCollectName,
            );
            // test if collection correctly inserted the _id:0
            assert.strictEqual(commandRes.insertedId, 0);
        });
        it('Pass 2 - Test success adding weighing scale for the user', async () => {
            let commandRes = await User.addWeighingScaleID(
                db,
                userCollectName,
                1,
            );

            // test if 1 document is being modified
            assert.strictEqual(commandRes.modifiedCount, 1);
        });
        it('Pass 3 - Test to get all the weighing scales ID', async () => {
            let commandRes = await User.getScales(db, userCollectName);

            // test to get all the weighing scales ID is [ 1 ]
            assert.notStrictEqual(commandRes, [1]);
        });
        it('Pass 4 - Test to add the scale data weighing scale', async () => {
            let commandRes = await User.addWeighingScaleData(
                db,
                userCollectName,
                1,
                [userCollectName, '10'],
            );

            // test if 1 document is being modified
            assert.strictEqual(commandRes.modifiedCount, 1);
        });
        it('Pass 5 - Test to get the weighing scale data associate with the scaleID', async () => {
            let commandRes = await User.getWeighingScaleData(
                db,
                userCollectName,
                1,
            );

            // test if weighting scale data is being return
            assert.notStrictEqual(commandRes, ['johanArcos_5680', '10']);
        });
        it('Pass 6 - Test to put the weighing scale name associated with this scaleID', async () => {
            let commandRes = await User.updateNameData(
                db,
                userCollectName,
                1,
                'newNAME',
            );

            // test if 1 document is being modified
            assert.strictEqual(commandRes.modifiedCount, 1);
        });
        it('Pass 7 - Test to put the weighing scale associated with the scaleID', async () => {
            let commandRes = await User.updatePortionData(
                db,
                userCollectName,
                1,
                '20',
            );

            // test if 1 document is being modified
            assert.strictEqual(commandRes.modifiedCount, 1);
        });
        it('Pass 8 - Test the deletetion of a weighing scale', async () => {
            let commandRes = await User.deleteWeighingScaleID(
                db,
                userCollectName,
                1,
            );

            // test if 1 document is being modified
            assert.strictEqual(commandRes.modifiedCount, 1);
        });
    });

    describe('Testing the User API - Complex Cases', () => {
        describe('User', () => {
            var userUrl = 'http://localhost:3000/api/user';
            beforeEach(function (done) {
                setTimeout(function () {
                    done();
                }, 500);
            });

            describe('Success 1 - POST /create', () => {
                let data = {
                    userID: 'johanArcos_5680',
                };
                it('POST /create', async () => {
                    // should create the doc for a user's collection using POST
                    request.post(
                        {
                            headers: { 'content-type': 'application/json' },
                            url: userUrl + '/create',
                            body: JSON.stringify(data),
                        },
                        (error, response) => {
                            assert.strictEqual(response.statusCode, 202);
                            assert.strictEqual(
                                JSON.parse(response.body).message,
                                'Successfully created the info doc',
                            );
                        },
                    );
                    try {
                        /* eslint-disable no-unused-vars */
                        let obj = await userCollection.remove({ _id: 0 });
                        console.log(`obj `);
                    } catch (err) {
                        console.log(`err`);
                    }
                });
            });
            describe('Success 2 - POST /weighingScale; DELETE /weighingScale;', () => {
                it('POST /weighingScale', () => {
                    let data = {
                        userID: 'johanArcos_5680',
                        scaleID: 1,
                    };
                    // should add the weighingScale to user's collection using POST
                    request.post(
                        {
                            headers: { 'content-type': 'application/json' },
                            url: userUrl + '/weighingScale',
                            body: JSON.stringify(data),
                        },
                        (error, response) => {
                            assert.strictEqual(response.statusCode, 202);
                            assert.strictEqual(
                                JSON.parse(response.body).message,
                                'Successfully linked the weighing scale to the user',
                            );
                        },
                    );
                });
                // should delete the weighingScale with scaleID1 for the specify user's collection using DELETE
                it('DELETE /weighingScale', () => {
                    let data = {
                        userID: 'johanArcos_5680',
                        scaleID: 1,
                    };
                    // should add the weighingScale to user's collection using POST
                    request.delete(
                        {
                            headers: { 'content-type': 'application/json' },
                            url: userUrl + '/weighingScale',
                            body: JSON.stringify(data),
                        },
                        (error, response) => {
                            assert.strictEqual(response.statusCode, 202);
                            assert.strictEqual(
                                JSON.parse(response.body).message,
                                'Successfully deleted the weighing scale',
                            );
                        },
                    );
                });
            });

            describe('Success 3 - POST /weighingScale 2nd; GET /weighingScale;', () => {
                it('POST /weighingScale 2nd', () => {
                    let data = {
                        userID: 'johanArcos_5680',
                        scaleID: 2,
                    };
                    // should add 2nd weighingScale to user's collection using POST
                    request.post(
                        {
                            headers: { 'content-type': 'application/json' },
                            url: userUrl + '/weighingScale',
                            body: JSON.stringify(data),
                        },
                        (error, response) => {
                            assert.strictEqual(response.statusCode, 202);
                            assert.strictEqual(
                                JSON.parse(response.body).message,
                                'Successfully linked the weighing scale to the user',
                            );
                        },
                    );
                });
                it('GET /weighingScale', () => {
                    let data = {
                        userID: 'johanArcos_5680',
                    };
                    // should get the weighingScale to user's collection using GET
                    request.get(
                        {
                            headers: { 'content-type': 'application/json' },
                            url: userUrl + '/weighingScale',
                            body: JSON.stringify(data),
                        },
                        (error, response) => {
                            assert.strictEqual(response.statusCode, 202);
                            assert.strictEqual(
                                JSON.parse(response.body).message,
                                'Successfully retrieved all weighing scales',
                            );
                        },
                    );
                });
            });
            describe('Success 4 - POST /weighingScale/data; GET /weighingScale/data', () => {
                it('POST /weighingScale/data', () => {
                    let data = {
                        userID: 'johanArcos_5680',
                        scaleID: 2,
                        scaleData: ['cheese', '200'],
                    };
                    // should add the weighingScale data to user's collection using POST
                    request.post(
                        {
                            headers: { 'content-type': 'application/json' },
                            url: userUrl + '/weighingScale/data',
                            body: JSON.stringify(data),
                        },
                        (error, response) => {
                            assert.strictEqual(response.statusCode, 202);
                            assert.strictEqual(
                                JSON.parse(response.body).message,
                                'Successfully added the weighing scale data for the first time',
                            );
                        },
                    );
                });
                it('GET /weighingScale/data', () => {
                    let data = {
                        userID: 'johanArcos_5680',
                        scaleID: 2,
                    };
                    // should get the weighingScale data from user's collection using GET
                    request.get(
                        {
                            headers: { 'content-type': 'application/json' },
                            url: userUrl + '/weighingScale/data',
                            body: JSON.stringify(data),
                        },
                        (error, response) => {
                            assert.strictEqual(response.statusCode, 202);
                            assert.strictEqual(
                                JSON.parse(response.body).message,
                                'Successfully retrieved the weighing scale data',
                            );
                        },
                    );
                });
            });
            describe('Success 5 - PUT /weighingScale/data/name;', () => {
                it('PUT /weighingScale/data/name', () => {
                    let data = {
                        userID: 'johanArcos_5680',
                        scaleID: 2,
                        newName: 'newNAME',
                    };
                    // should set a new name for the weighingScale data using PUT
                    request.put(
                        {
                            headers: { 'content-type': 'application/json' },
                            url: userUrl + '/weighingScale/data/name',
                            body: JSON.stringify(data),
                        },
                        (error, response, body) => {
                            assert.strictEqual(response.statusCode, 202);
                            assert.strictEqual(
                                JSON.parse(response.body).message,
                                'Successfully updated the weighing scale ingredient name',
                            );
                        },
                    );
                });
            });
            describe('Success 6 - PUT /weighingScale/data/portion;', () => {
                it('PUT /weighingScale/data/portion', () => {
                    let data = {
                        userID: 'johanArcos_5680',
                        scaleID: 2,
                        newPortion: '300',
                    };
                    // should set the weighingScale portion to specific scale ID using PUTs
                    request.put(
                        {
                            headers: { 'content-type': 'application/json' },
                            url: userUrl + '/weighingScale/data/portion',
                            body: JSON.stringify(data),
                        },
                        (error, response, body) => {
                            assert.strictEqual(response.statusCode, 202);
                            assert.strictEqual(
                                JSON.parse(response.body).message,
                                'Successfully updated the weighing scale ingredient portion',
                            );
                        },
                    );
                });
            });
        });
    });
});
