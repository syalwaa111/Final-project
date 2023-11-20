const express = require('express');
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();
app.use(express.json());

app.use('/applications', applicationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});