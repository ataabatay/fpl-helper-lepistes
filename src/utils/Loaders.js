import axios from 'axios';

export async function getRawPlayersData() {
  try {
    const rawPlayers = await axios.get('/api/api/bootstrap-static/');
    return rawPlayers.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getRawFixturesData() {
  try {
    const rawFixtures = await axios.get('/api/api/fixtures/');
    return rawFixtures.data;
  } catch (error) {
    console.log(error);
  }
}

// create an array of objects with gameweek id, team/fdr object of team, fdr key value pairs
// for each match:
//   check if the event id exists in the array of gw objects
//     if yes:
//       add the new keyvalue pairs to team/fdr object
//         team_h: team_h_difficulty
//         team_a: team_a_difficulty
//     if no:
//       create a new gameweek object
//       repeat from line 28

export async function getFDRsByWeek() {
  try {
    const fixtures = await getRawFixturesData();
    const gameweekArray = [];
    fixtures.forEach((fixture) => {
      // find the gameweek object
      const index = gameweekArray.findIndex((obj) => obj['gameweek'] === fixture.event);

      // fdrs to add
      const fdrForHomeTeam = {
        teamId: fixture.team_h,
        fdr: fixture.team_h_difficulty,
        homeAway: 'H',
      };
      const fdrForAwayTeam = {
        teamId: fixture.team_a,
        fdr: fixture.team_a_difficulty,
        homeAway: 'A',
      };

      // if the gameweek object exists add the new 'team: fdr' keyvalue pair to the object
      if (index !== -1) {
        gameweekArray[index].fdrs.push(fdrForHomeTeam, fdrForAwayTeam);
      } else {
        gameweekArray.push({
          gameweek: fixture.event,
          fdrs: [fdrForHomeTeam, fdrForAwayTeam],
        });
      }
    });
    return gameweekArray;
  } catch (error) {
    console.log(error);
  }
}

export async function getFDRsByTeam() {
  try {
    const weeklyFDRS = await getFDRsByWeek();
    const teamFDRArray = [];
    weeklyFDRS.forEach((week, index) => {
      week.fdrs.forEach((fdr) => {
        const teamIndex = teamFDRArray.findIndex((obj) => obj['teamId'] === fdr['teamId']);
        if (teamIndex !== -1) {
          teamFDRArray[teamIndex].fdrs.push({
            [`gameweek: ${index}`]: fdr.fdr,
            'home/away': fdr.homeAway,
          });
        } else {
          teamFDRArray.push({
            teamId: fdr.teamId,
            fdrs: [
              {
                [`gameweek: ${index}`]: fdr.fdr,
                'home/away': fdr.homeAway,
              },
            ],
          });
        }
      });
    });
    console.log(teamFDRArray.sort((a, b) => a.teamId - b.teamId))
    return teamFDRArray.sort((a, b) => a.teamId - b.teamId)
  } catch (error) {
    console.log(error);
  }
}
