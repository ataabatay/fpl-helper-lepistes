import { useFDRsBYWeek } from './useFDRsByWeek';

export const useFDRsByTeam = () => {
  // uses the fixtures api call to create an array of teams with each element as an object of teams, their fdrs for all the gameweeks and wether they play home or away on that gameweek

  const gameweekArray = useFDRsBYWeek();
  const teamFDRArray = [];
  gameweekArray.forEach((week) => {
    week.fdrs.forEach((fdr) => {
      const teamIndex = teamFDRArray.findIndex((obj) => obj['teamId'] === fdr['teamId']);
      if (teamIndex !== -1) {
        teamFDRArray[teamIndex].fdrs.push({
          gameweek: week.gameweek,
          gwDif: fdr.fdr,
          homeAway: fdr.homeAway,
          against: fdr.againstName,
          goalsFor: fdr.goalsFor,
          goalsAgainst: fdr.goalsAgainst,
        });
        // increment the total goals for and against
        teamFDRArray[teamIndex].totalGoalsFor += fdr.goalsFor;
        teamFDRArray[teamIndex].totalGoalsAgainst += fdr.goalsAgainst;
      } else {
        teamFDRArray.push({
          teamId: fdr.teamId,
          teamName: fdr.teamName,
          fdrs: [
            {
              gameweek: week.gameweek,
              gwDif: fdr.fdr,
              homeAway: fdr.homeAway,
              against: fdr.againstName,
              goalsFor: fdr.goalsFor,
              goalsAgainst: fdr.goalsAgainst,
            },
          ],
          totalGoalsFor: fdr.goalsFor,
          totalGoalsAgainst: fdr.goalsAgainst,
        });
      }
    });
  });
  return teamFDRArray.sort((a, b) => a.teamId - b.teamId);
}