const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const app = express();
const fs = require('fs');
/*const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/patolento.com/privkey.pem", 'utf-8'),
  cert: fs.readFileSync("/etc/letsencrypt/live/patolento.com/fullchain.pem", 'utf-8'),
  ca: fs.readFileSync("/etc/letsencrypt/live/patolento.com/chain.pem", 'utf-8'),
};*/
const server = http.createServer(app);
const io = socketIo(server);
io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    10000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});
const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      "https://patolento.com/aircraft.json"
    );
    let flights = [];
    flights = res.data;
    socket.emit("FromAPI", flights);
    console.log("Data updated...");
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
server.listen(port, () => console.log(`Listening on port ${port}`));
