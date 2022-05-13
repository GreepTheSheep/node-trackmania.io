## Get Today's Track Of The Day

```js
const TMIO = require('trackmania.io'),
    client = new TMIO.Client();

client.totd.get(new Date()).then(async totd=>{
    const map = await totd.map(),
        author = await map.author();

    // Map names aren't formatted by default (color codes for example), so we need to format them
    const mapName = client.stripFormat(map.name);

    console.log("Today's TOTD is called", mapName, "and it was created by", author.name);
});
```