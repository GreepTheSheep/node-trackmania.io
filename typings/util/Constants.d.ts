export var GroupTypes: any;
export var MMTypes: any;
export var RoomRegions: any;
export var ClubMemberRoles: any;
export var AdTypes: any;
/**
 * All available Match Status types.
 * * `PENDING`
 * * `COMPLETED`
 */
export type MatchStatus = string;
export var MatchStatus: any;
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
export type RoomRegion = string;
/**
 * All available Club Member roles.
 * * `Creator`
 * * `Admin`
 * * `Content_Creator`
 * * `Member`
 */
export type ClubMemberRole = string;
/**
 * All available Maniapub Types.
 * * `nadeo` - Nadeo official Maniapubs
 * * `ugc` - (User Generated Content) - Community Maniapubs
 */
export type AdType = string;
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
    RoomRegions: RoomRegion;
    /**
     * All available Club Member roles.
     */
    ClubMemberRoles: ClubMemberRole;
    /**
     * All available Maniapub Types.
     */
    AdTypes: AdType;
};
