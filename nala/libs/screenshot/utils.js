// eslint-disable-next-line import/no-extraneous-dependencies, import/no-import-module-exports, import/extensions
const fs = require('fs');
const path = require('path');

const ALLOWED_BASE_DIRECTORY = 'screenshots';

function writeResultsToFile(folderPath, testInfo, results) {
  const resultFilePath = `${folderPath}/results-${testInfo.workerIndex}.json`;
  fs.writeFileSync(validatePath(resultFilePath, { forWriting: true }), JSON.stringify(results, null, 2));
}

module.exports = { compareScreenshots, writeResultsToFile, validatePath };
