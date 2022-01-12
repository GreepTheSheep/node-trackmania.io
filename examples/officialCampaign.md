## Get the actual official Campaign

```js
const TMIO = require('trackmania.io'),
    client = new TMIO.Client();

client.campaigns.currentSeason().then(async campaign=>{
    console.log('The actual official campaign is', campaign.name);
    console.log('The image URL of this campaign is:', campaign.image);

    console.log('Top 10 of this campaign:');
    const leaderboard = await campaign.leaderboard();
    leaderboard.forEach(top=>{
        console.log(top.position, top.playerName, "with", top.points, "points");
    });
});

```