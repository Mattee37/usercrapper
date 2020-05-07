const user = require("./bot");
require("dotenv").config();

(async () => {
  await user.initialize();
  await user.login(process.env.EMAIL, process.env.PASSWORD);
  await user.logOutAllSessions();
  await user.book("https://premium.redusers.com/reader/gu08-google?location=1");
  await user.takeScreenshoots(148, "MundoGoogle");
  await user.close();
})();
