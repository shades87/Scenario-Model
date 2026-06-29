import { env } from '$env/dynamic/private';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// ── Types ──────────────────────────────────────────────────────────────────
export type Outcome = 'A' | 'D' | 'B';

export interface Match {
  id: string;
  group: string;       // group letter for group stage; bracket label (e.g. "R32") for knockouts
  matchday: number;    // 1-3 for group stage; knockout round order otherwise
  round: 'group' | 'r32' | 'r16' | 'qf' | 'sf' | 'third' | 'final';
  date: string;
  teamA: string | null; // null until the slot is filled in (e.g. pending 3rd-place draw)
  teamB: string | null;
  venue: string;
  slotA?: string;       // optional human label for an undetermined slot, e.g. "Winner Group A"
  slotB?: string;       // e.g. "3rd C/E/F/H/I"
}

export interface MatchPrediction {
  matchId: string;
  winA: number;
  draw: number;
  winB: number;
  ratingA: number; // snapshot of ratings used at prediction time
  ratingB: number;
}

// ── All 48 group stage matches (source of truth, in chronological order) ──
const ALL_MATCHES: Match[] = [
  // Group A
  { id: 'A1', group: 'A', matchday: 1, round: 'group', date: 'Jun 11', teamA: 'Mexico',        teamB: 'South Africa',  venue: 'Mexico City' },
  { id: 'A2', group: 'A', matchday: 1, round: 'group', date: 'Jun 11', teamA: 'South Korea',   teamB: 'Czechia',        venue: 'Guadalajara' },
  { id: 'A3', group: 'A', matchday: 2, round: 'group', date: 'Jun 15', teamA: 'Mexico',        teamB: 'South Korea',    venue: 'Guadalajara' },
  { id: 'A4', group: 'A', matchday: 2, round: 'group', date: 'Jun 15', teamA: 'South Africa',  teamB: 'Czechia',        venue: 'Kansas City' },
  { id: 'A5', group: 'A', matchday: 3, round: 'group', date: 'Jun 19', teamA: 'Mexico',        teamB: 'Czechia',        venue: 'Dallas' },
  { id: 'A6', group: 'A', matchday: 3, round: 'group', date: 'Jun 19', teamA: 'South Africa',  teamB: 'South Korea',    venue: 'Dallas' },
  // Group B
  { id: 'B1', group: 'B', matchday: 1, round: 'group', date: 'Jun 12', teamA: 'Canada',        teamB: 'Bosnia & Herz.', venue: 'Toronto' },
  { id: 'B2', group: 'B', matchday: 1, round: 'group', date: 'Jun 12', teamA: 'Qatar',         teamB: 'Switzerland',    venue: 'San Francisco' },
  { id: 'B3', group: 'B', matchday: 2, round: 'group', date: 'Jun 16', teamA: 'Canada',        teamB: 'Qatar',          venue: 'Seattle' },
  { id: 'B4', group: 'B', matchday: 2, round: 'group', date: 'Jun 16', teamA: 'Switzerland',   teamB: 'Bosnia & Herz.', venue: 'Philadelphia' },
  { id: 'B5', group: 'B', matchday: 3, round: 'group', date: 'Jun 20', teamA: 'Canada',        teamB: 'Switzerland',    venue: 'Toronto' },
  { id: 'B6', group: 'B', matchday: 3, round: 'group', date: 'Jun 20', teamA: 'Qatar',         teamB: 'Bosnia & Herz.', venue: 'Houston' },
  // Group C
  { id: 'C1', group: 'C', matchday: 1, round: 'group', date: 'Jun 13', teamA: 'Brazil',        teamB: 'Morocco',        venue: 'New York/NJ' },
  { id: 'C2', group: 'C', matchday: 1, round: 'group', date: 'Jun 13', teamA: 'Haiti',         teamB: 'Scotland',        venue: 'Boston' },
  { id: 'C3', group: 'C', matchday: 2, round: 'group', date: 'Jun 17', teamA: 'Brazil',        teamB: 'Haiti',           venue: 'Miami' },
  { id: 'C4', group: 'C', matchday: 2, round: 'group', date: 'Jun 17', teamA: 'Morocco',       teamB: 'Scotland',        venue: 'Atlanta' },
  { id: 'C5', group: 'C', matchday: 3, round: 'group', date: 'Jun 21', teamA: 'Brazil',        teamB: 'Scotland',        venue: 'Houston' },
  { id: 'C6', group: 'C', matchday: 3, round: 'group', date: 'Jun 21', teamA: 'Morocco',       teamB: 'Haiti',           venue: 'Dallas' },
  // Group D
  { id: 'D1', group: 'D', matchday: 1, round: 'group', date: 'Jun 12', teamA: 'United States', teamB: 'Paraguay',       venue: 'Los Angeles' },
  { id: 'D2', group: 'D', matchday: 1, round: 'group', date: 'Jun 12', teamA: 'Australia',     teamB: 'Türkiye',         venue: 'Vancouver' },
  { id: 'D3', group: 'D', matchday: 2, round: 'group', date: 'Jun 17', teamA: 'United States', teamB: 'Australia',      venue: 'Seattle' },
  { id: 'D4', group: 'D', matchday: 2, round: 'group', date: 'Jun 17', teamA: 'Türkiye',       teamB: 'Paraguay',        venue: 'Miami' },
  { id: 'D5', group: 'D', matchday: 3, round: 'group', date: 'Jun 21', teamA: 'United States', teamB: 'Türkiye',         venue: 'Los Angeles' },
  { id: 'D6', group: 'D', matchday: 3, round: 'group', date: 'Jun 21', teamA: 'Australia',     teamB: 'Paraguay',        venue: 'San Francisco' },
  // Group E
  { id: 'E1', group: 'E', matchday: 1, round: 'group', date: 'Jun 14', teamA: 'Germany',       teamB: 'Curaçao',         venue: 'Philadelphia' },
  { id: 'E2', group: 'E', matchday: 1, round: 'group', date: 'Jun 14', teamA: 'Ivory Coast',   teamB: 'Ecuador',         venue: 'Houston' },
  { id: 'E3', group: 'E', matchday: 2, round: 'group', date: 'Jun 18', teamA: 'Germany',       teamB: 'Ivory Coast',    venue: 'Atlanta' },
  { id: 'E4', group: 'E', matchday: 2, round: 'group', date: 'Jun 18', teamA: 'Ecuador',       teamB: 'Curaçao',         venue: 'Kansas City' },
  { id: 'E5', group: 'E', matchday: 3, round: 'group', date: 'Jun 22', teamA: 'Germany',       teamB: 'Ecuador',         venue: 'Dallas' },
  { id: 'E6', group: 'E', matchday: 3, round: 'group', date: 'Jun 22', teamA: 'Ivory Coast',   teamB: 'Curaçao',         venue: 'Los Angeles' },
  // Group F
  { id: 'F1', group: 'F', matchday: 1, round: 'group', date: 'Jun 14', teamA: 'Netherlands',   teamB: 'Japan',           venue: 'Boston' },
  { id: 'F2', group: 'F', matchday: 1, round: 'group', date: 'Jun 14', teamA: 'Sweden',        teamB: 'Tunisia',         venue: 'New York/NJ' },
  { id: 'F3', group: 'F', matchday: 2, round: 'group', date: 'Jun 18', teamA: 'Netherlands',   teamB: 'Sweden',          venue: 'Kansas City' },
  { id: 'F4', group: 'F', matchday: 2, round: 'group', date: 'Jun 18', teamA: 'Japan',         teamB: 'Tunisia',         venue: 'Seattle' },
  { id: 'F5', group: 'F', matchday: 3, round: 'group', date: 'Jun 22', teamA: 'Netherlands',   teamB: 'Tunisia',         venue: 'Miami' },
  { id: 'F6', group: 'F', matchday: 3, round: 'group', date: 'Jun 22', teamA: 'Japan',         teamB: 'Sweden',          venue: 'San Francisco' },
  // Group G
  { id: 'G1', group: 'G', matchday: 1, round: 'group', date: 'Jun 15', teamA: 'Belgium',       teamB: 'Egypt',           venue: 'Seattle' },
  { id: 'G2', group: 'G', matchday: 1, round: 'group', date: 'Jun 15', teamA: 'Iran',          teamB: 'New Zealand',     venue: 'Los Angeles' },
  { id: 'G3', group: 'G', matchday: 2, round: 'group', date: 'Jun 19', teamA: 'Belgium',       teamB: 'Iran',            venue: 'New York/NJ' },
  { id: 'G4', group: 'G', matchday: 2, round: 'group', date: 'Jun 19', teamA: 'Egypt',         teamB: 'New Zealand',     venue: 'Toronto' },
  { id: 'G5', group: 'G', matchday: 3, round: 'group', date: 'Jun 23', teamA: 'Belgium',       teamB: 'New Zealand',    venue: 'Atlanta' },
  { id: 'G6', group: 'G', matchday: 3, round: 'group', date: 'Jun 23', teamA: 'Egypt',         teamB: 'Iran',            venue: 'Houston' },
  // Group H
  { id: 'H1', group: 'H', matchday: 1, round: 'group', date: 'Jun 15', teamA: 'Spain',         teamB: 'Cape Verde',     venue: 'Atlanta' },
  { id: 'H2', group: 'H', matchday: 1, round: 'group', date: 'Jun 15', teamA: 'Saudi Arabia',  teamB: 'Uruguay',        venue: 'Miami' },
  { id: 'H3', group: 'H', matchday: 2, round: 'group', date: 'Jun 19', teamA: 'Spain',         teamB: 'Saudi Arabia',   venue: 'Dallas' },
  { id: 'H4', group: 'H', matchday: 2, round: 'group', date: 'Jun 19', teamA: 'Uruguay',       teamB: 'Cape Verde',     venue: 'Philadelphia' },
  { id: 'H5', group: 'H', matchday: 3, round: 'group', date: 'Jun 23', teamA: 'Spain',         teamB: 'Uruguay',        venue: 'Los Angeles' },
  { id: 'H6', group: 'H', matchday: 3, round: 'group', date: 'Jun 23', teamA: 'Saudi Arabia',  teamB: 'Cape Verde',     venue: 'San Francisco' },
  // Group I
  { id: 'I1', group: 'I', matchday: 1, round: 'group', date: 'Jun 16', teamA: 'France',        teamB: 'Senegal',        venue: 'New York/NJ' },
  { id: 'I2', group: 'I', matchday: 1, round: 'group', date: 'Jun 16', teamA: 'Iraq',          teamB: 'Norway',          venue: 'Boston' },
  { id: 'I3', group: 'I', matchday: 2, round: 'group', date: 'Jun 20', teamA: 'France',        teamB: 'Iraq',            venue: 'Atlanta' },
  { id: 'I4', group: 'I', matchday: 2, round: 'group', date: 'Jun 20', teamA: 'Senegal',       teamB: 'Norway',          venue: 'Kansas City' },
  { id: 'I5', group: 'I', matchday: 3, round: 'group', date: 'Jun 24', teamA: 'France',        teamB: 'Norway',          venue: 'Seattle' },
  { id: 'I6', group: 'I', matchday: 3, round: 'group', date: 'Jun 24', teamA: 'Senegal',       teamB: 'Iraq',            venue: 'Houston' },
  // Group J
  { id: 'J1', group: 'J', matchday: 1, round: 'group', date: 'Jun 16', teamA: 'Argentina',     teamB: 'Algeria',        venue: 'Kansas City' },
  { id: 'J2', group: 'J', matchday: 1, round: 'group', date: 'Jun 16', teamA: 'Austria',       teamB: 'Jordan',          venue: 'San Francisco' },
  { id: 'J3', group: 'J', matchday: 2, round: 'group', date: 'Jun 20', teamA: 'Argentina',     teamB: 'Austria',        venue: 'Miami' },
  { id: 'J4', group: 'J', matchday: 2, round: 'group', date: 'Jun 20', teamA: 'Algeria',       teamB: 'Jordan',          venue: 'Philadelphia' },
  { id: 'J5', group: 'J', matchday: 3, round: 'group', date: 'Jun 24', teamA: 'Argentina',     teamB: 'Jordan',          venue: 'Dallas' },
  { id: 'J6', group: 'J', matchday: 3, round: 'group', date: 'Jun 24', teamA: 'Algeria',       teamB: 'Austria',         venue: 'Toronto' },
  // Group K
  { id: 'K1', group: 'K', matchday: 1, round: 'group', date: 'Jun 17', teamA: 'Portugal',      teamB: 'DR Congo',       venue: 'Houston' },
  { id: 'K2', group: 'K', matchday: 1, round: 'group', date: 'Jun 17', teamA: 'Uzbekistan',    teamB: 'Colombia',       venue: 'Mexico City' },
  { id: 'K3', group: 'K', matchday: 2, round: 'group', date: 'Jun 21', teamA: 'Portugal',      teamB: 'Uzbekistan',     venue: 'Boston' },
  { id: 'K4', group: 'K', matchday: 2, round: 'group', date: 'Jun 21', teamA: 'DR Congo',      teamB: 'Colombia',       venue: 'Seattle' },
  { id: 'K5', group: 'K', matchday: 3, round: 'group', date: 'Jun 25', teamA: 'Portugal',      teamB: 'Colombia',       venue: 'New York/NJ' },
  { id: 'K6', group: 'K', matchday: 3, round: 'group', date: 'Jun 25', teamA: 'Uzbekistan',    teamB: 'DR Congo',       venue: 'Philadelphia' },
  // Group L
  { id: 'L1', group: 'L', matchday: 1, round: 'group', date: 'Jun 17', teamA: 'England',       teamB: 'Croatia',        venue: 'Dallas' },
  { id: 'L2', group: 'L', matchday: 1, round: 'group', date: 'Jun 17', teamA: 'Ghana',         teamB: 'Panama',          venue: 'Toronto' },
  { id: 'L3', group: 'L', matchday: 2, round: 'group', date: 'Jun 21', teamA: 'England',       teamB: 'Ghana',           venue: 'Atlanta' },
  { id: 'L4', group: 'L', matchday: 2, round: 'group', date: 'Jun 21', teamA: 'Croatia',       teamB: 'Panama',          venue: 'Boston' },
  { id: 'L5', group: 'L', matchday: 3, round: 'group', date: 'Jun 25', teamA: 'England',       teamB: 'Panama',          venue: 'Miami' },
  { id: 'L6', group: 'L', matchday: 3, round: 'group', date: 'Jun 25', teamA: 'Croatia',       teamB: 'Ghana',           venue: 'New York/NJ' },

  // ── Round of 32 ────────────────────────────────────────────────────────────
  // Fixed slots per FIFA's official bracket (Match numbers M73-M88).
  // teamA/teamB start as null — fill in real team names here once FIFA
  // confirms the bracket after the group stage ends (~June 27-28).
  // slotA/slotB are just human-readable labels shown until then.
  { id: 'R32_M73', group: 'R32', matchday: 1, round: 'r32', date: 'Jun 28', teamA: 'South Africa', teamB: 'Canada', venue: 'Los Angeles Stadium', slotA: '2A', slotB: '2B' },
  { id: 'R32_M74', group: 'R32', matchday: 1, round: 'r32', date: 'Jun 29', teamA: 'Germany', teamB: 'Paraguay', venue: 'Boston Stadium', slotA: '1E', slotB: '3rd A/B/C/D/F' },
  { id: 'R32_M75', group: 'R32', matchday: 1, round: 'r32', date: 'Jun 29', teamA: "Netherlands", teamB: 'Morocco', venue: 'Estadio Monterrey', slotA: '1F', slotB: '2C' },
  { id: 'R32_M76', group: 'R32', matchday: 1, round: 'r32', date: 'Jun 29', teamA: 'Brazil', teamB: 'Japan', venue: 'Houston Stadium', slotA: '1C', slotB: '2F' },
  { id: 'R32_M77', group: 'R32', matchday: 1, round: 'r32', date: 'Jun 30', teamA: 'France', teamB: 'Sweden', venue: 'New York New Jersey Stadium', slotA: '1I', slotB: '3rd C/D/F/G/H' },
  { id: 'R32_M78', group: 'R32', matchday: 1, round: 'r32', date: 'Jun 30', teamA: 'Ivory Coast', teamB: 'Norway', venue: 'Dallas Stadium', slotA: '2E', slotB: '2I' },
  { id: 'R32_M79', group: 'R32', matchday: 1, round: 'r32', date: 'Jun 30', teamA: 'Mexico', teamB: 'Ecuador', venue: 'Mexico City Stadium', slotA: '1A', slotB: '3rd C/E/F/H/I' },
  { id: 'R32_M80', group: 'R32', matchday: 1, round: 'r32', date: 'Jul 01', teamA: 'England', teamB: 'DR Congo', venue: 'Atlanta Stadium', slotA: '1L', slotB: '3rd E/H/I/J/K' },
  { id: 'R32_M81', group: 'R32', matchday: 1, round: 'r32', date: 'Jul 01', teamA: 'United States', teamB: 'Bosnia', venue: 'San Francisco Bay Area Stadium', slotA: '1D', slotB: '3rd B/E/F/I/J' },
  { id: 'R32_M82', group: 'R32', matchday: 1, round: 'r32', date: 'Jul 01', teamA: "Belgium", teamB: 'Senegal', venue: 'Seattle Stadium', slotA: '1G', slotB: '3rd A/E/H/I/J' },
  { id: 'R32_M83', group: 'R32', matchday: 1, round: 'r32', date: 'Jul 02', teamA: 'Portugal', teamB: 'Croatia', venue: 'Toronto Stadium', slotA: '2K', slotB: '2L' },
  { id: 'R32_M84', group: 'R32', matchday: 1, round: 'r32', date: 'Jul 02', teamA: 'Spain', teamB: 'Austria', venue: 'Los Angeles Stadium', slotA: '1H', slotB: '2J' },
  { id: 'R32_M85', group: 'R32', matchday: 1, round: 'r32', date: 'Jul 02', teamA: 'Switzerland', teamB: 'Algeria', venue: 'BC Place Vancouver', slotA: '1B', slotB: '3rd E/F/G/I/J' },
  { id: 'R32_M86', group: 'R32', matchday: 1, round: 'r32', date: 'Jul 03', teamA: 'Argentina', teamB: 'Cabo Verde', venue: 'Miami Stadium', slotA: '1J', slotB: '2H' },
  { id: 'R32_M87', group: 'R32', matchday: 1, round: 'r32', date: 'Jul 03', teamA: 'Colombia', teamB: 'Ghana', venue: 'Kansas City Stadium', slotA: '1K', slotB: '3rd D/E/I/J/L' },
  { id: 'R32_M88', group: 'R32', matchday: 1, round: 'r32', date: 'Jul 03', teamA: 'Australia', teamB: 'Egypt', venue: 'Dallas Stadium', slotA: '2D', slotB: '2G' },

    // ── Round of 16 ────────────────────────────────────────────────────────────
  // Each R16 match pairs the winners of two specific R32 matches.
  // Fill in teamA/teamB once the R32 results are known.
  { id: 'R16_M89', group: 'R16', matchday: 1, round: 'r16', date: 'Jul 04', teamA: null, teamB: null, venue: 'TBD', slotA: 'Winner M74', slotB: 'Winner M73' },
  { id: 'R16_M90', group: 'R16', matchday: 1, round: 'r16', date: 'Jul 04', teamA: null, teamB: null, venue: 'TBD', slotA: 'Winner M77', slotB: 'Winner M76' },
  { id: 'R16_M91', group: 'R16', matchday: 1, round: 'r16', date: 'Jul 05', teamA: null, teamB: null, venue: 'TBD', slotA: 'Winner M78', slotB: 'Winner M75' },
  { id: 'R16_M92', group: 'R16', matchday: 1, round: 'r16', date: 'Jul 05', teamA: null, teamB: null, venue: 'TBD', slotA: 'Winner M80', slotB: 'Winner M79' },
  { id: 'R16_M93', group: 'R16', matchday: 1, round: 'r16', date: 'Jul 06', teamA: null, teamB: null, venue: 'TBD', slotA: 'Winner M82', slotB: 'Winner M81' },
  { id: 'R16_M94', group: 'R16', matchday: 1, round: 'r16', date: 'Jul 06', teamA: null, teamB: null, venue: 'TBD', slotA: 'Winner M83', slotB: 'Winner M84' },
  { id: 'R16_M95', group: 'R16', matchday: 1, round: 'r16', date: 'Jul 07', teamA: null, teamB: null, venue: 'TBD', slotA: 'Winner M86', slotB: 'Winner M85' },
  { id: 'R16_M96', group: 'R16', matchday: 1, round: 'r16', date: 'Jul 07', teamA: null, teamB: null, venue: 'TBD', slotA: 'Winner M88', slotB: 'Winner M87' },
 
  // ── Quarter-Finals ─────────────────────────────────────────────────────────
  { id: 'QF_M97', group: 'QF', matchday: 1, round: 'qf', date: 'Jul 09', teamA: null, teamB: null, venue: 'TBD', slotA: 'Winner M90', slotB: 'Winner M89' },
  { id: 'QF_M98', group: 'QF', matchday: 1, round: 'qf', date: 'Jul 10', teamA: null, teamB: null, venue: 'TBD', slotA: 'Winner M92', slotB: 'Winner M91' },
  { id: 'QF_M99', group: 'QF', matchday: 1, round: 'qf', date: 'Jul 11', teamA: null, teamB: null, venue: 'TBD', slotA: 'Winner M94', slotB: 'Winner M93' },
  { id: 'QF_M100', group: 'QF', matchday: 1, round: 'qf', date: 'Jul 12', teamA: null, teamB: null, venue: 'TBD', slotA: 'Winner M96', slotB: 'Winner M95' },
 
  // ── Semi-Finals ────────────────────────────────────────────────────────────
  { id: 'SF_M101', group: 'SF', matchday: 1, round: 'sf', date: 'Jul 15', teamA: null, teamB: null, venue: 'TBD', slotA: 'Winner M98', slotB: 'Winner M97' },
  { id: 'SF_M102', group: 'SF', matchday: 1, round: 'sf', date: 'Jul 16', teamA: null, teamB: null, venue: 'TBD', slotA: 'Winner M100', slotB: 'Winner M99' },

  // -- 3rd Place
  { id: 'FINAL_M103', group: '3rd', matchday: 1, round: 'third', date: 'Jul 19', teamA: null, teamB: null, venue: 'TBD', slotA: 'Winner M102', slotB: 'Winner M101' },


  // ── Final ──────────────────────────────────────────────────────────────────
  { id: 'FINAL_M104', group: 'FINAL', matchday: 1, round: 'final', date: 'Jul 19', teamA: null, teamB: null, venue: 'TBD', slotA: 'Winner M102', slotB: 'Winner M101' },

];

