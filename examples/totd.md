## Get Today's Track Of The Day

> [!WARNING]
> Starting with version 4 of node-trackmania.io, the `client.stripFormat()` method has been removed in favor of the `tm-essentials` package.
> You don't have to install it, but it's recommended if you want more formatting options of all kinds in Trackmania.

```js
const TMIO = require('trackmania.io'),
  TMEssentials = require('tm-essentials'),
  client = new TMIO.Client();

client.totd.get(new Date()).then(async totd=>{
    const map = await totd.map(),
        author = await map.author();

    // Map names aren't formatted by default (color codes for example), so we need to format them
    // Starting with version 4 of node-trackmania.io, the `client.stripFormat()` method has been removed in favor of the `tm-essentials` package.
    const mapName = TMEssentials.TextFormatter.deformat(TMEssentials.TextFormatter.formatAnsi(map.name));

    console.log("Today's TOTD is called", mapName, "and it was created by", author.name);
});
```