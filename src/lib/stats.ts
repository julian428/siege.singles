import stats from "r6s-stats-api";

export interface StatsType {
  rank: {
    url: string;
    name: string;
    mmr: string;
  };
  kd: string;
  wr: string;
  games: string;
  km: string;
  time: string;
}

export default async function getStats(
  name: string
): Promise<StatsType | null> {
  const rawStats = await stats.rank("pc", name);
  if (typeof rawStats === "string") return null;
  const parsedStats = {
    rank: {
      url: rawStats.rank_img,
      name: rawStats.rank,
      mmr: rawStats.mmr,
    },
    kd: rawStats.kd,
    wr: rawStats.win_,
    games: rawStats.matches,
    km: rawStats.kills_match,
    time: rawStats.time_played,
  };
  return parsedStats;
}
