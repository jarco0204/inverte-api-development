### This is the server API package that runs express using MVC paradigm.

• index.js: main entry file for the package.
• \_\_ test \_\_ : contains the Mocha tests.
• src/App.js : contains the express server.
• src/Controllers : contains the files that communicate with the Models.
• src/Models : contains the Class that interacts with Mongodb.
• src/Routers : contains the files that handle the routes.
• src/Utils : contains the database file.

## Installed packages

• Express: API server
• Nodemon: Facilitates running the experimental server
• Mongodb: database used for this project
• Mocha: Testing
• Axios: Sending data in Script
• Request : send data in mocha

## Design Decisions and Assumptions

# For iteration 2, only one user is assumed to exists. Consequently, only one collection.

# ES modules are used instead of require.

# Each user is its own db collection.

• In order to help querying for Machine Learning purposes, we have decided that each user will a separate db collection. In order for a user to be a user, they NEED to buy at least one InVerte's weighing scale. Thus, it is not the case that the collection will have only few documents.

# Document with \_id=0 inside a user's collection will contain objects that handle information about the weighing scales——number of scales bought, ingredient name, correct portion weight.

• Some operations inside src/Models/User.js have a 'hardcoded' \_id=0 because it is a lot cleaner to have the most important data inside a specific document

## MongoDb information

•inverte-api-server is the name of the database.
•Each user is its own collection (refer to Design Decisions section)
•Collection name is johanArcos_5680

### Routes and HTTP operations handled by the API

## Main route api/user

# Subroutes:

•(POST) /create : creates a document with \_id=0 for the first time : needs userID

•(POST,DELETE,GET) /weighingScale : Links a weighingScaleID—given to each physicalID manufactured—to the userID by adding it to array inside \_id=0: Needs userID and scaleID

•(POST, GET) /weighingScale/data : links the weighingScale data to a weighingScaleID : needs userID, scaleID, and scaleData[name, correctPortion]

•(PUT) /weighingScale/data/name : updates the ingredient name that is being tracked : needs userID, scaleID, newName

•(PUT) /weighingScale/data/portion : updates the ingredient correct portion that is being tracked by weighing scale: needs userID, scaleID, newPortion

## api/ingredient

# Subroutes:

•(POST) /real-time : posts a weight reading to the user's collection. It mimics how a future web-socket will work: needs userID, weightReadingObject [see Client Generate Script]

# How to run this package (assumes you are at root directory)

1. cd API
2. npm run dev (make sure you are using node version 14 or above)

# To run the test

1. first open a terminal
2. locate to your /inverte-client-server folder
3. cd API (locate to your /API folder)
4. run `mongo`
   in mongo run:

    > use inverte-api-server
    > db.createCollection('johanArcos_5680')

5. open a new terminal
6. `npm run dev` (make sure you are using node version 14 or above)

7. open a new terminal
8. `npm test`
