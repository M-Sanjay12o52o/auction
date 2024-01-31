import { createServer } from "http";
import { Server } from "socket.io";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

(async () => {
  const db = await open({
    filename: "auction.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
  CREATE TABLE IF NOT EXISTS bids (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      newBid INTEGER,
      userEmail TEXT,
      itemId INTEGER, 
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

  io.on("connection", async (socket: any) => {
    // Get the latest bid when a new connection is established
    const latestBid = await db.get(
      "SELECT MAX(newBid) AS currentBid, userEmail AS lastBidder FROM bids"
    );

    const latestBidder = await db.get(
      "SELECT userEmail AS latestBidder FROM bids ORDER BY timestamp DESC LIMIT 1"
    );

    // Send the latest bid to the new connection
    socket.emit("bidUpdate", latestBid);

    // Handle bid events
    socket.on(
      "placeBid",
      async ({
        newBid,
        userEmail,
        itemId,
      }: {
        newBid: number;
        userEmail: string;
        itemId: number;
      }) => {
        const insertBid = await db.prepare(
          "INSERT INTO bids (newBid, userEmail, itemId) VALUES (?, ?, ?)"
        );
        await insertBid.run(newBid, userEmail, itemId);
        await insertBid.finalize();

        const updatedLatestBid = await db.get(
          "SELECT MAX(newBid) AS currentBid, userEmail AS lastBidder, itemId FROM bids WHERE itemId = ?",
          itemId
        );        

        console.log("updatedLastestBid: ", updatedLatestBid);

        io.emit("bidUpdate", updatedLatestBid);
      }
    );
  });

  httpServer.listen(3001, () => {
    console.log("Server running at http://localhost:3001");
  });
})();
