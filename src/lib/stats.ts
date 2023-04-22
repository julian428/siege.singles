import stats from "r6s-stats-api";

export default async function getStats(name: string) {
  const playerStats = await stats.rank("pc", name);
  return playerStats;
}
