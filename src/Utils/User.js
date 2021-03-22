//---------------------- Db queries ----------
/**
 * Method that looks for document with _id=0 where the most important information about a collection is stored
 * Assumes that the document with _id=0 was already created
 */
export const lookForImportantInfoDoc = async (dbCollection) => {
    return new Promise(function (resolve, reject) {
        try {
            let obj = dbCollection.findOne({
                _id: 0,
            });
            console.log('Successfully retrieved _id=0');
            resolve(obj);
        } catch (err) {
            console.log(
                'An error happened while retrieving the trackedIDs array',
            );
            reject(err); //error handled by catch() at controller
        }
    });
};
