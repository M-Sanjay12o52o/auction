import { createServer } from "http";
import { Server } from "socket.io";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
let currentBid = 0;
let lastBidder = null;
const db = await open({
    filename: "auction.db",
    driver: sqlite3.Database,
});
await db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE,
      content TEXT
  );
`);
const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});
io.on("connection", (socket) => {
    console.log("socket connected: ", socket.id);
    // socket.emit("currentBid", currentBid);
    // handle bid events
    socket.on("placeBid", ({ newBid, userEmail }) => {
        console.log("newBid server: ", newBid, "userEmail server: ", userEmail);
        if (newBid > currentBid) {
            currentBid = newBid;
            lastBidder = userEmail;
            console.log("currentBid after Update: ", currentBid, "lastBidder after Update: ", lastBidder);
            io.emit("bidUpdate", { currentBid, lastBidder });
        }
    });
    io.emit("test", "hello from test");
});
httpServer.listen(3001, () => {
    console.log("Server running at http://localhost:3001");
});
