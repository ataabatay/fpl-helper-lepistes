export const difficultyColors = {
  1: '#006400',
  2: '#556B2F',
  3: '#DAA520',
  4: '#B22222',
  5: '#8B0000',
};

export const getTeamFixtures = (teamId, NUMBER_OF_FIXTURES_TO_SHOW, allFixturesByTeam, activeGameWeek) => {
  const teamFixtures = allFixturesByTeam.find((obj) => obj.teamId === teamId);
  return Array.from({ length: NUMBER_OF_FIXTURES_TO_SHOW }, (_, i) => {
    const fixture = teamFixtures?.fdrs.find((obj) => obj.gameweek === activeGameWeek + i);
    return {
      against: fixture?.against,
      homeAway: fixture?.homeAway,
      difficulty: fixture?.gwDif,
    };
  });
};

export const playerStatuses = {
  a: '',
  d: '⚠️',
  i: '🏥',
  u: '❌',
  s: '🟥',
}