## Gets the TOTD when it cames out every day

```js
const TMIO = require('trackmania.io'),
    client = new TMIO.Client();

client.on('totd', async totd=>{
    const map = await totd.map();

    // Map names aren't formatted by default (color codes for example), so we need to format them
    const mapName = client.stripFormat(map.name);

    console.log('New Track Of The Day:', mapName);
});
```
