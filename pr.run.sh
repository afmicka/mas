#!/bin/bash

TAGS=""
REPORTER=""
EXCLUDE_TAGS="--grep-invert nopr"
EXIT_STATUS=0
PR_NUMBER=$(echo "$GITHUB_REF" | awk -F'/' '{print $3}')
echo "PR Number: $PR_NUMBER"

# Extract feature branch name from GITHUB_HEAD_REF
FEATURE_BRANCH="$GITHUB_HEAD_REF"
# Replace "/" characters in the feature branch name with "-"
FEATURE_BRANCH=$(echo "$FEATURE_BRANCH" | sed 's/\//-/g')
echo "Feature Branch Name: $FEATURE_BRANCH"

PR_BRANCH_LIVE_URL_GH="https://$FEATURE_BRANCH--$prRepo--$prOrg.aem.live"
# set pr branch url as env
export PR_BRANCH_LIVE_URL_GH
export PR_NUMBER

echo "PR Branch live URL: $PR_BRANCH_LIVE_URL_GH"
echo "*******************************"

# Convert github labels to tags that can be grepped
for label in ${labels}; do
  if [[ "$label" = \@* ]]; then
    label="${label:1}"
    TAGS+="|$label"
  fi
done

# Remove the first pipe from tags if tags are not empty
[[ ! -z "$TAGS" ]] && TAGS="${TAGS:1}" && TAGS="-g $TAGS"

# Retrieve github reporter parameter if not empty
# Otherwise use reporter settings in playwright.config.js
REPORTER=$reporter
[[ ! -z "$REPORTER" ]] && REPORTER="--reporter $REPORTER"

echo "*** Running Nala on $FEATURE_BRANCH ***"
echo "Tags : $TAGS"
echo "npx playwright test ${TAGS} ${EXCLUDE_TAGS} ${REPORTER}"

cd "$GITHUB_ACTION_PATH" || exit
npm ci
npm install
npx playwright install --with-deps

echo "*** Running tests on specific projects ***"
npx playwright test --config=./playwright.config.js ${TAGS} ${EXCLUDE_TAGS} --project=mas-live-chromium --project=mas-live-firefox --project=mas-live-webkit ${REPORTER} || EXIT_STATUS=$?


# Check to determine if the script should exit with an error.
if [ $EXIT_STATUS -ne 0 ]; then
    echo "Some tests failed. Exiting with error."
    exit $EXIT_STATUS
else
    echo "All tests passed successfully."
fi