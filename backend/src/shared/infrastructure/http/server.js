require("newrelic");
const helmet = require("helmet");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const router = require("./routes/index.routes.js");
const ExceptionHandler = require("#shared/infrastructure/http/exceptions/Handler.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
app.use(helmet());
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(ExceptionHandler);

app.listen(port, () => {
  console.log("Server running on port 3000");
});
