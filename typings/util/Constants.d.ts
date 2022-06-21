export const GroupTypes: any;
export const MMTypes: any;
export const RoomRegions: any;
export const ClubMemberRoles: any;
export const AdTypes: any;
/**
 * All available Match Status types.
 * * `HAS_MATCHES`
 * * `ONGOING`
 * * `PENDING`
 * * `COMPLETED`
 */
export type MatchStatus = string;
export const MatchStatus: any;
export const TeamNames: any;
export const COTDLeaderboardSortGroups: any;
/**
 * All available player groups.
 * * `nadeo` - All players from the Nadeo company
 * * `tmgl` - All players from the TMGL competition
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
 * Team names for the 3v3 match.
 * * `Red`
 * * `Blue`
 */
export type TeamName = string;
/**
 * All available COTD leaderboard sorting groups.
 * * `wins`
 * * `winstreak`
 * * `totalplayed`
 */
export type COTDLeaderboardSortGroup = string;
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
    /**
     * All available Match Status types.
     */
    MatchStatus: MatchStatus;
    /**
     * All available Team names for the 3v3 match.
     */
    TeamNames: TeamName;
    /**
     * All available COTD leaderboard sorting groups.
     */
    COTDLeaderboardSortGroups: COTDLeaderboardSortGroup;
};
