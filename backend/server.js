const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 3000;

/**
 * Array to store connected clients.
 * @type {Array}
 */
let clients = [];

/**
 * Object to store bike states by email.
 * @type {Object}
 */
let bikes = {};

app.listen(PORT, () => {
  console.log(`Bike Lock service listening at http://localhost:${PORT}`);
});

/**
 * Middleware for handling events.
 * @param {Request} request - The request object.
 * @param {Response} response - The response object.
 * @param {NextFunction} next - The next function.
 */
function eventsHandler(request, response, next) {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  response.writeHead(200, headers);
  const email_id = request.query.email;

  const data = `data: {${JSON.stringify(email_id)}: ${JSON.stringify(
    bikes[email_id]
  )}}\n\n`;
  console.log(data);
  response.write(data);

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    response,
    email: email_id,
  };

  clients.push(newClient);

  request.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });
}

app.get("/api", eventsHandler);

/**
 * Sends bike state events to all clients subscribed to the specified email.
 * @param {string} email - The email address.
 */
function sendEventsToAll(email) {
  clients.forEach((client) => {
    console.log(client);
    if (client.email == email) {
      client.response.write(
        `data: { ${JSON.stringify(email)} : ${JSON.stringify(
          bikes[email]
        )}}\n\n`
      );
    }
  });
}

/**
 * Adds a new bike to the bikes object.
 * @param {Request} request - The request object.
 * @param {Response} response - The response object.
 * @param {NextFunction} next - The next function.
 */
async function addBike(request, response, next) {
  const email = request.body.email;
  console.log(email);
  bikes[email] = false;
  response.json(email);
  return sendEventsToAll(email);
}

app.post("/api", addBike);

/**
 * Updates the state of a bike for the specified email.
 * @param {Request} request - The request object.
 * @param {Response} response - The response object.
 * @param {NextFunction} next - The next function.
 */
async function updateBike(request, response, next) {
  const state = request.body.state;
  const email = request.params.email;
  console.log(email);
  bikes[email] = state;
  response.json(email);
  return sendEventsToAll(email);
}

app.put("/api/:email", updateBike);