// ── Base FIFA ratings (April 2026) ─────────────────────────────────────────
const BASE_RATINGS: Record<string, number> = {
  'France': 1877, 'Spain': 1876, 'Argentina': 1875, 'England': 1826,
  'Portugal': 1764, 'Brazil': 1761, 'Netherlands': 1758, 'Morocco': 1756,
  'Belgium': 1735, 'Germany': 1730, 'Croatia': 1717, 'Colombia': 1693,
  'Senegal': 1689, 'Mexico': 1681, 'United States': 1673, 'Uruguay': 1673,
  'Japan': 1660, 'Switzerland': 1649, 'South Korea': 1621, 'Ecuador': 1610,
  'Austria': 1605, 'Türkiye': 1598, 'Australia': 1585, 'Canada': 1575,
  'Norway': 1558, 'Algeria': 1540, 'Egypt': 1530, 'Scotland': 1520,
  'Paraguay': 1510, 'Tunisia': 1505, 'Ivory Coast': 1502, 'Sweden': 1498,
  'Czechia': 1490, 'Bosnia & Herz.': 1480, 'Uzbekistan': 1460, 'Qatar': 1440,
  'Saudi Arabia': 1430, 'South Africa': 1420, 'Jordan': 1400,
  'Cape Verde': 1390, 'Ghana': 1380, 'Iraq': 1380, 'DR Congo': 1370,
  'Panama': 1350, 'Curaçao': 1340, 'New Zealand': 1310, 'Haiti': 1300,
};

