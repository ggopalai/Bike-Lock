const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 3000;

let clients = [];
let bikes = {};

app.listen(PORT, () => {
  console.log(`Bike Lock service listening at http://localhost:${PORT}`);
});
// ...

function eventsHandler(request, response, next) {
  console.log("eventsHandler");
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  response.writeHead(200, headers);
  const email_id = request.query.email;

  const data = `data: {${JSON.stringify(email_id)}: ${JSON.stringify(bikes[email_id])}}\n\n`;
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

function sendEventsToAll(email) {
  clients.forEach((client) => {
    console.log(client);
    if (client.email == email) {
      client.response.write(
        `data: { ${JSON.stringify(email)} : ${JSON.stringify(bikes[email])}}\n\n`
      );
    }
  });
}

async function addBike(request, response, next) {
  const email = request.body.email;
  console.log(email);
  bikes[email] = false;
  response.json(email);
  return sendEventsToAll(email);
}

app.post("/api", addBike);

async function updateBike(request, response, next) {
  console.log("change state of the bike");
  const state = request.body.state;
  const email = request.params.email;
  console.log(email);
  bikes[email] = state;
  response.json(email);
  return sendEventsToAll(email);
}

app.put("/api/:email", updateBike);

// curl -X PUT -H "Content-Type: application/json" -d '{"state": "true"}' http://localhost:3000/api/abca@def.com
