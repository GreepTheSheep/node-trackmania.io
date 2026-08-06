# Updating to v4

## Breaking Changes

### `client.stripFormat` & `client.formatTMText`

Thoses methods has been removed in favor of the [Trackmania Essentials package](https://www.npmjs.com/tm-essentials).

Installing it is optionnal, but it's recommended if you want more formatting options of all kinds in Trackmania.

```diff
- let mapName = client.stripFormat(map.name);
+ const TMEssentials = require('tm-essentials');
+ let mapName = TMEssentials.TextFormatter.deformat(map.name);
```