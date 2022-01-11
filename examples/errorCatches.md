## Gracefully catches errors

Every error is sent trough a `throw`, meaning that errors is handeled with a `.catch()` block or in a try/catch way.

Most errors can come from an API block.

Every requests is managed with a Promise, so you need to handle that with async/await or with a `.then()` block

### Example with campaign fetch

```js
const TMIO = require('trackmania.io'),
    client = new TMIO.Client();

client.campaigns.currentSeason().then(async campaign=>{
    console.log('The actual official campaign is', campaign.name);
    console.log('The image URL of this campaign is:', campaign.image);

    try {
        // Here, we try to execute another request, but in a async way
        // so we need to use try/catch

        console.log('Top 10 of this campaign:');
        const leaderboard = await campaign.leaderboard();
        leaderboard.forEach(top=>{
            console.log(top.position, top.playerName, "with", top.points, "points");
        });
    } catch (err) {
        // Here, an script or API error is throwed
        console.error(err);

        // Mostly, if it's an API block, you'll have this message:
        // "You are blocked from the API. Please get in touch with @Miss#8888 on Discord: https://openplanet.nl/link/discord - or DM me on Twitter: https://twitter.com/codecatt -- For more information on third-party API usage, see the following page: https://openplanet.nl/tmio/api"
    }
}).catch(err=>{
    // An error, sadge
    // Meanwhile, this is the same as a try/catch

    console.error(err);
})
```