const HOST_BONUS: Record<string, number> = {
  'United States': 40, 'Mexico': 50, 'Canada': 30,
};

// ── Elo constants ──────────────────────────────────────────────────────────
// K=32 for World Cup matches; draw is scored as 0.5
const ELO_K = 32;

function expectedScore(rA: number, rB: number): number {
  return 1 / (1 + Math.pow(10, (rB - rA) / 400));
}

function calcPrediction(rA: number, rB: number): { winA: number; draw: number; winB: number } {
    // Edge case: identical ratings mean winA === winB after rounding,
  // which lets the draw silently win on remainder math even though
  // it isn't really "more likely" — show an honest even 3-way split instead.
  if (rA === rB) {
    return { winA: 33, draw: 34, winB: 33 };
  }

  const expA = expectedScore(rA, rB);
  const expB = 1 - expA;
  const drawBase = 0.25 * Math.exp(-4 * Math.pow(expA - 0.5, 2));
  const winA = expA * (1 - drawBase * 0.5);
  const winB = expB * (1 - drawBase * 0.5);
  const draw = 1 - winA - winB;
  const total = winA + draw + winB;
  return {
    winA: Math.round((winA / total) * 100),
    draw: Math.round((draw / total) * 100),
    winB: Math.round((winB / total) * 100),
  };
}

