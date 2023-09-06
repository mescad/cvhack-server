const cors = require("cors");
const express = require("express");
const session = require("express-session");

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,  
}

app.use(cors(corsOptions));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

const PORT = process.env.PORT || 8080;

const apiRoutes = require("./routes/api-routes");

app.use(express.json());

app.use("/", apiRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
