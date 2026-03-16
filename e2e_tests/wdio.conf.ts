export const config: WebdriverIO.Config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    tsConfigPath: './test/tsconfig.json',
    
    port: 4723,
    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './test/specs/**/*.ts'
    ],
    exclude: [
    ],
    //
    // ============
    // Capabilities
    // ============
    maxInstances: 1, // Usually 1 for mobile to avoid session conflicts
        capabilities: [{
            platformName: 'Android',
            'appium:deviceName': 'Android Emulator',
            'appium:automationName': 'UiAutomator2',
            'appium:app': '../app/build/outputs/apk/debug/app-debug.apk',

            // Corrected Application ID from build.gradle.kts
            'appium:appPackage': 'com.example.android.architecture.blueprints.main',

            // Corrected Activity path
            // In Android, if the activity is in a sub-package relative to the namespace,
            // you often need the full path or the relative dot-prefix.
            'appium:appActivity': 'com.example.android.architecture.blueprints.todoapp.TodoActivity',

            'appium:newCommandTimeout': 240,
            'appium:fullReset': false,
            'appium:noReset': true
        }],

    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['appium'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    //
    // =====
    // Hooks
    // =====
    // You can add hooks here if needed
}