// Actual score for Elo update: win=1, draw=0.5, loss=0
function eloActualScore(outcome: Outcome): { scoreA: number; scoreB: number } {
  if (outcome === 'A') return { scoreA: 1,   scoreB: 0   };
  if (outcome === 'D') return { scoreA: 0.5, scoreB: 0.5 };
  return                      { scoreA: 0,   scoreB: 1   };
}

function updateElo(
  ratings: Record<string, number>,
  teamA: string,
  teamB: string,
  outcome: Outcome
): void {
  const rA = ratings[teamA] ?? 1400;
  const rB = ratings[teamB] ?? 1400;
  const expA = expectedScore(rA, rB);
  const { scoreA, scoreB } = eloActualScore(outcome);
  ratings[teamA] = Math.round(rA + ELO_K * (scoreA - expA));
  ratings[teamB] = Math.round(rB + ELO_K * (scoreB - (1 - expA)));
}

// ── File parsing ───────────────────────────────────────────────────────────
function parseResults(raw: string, isJSON: boolean): Record<string, Outcome> {
  const out: Record<string, Outcome> = {};
  if (isJSON) {
    const rows: { match_id: string; actual_outcome: string }[] = JSON.parse(raw);
    for (const row of rows) {
      const o = row.actual_outcome?.toUpperCase();
      if (['A', 'D', 'B'].includes(o)) out[row.match_id] = o as Outcome;
    }
  } else {
    const lines = raw.trim().split('\n').slice(1);
    for (const line of lines) {
      const [match_id, actual_outcome] = line.split(',').map(s => s.trim());
      const o = actual_outcome?.toUpperCase();
      if (match_id && ['A', 'D', 'B'].includes(o)) out[match_id] = o as Outcome;
    }
  }
  return out;
}

