const express = require("express");
const app = express()
const PORT= process.env.PORT || 8080;
const cors= require("cors")
const apiRoutes = require('./routes/api-routes');




app.use(express.json());

app.use(cors());

app.use('/', apiRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});