## Get Player's COTD stats

```js
const TMIO = require('trackmania.io'),
    client = new TMIO.Client();

client.players.get("26d9a7de-4067-4926-9d93-2fe62cd869fc").then(async player=>{
    const cotd = await player.cotd();

    console.log(`
        ${player.name}'s COTD stats:
        ${cotd.count} Cup Of The Day played,
        ${cotd.stats.totalDivWins} wins in any division,
        ${(cotd.stats.averageDivRank * 100).toFixed(2)}% average rank,
        The best division in overall was Div ${cotd.stats.bestOverall.division},
        The best division in primary COTD was Div ${cotd.stats.bestPrimary.division},
    `);
});
```