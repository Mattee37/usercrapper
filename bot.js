const puppeteer = require("puppeteer");
const fs = require("fs");

const user = {
  browser: null,
  page: null,

  initialize: async () => {
    user.browser = await puppeteer.launch({
      headless: false,
      args: ["--window-size=1920,1080"],
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });

    user.page = await user.browser.newPage();
  },

  login: async (email, password) => {
    await user.page.goto("https://premium.redusers.com/auth/login", {
      waitUntil: "networkidle2",
    });

    await user.page.type("#email", email);

    await user.page.type("#password", password);

    await user.page.$eval("#btnSubmit", (e) => e.click());
  },

  logOutAllSessions: async () => {
    await user.page.waitFor(500);
    try {
      await user.page.$eval("#btnSubmit", (e) => e.click());
    } catch {
      return;
    }
  },

  book: async (URL) => {
    await user.page.goto(URL, {
      waitUntil: "networkidle2",
    });
    await user.page.waitFor(2500);
    await user.page.reload();
    await user.page.waitFor(2500);
    await user.page.mouse.click(100, 100);
    await user.page.waitFor(1500);
  },

  takeScreenshoots: async (pages, title) => {
    const turns = pages - 2;

    const config = {
      path: `ss/${title}/${title}0.png`,
      clip: {
        x: 579,
        y: 0,
        width: 762,
        height: 1080,
      },
    };

    let configN = config;

    await fs.promises.mkdir(`./ss/${title}`, { recursive: true });

    await user.page.screenshot(config);
    for (let i = 0; i <= turns; i++) {
      configN.path = `ss/${title}/${title}${i + 1}.png`;
      await user.page.keyboard.press("ArrowRight");
      await user.page.waitFor(2000);
      await user.page.screenshot(configN);
    }
  },

  close: async () => {
    await user.browser.close();
  },
};

module.exports = user;
