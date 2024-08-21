import { useQuery } from 'react-query';
import { useFDRsByTeam } from './useFDRsByTeam';

export const usePlayerObjects = () => {
  // function to create all the player objects that will be used for players display that includes all the useful data
  const {data: allData} = useQuery('allData');
  const fdrData = useFDRsByTeam();
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
        ownership: player.selected_by_percent,
        gamesStarted: player.starts,
        pointsPerStart: player.starts != 0 ? player.total_points / player.starts.toFixed(1) : 0,
        pointsPerMinute: (player.total_points / player.minutes).toFixed(1),
        pointsPerGame: player.points_per_game,
        goals: player.goals_scored,
        assists: player.assists,
        cleanSheets: player.clean_sheets,
        goalsConceded: player.goals_conceded,
        totalBonusPoints: player.bonus,
        totalPoints: player.total_points,
        bps: player.bps,
        ict: player.ict_index,
        fdrs: fdrs.fdrs,
        form: player.form,
        status: player.status,
      });
    }
  });
  return populatedPlayersData;
}