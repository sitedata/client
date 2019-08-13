import {noop} from 'lodash-es'

// Set this to true if you want to turn off most console logging so you can profile easier
let PERF = false

let config = {
  allowMultipleInstances: false, // Multiple instances of the app
  enableActionLogging: true, // Log actions to the log
  enableStoreLogging: false, // Log full store changes
  featureFlagsOverride: '', // Override feature flags
  filterActionLogs: null, // Filter actions in log
  forceImmediateLogging: false, // Don't wait for idle to log
  ignoreDisconnectOverlay: false, // Let you use the app even in a disconnected state
  immediateStateLogging: false, // Don't wait for idle to log state
  isDevApplePushToken: false,
  isTesting: __STORYBOOK__, // Is running a unit test
  printOutstandingRPCs: false, // Periodically print rpcs we're waiting for
  printOutstandingTimerListeners: false, // Periodically print listeners to the second clock
  printRPC: false, // Print rpc traffic
  printRPCBytes: false, // Print raw bytes going over the wire
  printRPCStats: false, // Print more detailed stats about rpcs
  printRPCWaitingSession: false, // session / waiting info
  reduxSagaLogger: false, // Print saga debug info
  reduxSagaLoggerMasked: true, // Print saga debug info masked out
  showDevTools: false, // Show devtools on start
  skipAppFocusActions: false, // dont emit actions when going foreground/background, helpful while working on other actions stuff
  skipSecondaryDevtools: true, // Don't show devtools for menubar/trackers etc
  userTimings: false, // Add user timings api to timeline in chrome
  virtualListMarks: false, // If true add constraints to items in virtual lists so we can tell when measuring is incorrect
}

// Developer settings
if (__DEV__) {
  config.allowMultipleInstances = true
  config.enableActionLogging = false
  config.enableStoreLogging = true
  config.filterActionLogs = null // '^chat|entity'
  config.printOutstandingRPCs = true
  config.printOutstandingTimerListeners = true
  config.printRPC = true
  config.printRPCWaitingSession = false
  config.printRPCStats = true
  config.reduxSagaLogger = false
  config.reduxSagaLoggerMasked = false
  config.userTimings = true
}

if (!__STORYBOOK__) {
  const serverConfig: any = KB.fs.readServerConfig()
  if (serverConfig && serverConfig.lastLoggedInUser) {
    const userConfig = serverConfig[serverConfig.lastLoggedInUser] || {}
    if (userConfig.printRPCStats) {
      config.printRPCStats = true
    }
  }

  // Load overrides from a local json file
  const pathJson: any = KB.fs.readJsonDebug()
  console.log('Loaded debug json', pathJson)
  config = {...config, ...pathJson}
  if (Object.prototype.hasOwnProperty.call(pathJson, 'PERF')) {
    PERF = pathJson.PERF
  }
}

// If performance testing
if (PERF) {
  console.warn('\n\n\nlocal debug PERF is ONNNNNn!!!!!1!!!11!!!!\nAll console.logs disabled!\n\n\n')

  // Flow (correctly) doesn't like assigning to console
  const c: any = console

  c._log = console.log
  c._warn = console.warn
  c._error = console.error
  c._info = console.info

  c.log = noop
  c.warn = noop
  c.error = noop
  c.info = noop

  config.enableActionLogging = false
  config.enableStoreLogging = false
  config.filterActionLogs = null
  config.forceImmediateLogging = false
  config.ignoreDisconnectOverlay = false
  config.immediateStateLogging = false
  config.printOutstandingRPCs = false
  config.printOutstandingTimerListeners = false
  config.printRPC = false
  config.reduxSagaLogger = false
  config.reduxSagaLoggerMasked = false
  config.userTimings = false
  config.virtualListMarks = false
}

export const {
  allowMultipleInstances,
  enableActionLogging,
  enableStoreLogging,
  featureFlagsOverride,
  filterActionLogs,
  forceImmediateLogging,
  ignoreDisconnectOverlay,
  isDevApplePushToken,
  immediateStateLogging,
  isTesting,
  printOutstandingRPCs,
  printOutstandingTimerListeners,
  printRPC,
  printRPCBytes,
  printRPCWaitingSession,
  printRPCStats,
  reduxSagaLogger,
  reduxSagaLoggerMasked,
  showDevTools,
  skipAppFocusActions,
  skipSecondaryDevtools,
  userTimings,
  virtualListMarks,
} = config
