import { useQuery } from 'react-query';
import { getFDRsByWeek } from '../utils/Loaders';
import { act } from 'react';

const playerStatsRow = ({ player }) => {
  return (
    <tr>
      <td>{player.teamLogo}</td>
      <td>
        <div className="player-name flex flex-col gap-2">{player.displayName}</div>
        <div className="team-formation flex gap-2">
          <span className="team text-xs italic">{player.team}</span>
          <span className="team text-xs italic">{player.position}</span>
        </div>
      </td>
      <td>{player.form}</td>
      <td>{player.value}</td>
      <td>{player.ownership}</td>
      <td>{player.pointsPerGame}</td>
      <td>{player.pointsPerStart}</td>
      <td>{player.pointsPerMinute}</td>
      <td>{player.bps}</td>
      <td>{player.totalBonusPoints}</td>
      <td>{player.ict}</td>
      <td>{player.gamesStarted}</td>
      <td>{player.goals}</td>
      <td>{player.assists}</td>
      <td>{player.cleanSheets}</td>
      <td>{player.goalsConceded}</td>
      <td>{player.totalPoints}</td>
    </tr>
  );
};

export default function PlayersIndex() {
  const {
    data: allFixturesByWeek,
    // isLoading: fixturesByWeekLoading,
    // error: fixturesByWeekError,
  } = useQuery('fdrsByWeek', getFDRsByWeek);

  const NUMBER_OF_FIXTURES_TO_SHOW = 10;
  const activeGameweek = allFixturesByWeek.find((obj) => obj.activeGameWeek === true).gameweek;
  const weeksToDisplayArray = Array.from({ length: NUMBER_OF_FIXTURES_TO_SHOW }, (_, i) => activeGameweek + i);

  const tableHeaderStyle =
    'p-2 hover:bg-[#4a4a4a] active:bg-[#4a4a4a] focus:bg-[#4a4a4a] hover:cursor-pointer text-xs font-light py-3';

  return (
    <section className="all-players min-h-screen max-w-[3000px] mx-auto p-10 ">
      <div className='p-5'>
        Active Gameweek:
        <span className="text-lg text-lime-400">{activeGameweek}</span>
      </div>
      <table>
        <thead className="flex border-b border-[#4a4a4a] gap-2">
          <tr className="player-stats flex flex-col">
            <tr>
              <th className="pl-4 font-light text-lg">Player Stats</th>
            </tr>
            <tr className='flex'>
              <th className={tableHeaderStyle}>TEA</th>
              <th className={tableHeaderStyle}>NAM</th>
              <th className={tableHeaderStyle}>FOR</th>
              <th className={tableHeaderStyle}>VAL</th>
              <th className={tableHeaderStyle}>SEL</th>
              <th className={tableHeaderStyle}>PPG</th>
              <th className={tableHeaderStyle}>PPS</th>
              <th className={tableHeaderStyle}>PPM</th>
              <th className={tableHeaderStyle}>BPS</th>
              <th className={tableHeaderStyle}>TBN</th>
              <th className={tableHeaderStyle}>ICT</th>
              <th className={tableHeaderStyle}>GST</th>
              <th className={tableHeaderStyle}>GOL</th>
              <th className={tableHeaderStyle}>ASS</th>
              <th className={tableHeaderStyle}>CSH</th>
              <th className={tableHeaderStyle}>CON</th>
              <th className={`${tableHeaderStyle} border-r border-[#4a4a4a]`}>TPS</th>
              {weeksToDisplayArray.map((week, index) => (
                <th key={index} className="text-xs text-nowrap flex justify-center min-w-20 py-3 font-light">
                  GW{week}
                </th>
              ))}
            </tr>
          </tr>
        </thead>
      </table>
    </section>
  );
}
