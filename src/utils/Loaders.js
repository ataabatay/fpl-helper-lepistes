/* eslint-disable no-unused-vars */
import axios, { all } from 'axios';

// fetch data of all the players and more from the main endpoint
export async function getAllData() {
  try {
    const rawData = await axios.get('/api/api/bootstrap-static/');
    return rawData.data;
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
export async function getFDRsByWeek() {
  try {
    const fixtures = await getRawFixturesData();
    const allData = await getAllData();
    const teams = allData.teams;

    //  disecting the current gameweek id so we can use it
    let activeGameweek = null;
    if (allData.events.find((obj) => obj.is_current === true)) {
      activeGameweek = allData.events.find((obj) => obj.is_current === true).id;
    } else {
      activeGameweek = allData.events.find((obj) => obj.is_next === true).id;
    }
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
        homeAway: 'H',
        againstId: fixture.team_a,
        againstName: awayTeam.short_name,
      };
      const fdrForAwayTeam = {
        teamId: fixture.team_a,
        teamName: awayTeam.short_name,
        fdr: fixture.team_a_difficulty,
        homeAway: 'A',
        againstId: fixture.team_h,
        againstName: homeTeam.short_name,
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
    console.log(gameweekArray);
    return gameweekArray;
  } catch (error) {
    console.log(error);
  }
}

// uses the fixtures api call to create an array of teams with each element as an object of teams, their fdrs for all the gameweeks and wether they play home or away on that gameweek
export async function getFDRsByTeam() {
  try {
    const gameweekArray = await getFDRsByWeek();
    const teamFDRArray = [];
    gameweekArray.forEach((week, index) => {
      week.fdrs.forEach((fdr) => {
        const teamIndex = teamFDRArray.findIndex((obj) => obj['teamId'] === fdr['teamId']);
        if (teamIndex !== -1) {
          teamFDRArray[teamIndex].fdrs.push({
            [`gw-dif: ${index}`]: fdr.fdr,
            'home/away': fdr.homeAway,
            against: fdr.againstName,
          });
        } else {
          teamFDRArray.push({
            teamId: fdr.teamId,
            teamName: fdr.teamName,
            fdrs: [
              {
                [`gw-dif: ${index}`]: fdr.fdr,
                'home/away': fdr.homeAway,
                against: fdr.againstName,
              },
            ],
          });
        }
      });
    });
    console.log(teamFDRArray.sort((a, b) => a.teamId - b.teamId));
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
      const fdrs = fdrData.find((obj) => obj.teamId === team.id);

      if (team && position) {
        populatedPlayersData.push({
          id: player.id,
          firstName: player.first_name,
          lastName: player.second_name,
          displayName: player.web_name,
          teamId: team.id,
          team: team.short_name,
          teamLogo: `https://resources.premierleague.com/premierleague/badges/100/t${team.code}.png`,
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
          totalPoints: player.total_points,
          bps: player.bps,
          ICT: player.ict_index,
          fdrs: fdrs.fdrs,
        });
      }
    });
    console.log(populatedPlayersData);
    return populatedPlayersData;
  } catch (error) {
    console.log(error);
  }
}

// Complete login function
export async function LogUserIn() {
  console.log('Attempting user login');
}

// Create a fetchMyTeam function after logging in
