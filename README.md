### InVerte-API Express-Based Server

# Authors: InVerteDev1

# Version: V0.0.3 (Beta)

# Installed packages

• Express: API server
• Nodemon: Facilitates running the experimental server
• Mongodb: database used for this project
• Mocha: Testing
• Axios: Sending data in Script
• Request : send data in mocha
• Socket.io : real-time communication

# How To Run?
1. npm install
2. npm run dev (make sure you are using node version 14 or above)

# How to Test?
1. Open terminal
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

# Port Connected: 8000

# Summary
The server handles the back-end logic of 'inverte-react-client'. Primarily, it allows real-time bi-directional communication of weightScale client(hardware) and front-end app through the use of WebSockets. 

This implementation is by no means in production stage. Security is an essential topic that needs to be addressed.

The documentation is divided into two sections: {HTTP, Mongo, and WebSockets}

### HTTP Section

# Important files

• index.js: main entry file for the package.
• test : Mocha tests.
• src/App.js : express server + web-sockets instantiation.
• src/Controllers : Fetches and Retrieves data from Models.
• src/Models : contains the Class that interacts with Mongodb.
• src/Routers : Handle the routes requests to Controllers.
• src/Utils : Contains database connection

## Routes Handled

# api/user
•(POST) /create : creates a document with \_id=0 for the first time : needs userID

•(POST,DELETE,GET) /weighingScale : Links a weighingScaleID—given to each physicalID manufactured—to the userID by adding it to array inside \_id=0: Needs userID and scaleID

•(POST, GET) /weighingScale/data : links the weighingScale data to a weighingScaleID : needs userID, scaleID, and scaleData[name, correctPortion]

•(PUT) /weighingScale/data/name : updates the ingredient name that is being tracked : needs userID, scaleID, newName

•(PUT) /weighingScale/data/portion : updates the ingredient correct portion that is being tracked by weighing scale: needs userID, scaleID, newPortion

# api/ingredient
•(POST) /real-time : posts a weight reading to the user's collection. It mimics how a future web-socket will work: needs userID, weightReadingObject [see Client Generate Script]

## Design Decisions and Assumptions

# Each user is its own db collection. 
However, more 'business-data' collections will be added. 

# Document with \_id=0 used for special purposes
Some operations inside src/Models/User.js have a 'hardcoded' \_id=0 because it is a lot cleaner to have the most important data inside a specific document.


## WebSockets Section

# Connection Event
• Name: connection
• File: App.js


# Update Event
• Name: updateWeightReading
• File: src/Sockets/UpdateWR.js
• Params: {weightScaleID, currentWeight}

## MongoDb Section

# Credentials:
Name Database: inverte-api-server
Collection name is johanArcos_5680

# Future
Each user is its own collection.
Security.

