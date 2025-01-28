const express = require('express');
const servicesRoutes = require('./routes/services')

const cors = require('cors');
const app = express();
const port = 3001

app.use(cors());
app.use(express.json())
app.use('/tasks',servicesRoutes)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });