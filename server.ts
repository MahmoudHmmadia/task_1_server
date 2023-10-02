import express from "express";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
app.use(cors({ origin: true, credentials: true, optionsSuccessStatus: 200 }));

const server = app.listen(3500, () => {
  console.log("Hey");
});
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("send_message", ({ year, salary }) => {
    console.log(year);

    socket.broadcast.emit("receive_message", {
      year,
      salary,
    });
  });
});
