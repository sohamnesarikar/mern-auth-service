import { app } from "./app.js";
import connectToDB from "./config/db.js";
import config from "./config/config.js";

const PORT = config.PORT || 5000;

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Something went wrong in database connection ${error.message}`);
  });
