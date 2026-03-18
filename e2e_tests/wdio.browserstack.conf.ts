import * as path from "node:path";
import * as dotenv from "dotenv";
import type { Options } from "@wdio/types";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const PLATFORM = (process.env.PLATFORM || "android").toLowerCase();

export const config: WebdriverIO.Config = {
  runner: "local",

  tsConfigPath: "./tsconfig.json",

  //
  // BrowserStack Credentials
  //
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  specs: [
      './test/specs/**/*.spec.ts'
  ],

  maxInstances: 1,

  //
  // Android + iOS capabilities
  //
  capabilities: [
    {
      platformName: "Android",

      "appium:deviceName": process.env.BROWSERSTACK_ANDROID_DEVICE_NAME || "Google Pixel 8",
      "appium:platformVersion":
        process.env.BROWSERSTACK_ANDROID_PLATFORM_VERSION || "14.0",
      "appium:automationName": "UiAutomator2",
      "appium:app": process.env.BROWSERSTACK_APP_ID_Android,
      'appium:autoGrantPermissions': true,

      "bstack:options": {
        projectName: "Appium POC",
        buildName: `Build-${Date.now()}`,
        sessionName: "Android Automation Test",
        debug: true,
        networkLogs: true
      }
    },

    {
      platformName: "iOS",

      "appium:deviceName": process.env.BROWSERSTACK_IOS_DEVICE_NAME || "iPhone 17",
      "appium:platformVersion": process.env.BROWSERSTACK_IOS_PLATFORM_VERSION || "26.0",
      "appium:automationName": "XCUITest",
      "appium:app": process.env.BROWSERSTACK_APP_ID_iOS,
      'appium:autoAcceptAlerts': true,

      "bstack:options": {
        projectName: "Appium POC",
        buildName: `Build-${Date.now()}`,
        sessionName: "iOS Automation Test",
        debug: true,
        networkLogs: true
      }
    }
  ].filter((capability) => {
    return capability.platformName.toLowerCase() === PLATFORM;
  }),

  logLevel: "info",

  waitforTimeout: 10000,

  connectionRetryTimeout: 120000,

  connectionRetryCount: 3,

  services: [
    [
      "browserstack",
      {
        browserstackLocal: false
      }
    ]
  ],

  framework: "mocha",

  reporters: ["spec"],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000
  }
};