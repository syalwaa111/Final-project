const express = require('express');
const userRoutes = require("./routes/userEducationHistoryRoutes");

const app = express();
app.use(express.json());

app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app