export var GroupTypes: any;
export var MMTypes: any;
export var RoomRegionsList: any;
/**
 * All available player groups.
 * * `nadeo` - All players from the Nadeo company
 * * `tmgl` - All players from the TMGL competition
 * * `tmwc21` - All players from the TrackMania World Cup 2021 competition
 * * `sponsor` - All players who sponsors Trackmania.io and Openplanet
 * * `team` - All players from the Trackmania.io and Openplanet team
 */
export type PlayerGroup = string;
/**
 * All available matchmaking groups.
 * * `3v3`
 * * `royal`
 */
export type MatchmakingGroup = string;
/**
 * All available Nadeo-hosted club rooms regions.
 * * `eu-west` - Europe West
 * * `ca-central` - Canada Central
 */
export type RoomRegions = string;
/**
 * Constants that can be used in an enum or object-like way.
 */
export type Constants = {
    /**
     * All available player groups.
     */
    GroupTypes: PlayerGroup;
    /**
     * All available matchmaking groups.
     */
    MMTypes: MatchmakingGroup;
    /**
     * All available Nadeo-hosted club rooms regions.
     */
    RoomRegionsList: RoomRegions;
};
