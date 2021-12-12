const { createEnum } = require("./Util");

/**
 * All available player groups.
 * * `nadeo` - All players from the Nadeo company
 * * `tmgl` - All players from the TMGL competition
 * * `tmwc21` - All players from the TrackMania World Cup 2021 competition
 * * `sponsor` - All players who sponsors Trackmania.io and Openplanet
 * * `team` - All players from the Trackmania.io and Openplanet team
 * @typedef {string} PlayerGroup
 */
exports.GroupTypes = createEnum([
    'nadeo',
    'tmgl',
    'tmwc21',
    'sponsor',
    'team'
]);

/**
 * All available matchmaking groups.
 * * `3v3`
 * * `royal`
 * @typedef {string} MatchmakingGroup
 */
exports.MMTypes = createEnum([
    ...Array(2).fill(null),
    '3v3', // 2
    'royal'  // 3
]);

/**
 * All available Nadeo-hosted club rooms regions.
 * * `eu-west` - Europe West
 * * `ca-central` - Canada Central
 * @typedef {string} RoomRegion
 */
exports.RoomRegions = createEnum([
    'eu-west',
    'ca-central'
]);

/**
 * All available Club Member roles.
 * * `Creator`
 * * `Admin`
 * * `Content_Creator`
 * * `Member`
 * @typedef {string} ClubMemberRole
 */
exports.ClubMemberRoles = createEnum([
    'Creator',
    'Admin',
    'Content_Creator',
    'Member'
]);

/**
 * All available Maniapub Types.
 * * `nadeo` - Nadeo official Maniapubs
 * * `ugc` - (User Generated Content) - Community Maniapubs
 * @typedef {string} AdType
 */
exports.AdTypes = createEnum([
    'nadeo',
    'ugc'
]);

/**
 * @typedef {Object} Constants Constants that can be used in an enum or object-like way.
 * @property {PlayerGroup} GroupTypes All available player groups.
 * @property {MatchmakingGroup} MMTypes All available matchmaking groups.
 * @property {RoomRegion} RoomRegions All available Nadeo-hosted club rooms regions.
 * @property {ClubMemberRole} ClubMemberRoles All available Club Member roles.
 * @property {AdType} AdTypes All available Maniapub Types.
 */