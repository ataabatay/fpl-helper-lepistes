/* eslint-disable no-unused-vars */
import axios, { all } from 'axios';

// fetch data of all the players and more from the main endpoint
async function getAllData() {
  try {
    const rawPlayers = await axios.get('/api/api/bootstrap-static/');
    return rawPlayers.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// fetch data of all the fixtures for each week to pull the FDRs(fixture difficulty ratings)
async function getRawFixturesData() {
  try {
    const rawFixtures = await axios.get('/api/api/fixtures/');
    return rawFixtures.data;
  } catch (error) {
    console.log(error);
  }
}

// uses the fixtures api call to create an array of gameweeks with each element as an object of teams, their fdrs for the week and wether they play home or away
async function getFDRsByWeek() {
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

// uses the fixtures api call to create an array of teams with each element as an object of teams, their fdrs for all the gameweeks and wether they play home or away on that gameweek
async function getFDRsByTeam() {
  try {
    const weeklyFDRS = await getFDRsByWeek();
    const teamFDRArray = [];
    weeklyFDRS.forEach((week, index) => {
      week.fdrs.forEach((fdr) => {
        const teamIndex = teamFDRArray.findIndex((obj) => obj['teamId'] === fdr['teamId']);
        if (teamIndex !== -1) {
          teamFDRArray[teamIndex].fdrs.push({
            [`gw-dif: ${index}`]: fdr.fdr,
            'home/away': fdr.homeAway,
          });
        } else {
          teamFDRArray.push({
            teamId: fdr.teamId,
            fdrs: [
              {
                [`gw-dif: ${index}`]: fdr.fdr,
                'home/away': fdr.homeAway,
              },
            ],
          });
        }
      });
    });
    return teamFDRArray.sort((a, b) => a.teamId - b.teamId);
  } catch (error) {
    console.log(error);
  }
}

// function to create all the player objects that will be used for players display that includes all the useful data
export async function createPlayerObjects() {
  try {
    const allData = await getAllData();
    const fdrData = await getFDRsByTeam();
    const rawPlayersData = allData.elements;
    const teams = allData.teams;
    const positions = allData.element_types;
    const populatedPlayersData = [];

    rawPlayersData.forEach((player) => {
      const team = teams.find((obj) => obj.id === player.team);
      const position = positions.find((obj) => obj.id === player.element_type);
      const fdrs = fdrData.find(obj => obj.teamId === team.id)

      if (team && position) {
        populatedPlayersData.push({
          id: player.id,
          name: player.web_name,
          teamId: team.id,
          team: team.short_name,
          positionId: position.id,
          position: position.singular_name_short,
          value: player.now_cost / 10,
          ownership: `${player.selected_by_percent}%`,
          gamesStarts: player.starts,
          pointsPerStart: player.total_points / player.starts,
          pointsPerMinute: (player.total_points / player.minutes).toFixed(4),
          goals: player.goals_scored,
          assists: player.assists,
          cleanSheets: player.clean_sheets,
          goalsConceded: player.goals_conceded,
          totalBonusPoints: player.bonus,
          bps: player.bps,
          ICT: player.ict_index,
          fdrs: fdrs.fdrs,
        });
      }
    });
    console.log(populatedPlayersData)
    return populatedPlayersData
  } catch (error) {
    console.log(error);
  }
}
