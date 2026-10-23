import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import v1PostRoute from "./v1/routes/postRoutes";
import v1CommentRoute from "./v1/routes/commentRoutes";
import { limiter } from "./rateLimiter/limiter";

// initialize the express application
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(helmet());

// Define the port number
const PORT = process.env.PORT || 3000;

// Mount the router on a specific base path
app.use("/api/v1", limiter);
app.use("/api/v1/posts", v1PostRoute);
app.use("/api/v1", v1CommentRoute);

// Serve Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
