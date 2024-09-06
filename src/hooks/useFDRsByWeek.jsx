import { useQuery } from 'react-query';

export const useFDRsBYWeek = () => {
    // uses the fixtures api call to create an array of gameweeks with each element as an object of teams, their fdrs for the week and wether they play home or away
    const {data: fixtures} = useQuery('rawFixtures');
    const {data: allData} = useQuery('allData');
    const teams = allData.teams;

    //  disecting the current gameweek id so we can use it
    let activeGameweek = allData.events.find((obj) => obj.is_next === true).id
    const gameweekArray = [];

    fixtures.forEach((fixture) => {
      // find the gameweek object
      const index = gameweekArray.findIndex((obj) => obj['gameweek'] === fixture.event);
      // home team and away team
      const homeTeam = teams.find((obj) => obj.id === fixture.team_h);
      const awayTeam = teams.find((obj) => obj.id === fixture.team_a);

      // fdrs to add
      const fdrForHomeTeam = {
        teamId: fixture.team_h,
        teamName: homeTeam.short_name,
        fdr: fixture.team_h_difficulty,
        goalsFor: fixture.team_h_score,
        goalsAgainst: fixture.team_a_score,
        homeAway: 'H',
        againstId: fixture.team_a,
        againstName: awayTeam.short_name,
        kickOffTime: fixture.kickoff_time,
        againstTeamCode: awayTeam.code,
        homeTeamCode: homeTeam.code
      };
      const fdrForAwayTeam = {
        teamId: fixture.team_a,
        teamName: awayTeam.short_name,
        fdr: fixture.team_a_difficulty,
        goalsFor: fixture.team_a_score,
        goalsAgainst: fixture.team_h_score,
        homeAway: 'A',
        againstId: fixture.team_h,
        againstName: homeTeam.short_name,
        kickOffTime: fixture.kickoff_time,
        againstTeamCode: awayTeam.code,
        homeTeamCode: homeTeam.code
      };

      // if the gameweek object exists add the new 'team: fdr' keyvalue pair to the object
      if (index !== -1) {
        gameweekArray[index].fdrs.push(fdrForHomeTeam, fdrForAwayTeam);
      } else {
        gameweekArray.push({
          gameweek: fixture.event,
          activeGameWeek: activeGameweek === fixture.event,
          fdrs: [fdrForHomeTeam, fdrForAwayTeam],
        });
      }
    });
    return gameweekArray;
}