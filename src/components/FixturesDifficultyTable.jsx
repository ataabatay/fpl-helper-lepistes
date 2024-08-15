/* eslint-disable react/prop-types */
import { useQuery } from 'react-query';
import { getAllData, getFDRsByTeam, getFDRsByWeek } from '../utils/Loaders';
import { difficultyColors, getTeamFixtures } from '../utils/helpers';

const FDRTableTeamRow = ({ idx, team, totalGoalsFor, totalGoalsAgainst, fixtures }) => {
  return (
    <>
      <tr key={idx} className="flex text-center items-center pl-3 border-b gap-1 border-[#4a4a4a] hover:bg-[#4a4a4a]">
        <td className="flex justify-center items-center min-w-6">{idx + 1}</td>
        <td className="min-w-6">
          <img
            className="size-5"
            src={`${`https://resources.premierleague.com/premierleague/badges/100/t${team.code}.png`}`}
            alt=""
          />
        </td>
        <td className="flex-grow text-left min-w-28 text-nowrap">{team.name}</td>
        <td className="min-w-6">{team.played}</td>
        <td className="min-w-6">{team.win}</td>
        <td className="min-w-6">{team.loss}</td>
        <td className="min-w-6">{team.draw}</td>
        <td className="min-w-6">{totalGoalsFor}</td>
        <td className="min-w-6">{totalGoalsAgainst}</td>
        <td className="min-w-6 font-bold">{team.points}</td>
        {fixtures.map((fixture, index) => (
          <td
            key={index}
            className="text-xs text-nowrap flex items-center justify-center min-w-20 py-3"
            style={{ backgroundColor: difficultyColors[fixture.difficulty] }}
          >
            {`${fixture.against} (${fixture.homeAway})`}
          </td>
        ))}
      </tr>
    </>
  );
};

export default function FixturesDifficultyTable() {
  const {
    data: { teams: allTeams },
    // isLoading: allDataLoading,
    // error: allDataError,
  } = useQuery('allData', getAllData);
  const {
    data: allFixturesByWeek,
    // isLoading: fixturesByWeekLoading,
    // error: fixturesByWeekError,
  } = useQuery('fdrsByWeek', getFDRsByWeek);
  const {
    data: allFixturesByTeam,
    // isLoading: fixturesByTeamLoading,
    // error: fixturesByTeamError,
  } = useQuery('fdrsByTeam', getFDRsByTeam);

  const NUMBER_OF_FIXTURES_TO_SHOW = allFixturesByWeek.length;
  const activeGameweek = allFixturesByWeek.find((obj) => obj.activeGameWeek === true).gameweek;

  return (
    <>
      <section className="league-table flex flex-col gap-2 py-8 px-16 min-h-screen mx-auto">
        <div className="overall-details flex gap-5 items-center justify-between">
            <h1 className="text-xl">Standings</h1>
          <div className="upcoming-matches-and-difficulty flex gap-4">
            <div className="flex">
              <p className='mr-2'>FDR Ratings:</p>
              {Object.keys(difficultyColors).map((color, index) => {
                return (
                  <div className="size-6 text-center" key={index} style={{ background: difficultyColors[index + 1] }}>
                    {color}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <table className="league-table text-m flex flex-col overflow-x-auto">
          <thead className="headers text-xs">
            <tr className="flex border-b border-[#4a4a4a] gap-1 pl-3 items-center h-10">
              <th className="min-w-6"></th>
              <th className="min-w-6"></th>
              <th className="min-w-28 text-left">Club</th>
              <th className="min-w-6">Pl</th>
              <th className="min-w-6">W</th>
              <th className="min-w-6">L</th>
              <th className="min-w-6">D</th>
              <th className="min-w-6">GF</th>
              <th className="min-w-6">GA</th>
              <th className="min-w-6">Pt</th>
              {allFixturesByWeek.map((week, index) => (
                <th key={index} className="text-xs text-nowrap flex items-center justify-center min-w-20 py-3">
                  GW{week.gameweek}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allTeams.map((team, idx) => {
              const totalGoalsFor = allFixturesByTeam.find((obj) => team.id === obj.teamId)?.totalGoalsFor;
              const totalGoalsAgainst = allFixturesByTeam.find((obj) => team.id === obj.teamId)?.totalGoalsAgainst;
              const teamFixtures = getTeamFixtures(
                team.id,
                NUMBER_OF_FIXTURES_TO_SHOW,
                allFixturesByTeam,
                activeGameweek
              );

              return (
                <FDRTableTeamRow
                  key={idx}
                  idx={idx}
                  team={team}
                  totalGoalsFor={totalGoalsFor}
                  totalGoalsAgainst={totalGoalsAgainst}
                  fixtures={teamFixtures}
                />
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}
