require("dotenv").config();
const app = require("./app");
const { connectDB } = require("./db");

const port = Number(process.env.PORT) || 3001;

connectDB()
  .then(() => {
    app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));
  })
  .catch((error) => {
    console.error("Não foi possível conectar ao MongoDB:", error.message);
    process.exit(1);
  });
