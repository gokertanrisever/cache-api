import app from "./app";
import http from "http";
import utils from "./utils";
import logger from "./utils/logger";

// Get port from environment and store in Express.
const port = utils.normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Create HTTP server.
const server = http.createServer(app);

server.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});