// // Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require('expo/metro-config');

// /** @type {import('expo/metro-config').MetroConfig} */
// const config = getDefaultConfig(__dirname);

// module.exports = config;

// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Firebase v12 distributes multiple builds behind the `exports` field. Without
// enabling package export resolution Metro picks the wrong file for
// `firebase/auth`, which triggers the runtime error
// "INTERNAL ASSERTION FAILED: Expected a class definition" during bundling.
config.resolver.unstable_enablePackageExports = true;

// Ensure Metro can resolve the CommonJS build of Firebase when necessary.
if (!config.resolver.sourceExts.includes('cjs')) {
  config.resolver.sourceExts.push('cjs');
}

module.exports = config;