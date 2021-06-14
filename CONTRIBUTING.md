# Contributing

Thanks for being part of the code!

## Directory layout

```css
+---.github
¦   +---workflows /* CI & automations for PR and releases */
+---.vscode /* VSCode Debug file */
+---examples /* Examples files for end-users, please keep this updated */
+---node_modules /* Node.js modules, for npm i */
+---src
¦   +---Campaigns
¦   +---Clubs
¦   +---COTD
¦   +---Events
¦   +---map
¦   +---Matches
¦   +---Matchmaking
¦   +---News
¦   +---Players
¦   +---Rooms
¦   +---TOTD
¦   +---_appendix_datas /* all appendix JSON data to add in the result data, it includes names, pictures URL, and useful data that is not on the API */
+---test /* Mocha tests */
```

## Pull Requests

Before opening a PR, run `npm test` to do a eslint scan then run mocha tests

When opening a PR, please open it to the 'develop' branch. Thanks!

## Issues

All issues are appreciated, it can be suggestions, bug fixes.

## Discussion

If you want to talk about this project or just for saying hi, Join the [Openplanet Discord Server](https://openplanet.nl/link/discord), in the #trackmania-io channel
