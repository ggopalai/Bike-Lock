const evtSource = new EventSource(
  "http://localhost:3000/api?email=abc%40def.com"
  // "http://localhost:3000/"
);

evtSource.onmessage = (event) => {
  console.log("in sse");
  console.log("sse",event);
};
