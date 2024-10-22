const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Default region in the cloud: " + process.env.DEFAULT_REGION_AWS);
});
