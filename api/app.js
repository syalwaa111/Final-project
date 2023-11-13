const express = require('express');
const userRoutes = require("./routes/userRoutes");
const jobCategoryRoutes = require('./jobCategoryRoutes');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/jobcategory', jobCategoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
