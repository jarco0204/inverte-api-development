import express from "express";
import ingredientRouter from "./Routers/Ingredient.js";
import userRouter from "./Routers/User.js";
import cors from "cors";
import { Server } from "socket.io";
import { connectToDB, closeDBConnection } from "./Utils/db.js";

//Instantiation of main app
const app = express();
let server;
let mongoDb;

//DB initialization
//Gurantees that the connection is opened, once the server is started
async function loadDBClient() {
    try {
        mongoDb = await connectToDB();
    } catch (err) {
        throw new Error("Could not connect to the Mongo DB");
    }
}
loadDBClient();

//Middleware
app.use(express.json()); // support json encoded bodies
app.use(cors());
// This method is executed every time a new request arrives.
// We add the variable db to the request object, to be retrieved in the route req object
app.use((req, res, next) => {
    req.db = mongoDb;
    next();
});

// Routes
app.use("/api/user", userRouter);
app.use("/ingredient", ingredientRouter);

// Properly Close the DB connection before closing the server
process.on("SIGINT", () => {
    console.info("SIGINT signal received.");
    console.log("Closing Mongo Client.");
    closeDBConnection();
    server.close(() => {
        console.log("Http server closed.");
    });
});
// Start of the Express API
export const start = async () => {
    const port = 8000;
    server = app.listen(port, () => {
        console.log("Express API server is listening on port 8000");

        // Web-Socket
        console.log(")Start Web-Socket");
        const webSocket = new Server(server, {
            cors: {
                origin: "*",
            },
        });
        console.log(")Successful Start ");

        //Connection event
        console.log("Listening to connections");
        webSocket.on("connection", (socket) => {
            //Events received from client-side
            console.log(socket.id); // Is there a way to verify this?

            console.log("User connected to web-socket");
            socket.on("updateWeightReading", (data) => {
                /*
                    Input:
                        data {weightScaleID, prevWeight, curWeight}
                    Tasks:
                    1) Retrieve the data specific of a portion
                    1) Determine accuracy of portion (compare)
                    2)
                */

                // let portionAcurracy;
                // if (data.prevWeight - data.curWeight == 51) {
                //     portionAcurracy = "=";
                // }

                //Data to send
                // data.scaleID

                let objectSend = {
                    scaleID: data.scaleID,
                    weight: data.curWeight,
                    accuracy: "=",
                };
                console.log(objectSend);
                socket.broadcast.emit("updateWR", objectSend); // notify others
            });
        });
    });
};
