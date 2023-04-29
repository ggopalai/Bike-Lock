const evtSource = new EventSource(
  "http://localhost:3000/api?email=abc%40def.com"
);

evtSource.onmessage = (event) => {
  console.log(event);
};