// ── Main load ──────────────────────────────────────────────────────────────
export const load = async () => {
  // Load raw results from disk
  let uploadedResults: Record<string, Outcome> = {};
  const WC_DATA_ROOT = env.WC_DATA_ROOT;

  if (WC_DATA_ROOT) {
    const jsonPath = join(WC_DATA_ROOT, 'wc.json');
    const csvPath  = join(WC_DATA_ROOT, 'wc2026_results.csv');
    try {
      if (existsSync(jsonPath)) {
        uploadedResults = parseResults(readFileSync(jsonPath, 'utf-8'), true);
      } else if (existsSync(csvPath)) {
        uploadedResults = parseResults(readFileSync(csvPath, 'utf-8'), false);
      }
    } catch (err) {
      console.error('[WC Predictor] Failed to load results file:', err);
    }
  }

  // Walk matches in order, building frozen predictions and updating Elo as we go
  const liveRatings: Record<string, number> = {
    ...BASE_RATINGS,
    // Apply host bonuses into the starting ratings
    ...Object.fromEntries(
      Object.entries(HOST_BONUS).map(([team, bonus]) => [
        team,
        (BASE_RATINGS[team] ?? 1400) + bonus,
      ])
    ),
  };

  const predictions: Record<string, MatchPrediction> = {};

  for (const match of ALL_MATCHES) {
    // Skip matches where teams aren't confirmed yet (e.g. unfilled R32 slots)
    if (!match.teamA || !match.teamB) continue;

    const rA = liveRatings[match.teamA] ?? 1400;
    const rB = liveRatings[match.teamB] ?? 1400;

    // Freeze prediction using ratings as-of right now (before this result)
    const { winA, draw, winB } = calcPrediction(rA, rB);
    predictions[match.id] = { matchId: match.id, winA, draw, winB, ratingA: rA, ratingB: rB };

    // If the result is known, update live Elo ratings for subsequent matches
    const result = uploadedResults[match.id];
    if (result) {
      updateElo(liveRatings, match.teamA, match.teamB, result);
    }
  }

  return {
    matches: ALL_MATCHES,
    predictions,
    results: uploadedResults,
  };
};