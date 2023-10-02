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
    origin: "https://task-1-i99r.onrender.com/",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", {
      message: data,
      id: new Date().toISOString(),
    });
  });
});
