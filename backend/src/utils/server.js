const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const recordRoutes = require("./routes/records");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
