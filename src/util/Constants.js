const { createEnum } = require("./Util");

/**
 * All available player groups.
 * * `nadeo` - All players from the Nadeo company
 * * `tmgl` - All players from the TMGL competition
 * * `tmwc21` - All players from the TrackMania World Cup 2021 competition
 * * `sponsor` - All players who sponsors Trackmania.io and Openplanet
 * * `team` - All players from the Trackmania.io and Openplanet team
 * @typedef {String} PlayerGroup
 */
exports.GroupTypes = createEnum([
    'nadeo',
    'tmgl',
    'tmwc21',
    'sponsor',
    'team'
]);

/**
 * @typedef {Object} Constants Constants that can be used in an enum or object-like way.
 * @property {PlayerGroup} GroupTypes All available player groups.
 */