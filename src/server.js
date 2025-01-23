const express = require('express');
const servicesRoutes = require('./routes/services')


const app = express();
const port = 3000;

app.use(express.json())
app.use('/tasks',servicesRoutes)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });