/* eslint-disable react/prop-types */
import { useQuery } from 'react-query';
import { getAllData, getFDRsByTeam, getFDRsByWeek } from '../utils/Loaders';
import { difficultyColors, getTeamFixtures } from '../utils/helpers';

const NUMBER_OF_FIXTURES_TO_SHOW = 5;

const FullTableTeamRow = ({ idx, team, totalGoalsFor, totalGoalsAgainst, fixtures }) => {
  return (
    <>
      <tr key={idx} className="flex text-center items-center pl-3 border-b gap-2 border-[#4a4a4a] hover:bg-[#4a4a4a]">
        <td className="flex justify-center items-center w-6">{idx + 1}</td>
        <td>
          <img
            className="size-5"
            src={`${`https://resources.premierleague.com/premierleague/badges/100/t${team.code}.png`}`}
            alt=""
          />
        </td>
        <td className="flex-grow text-left text-nowrap min-w-32">{team.name}</td>
        <td className="w-6">{team.played}</td>
        <td className="w-6">{team.win}</td>
        <td className="w-6">{team.loss}</td>
        <td className="w-6">{team.draw}</td>
        <td className="w-6">{totalGoalsFor}</td>
        <td className="w-6">{totalGoalsAgainst}</td>
        <td className="w-6 font-bold">{team.points}</td>
        <td className="flex">
          {fixtures.map((fixture, index) => (
            <div
              key={index}
              className="text-xs w-16 h-12 p-0 flex items-center justify-center"
              style={{ backgroundColor: difficultyColors[fixture.difficulty] }}
            >
              {`${fixture.against} (${fixture.homeAway})`}
            </div>
          ))}
        </td>
      </tr>
    </>
  );
};

export default function LeagueTable() {
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

  const activeGameweek = allFixturesByWeek.find((obj) => obj.activeGameWeek === true).gameweek;

  return (
    <>
      <section className="league-table flex flex-col gap-2 py-8 px-10 min-h-screen max-w-screen-lg mx-auto">
        <h1 className="flex items-center gap-2">
          Active Gameweek: <span className="text-xl text-lime-400">{activeGameweek}</span>
        </h1>
        <h1 className="text-xl">Standings</h1>
        <table className="league-table text-m flex flex-col">
          <thead className="headers">
            <tr className="flex border-b border-[#4a4a4a] gap-2 pl-3 items-center h-10">
              <th className="w-6 min-w-fit"></th>
              <th className="w-6 min-w-fit"></th>
              <th className="flex-grow text-left min-w-32">Club</th>
              <th className="w-6 min-w-fit">Pl</th>
              <th className="w-6 min-w-fit">W</th>
              <th className="w-6 min-w-fit">L</th>
              <th className="w-6 min-w-fit">D</th>
              <th className="w-6 min-w-fit">GF</th>
              <th className="w-6 min-w-fit">GA</th>
              <th className="w-6 min-w-fit">Pt</th>
              <th className="upcoming-matches-and-difficulty w-80 flex justify-between">
                <p>Upcoming matches</p>
                <div className="flex">
                  {Object.keys(difficultyColors).map((color, index) => {
                    return (
                      <div className="size-6" key={index} style={{ background: difficultyColors[index + 1] }}>
                        {color}
                      </div>
                    );
                  })}
                </div>
              </th>
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
                <FullTableTeamRow
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
