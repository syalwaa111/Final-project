var express = require('express');
var app = express();
var adminRoutes = require("./routes/adminRoutes.js");

app.use(express.json());

app.use('/adminRoutes', adminRoutes);

//const PORT = process.env.PORT || 3000;
app.listen(3000);

//=> {
  //  console.log(`Server is running on port ${PORT}`);
//});