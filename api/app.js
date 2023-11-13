var express = require('express');
var app = express();
var adminRoutes = require("./routes/adminRoutes.js");

app.use(express.json());

app.use('/adminRoutes', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});