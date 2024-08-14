/* eslint-disable react/prop-types */
import { useQuery } from 'react-query';
import { createPlayerObjects, getFDRsByWeek } from '../utils/Loaders';
import { difficultyColors } from '../utils/helpers';

const PlayerStatsRow = ({ player, activeGameWeek }) => {
  const fixturesToShow = player?.fdrs?.slice(activeGameWeek - 1, NUMBER_OF_FIXTURES_TO_SHOW);

  const tableDataStyle = 'flex items-center size-12 justify-center p-0';

  return (
    <tr className="flex border-b border-[#4a4a4a] hover:cursor-pointer text-s font-light hover:bg-[#4a4a4a] active:bg-[#4a4a4a] focus:bg-[#4a4a4a]">
      <td className={tableDataStyle}>
        <img src={player.teamLogo} alt="" className="size-6" />
      </td>
      <td className={`${tableDataStyle} flex-col min-w-32`}>
        <div className="player-name text-sm w-full">{player.displayName}</div>
        <div className="team-formation flex gap-2 w-full">
          <span className="team text-xs italic text-slate-500">{player.team}</span>
          <span className="team text-xs italic text-slate-500">{player.position}</span>
        </div>
      </td>
      <td className={tableDataStyle}>{player.form}</td>
      <td className={tableDataStyle}>{player.value}</td>
      <td className={tableDataStyle}>{player.ownership}</td>
      <td className={tableDataStyle}>{player.pointsPerGame}</td>
      <td className={tableDataStyle}>{player.pointsPerStart.toFixed(1)}</td>
      <td className={tableDataStyle}>{player.bps}</td>
      <td className={tableDataStyle}>{player.totalBonusPoints}</td>
      <td className={tableDataStyle}>{Number(player.ict).toFixed(0)}</td>
      <td className={tableDataStyle}>{player.gamesStarted}</td>
      <td className={tableDataStyle}>{player.goals}</td>
      <td className={tableDataStyle}>{player.assists}</td>
      <td className={tableDataStyle}>{player.cleanSheets}</td>
      <td className={tableDataStyle}>{player.goalsConceded}</td>
      <td className={tableDataStyle}>{player.totalPoints}</td>
      {fixturesToShow?.map((match, index) => (
        <td
          key={index}
          style={{ background: difficultyColors[match.gwDif] }}
          className="text-xs text-nowrap flex items-center justify-center min-w-20 py-3"
        >
          {match.against} ({match.homeAway})
        </td>
      ))}
    </tr>
  );
};

const NUMBER_OF_FIXTURES_TO_SHOW = 10;

export default function PlayersIndex() {
  const {
    data: allFixturesByWeek,
    // isLoading: fixturesByWeekLoading,
    // error: fixturesByWeekError,
  } = useQuery('fdrsByWeek', getFDRsByWeek);
  const {
    data: allPlayers,
    // isLoadiing: playersLoading,
    // error: playersLoadingError
  } = useQuery('playerObjects', createPlayerObjects);

  console.log(allPlayers);

  const activeGameweek = allFixturesByWeek.find((obj) => obj.activeGameWeek === true).gameweek;
  const weeksToDisplayArray = Array.from({ length: NUMBER_OF_FIXTURES_TO_SHOW }, (_, i) => activeGameweek + i);

  const tableHeaderStyle =
    'hover:bg-[#4a4a4a] active:bg-[#4a4a4a] focus:bg-[#4a4a4a] hover:cursor-pointer text-sm font-light size-12 flex items-center justify-center p-0';

  return (
    <section className="all-players min-h-screen max-w-fit mx-auto p-8 ">
      <div className="p-2 text-right">
        Active Gameweek:
        <span className="text-lg text-lime-400">{activeGameweek}</span>
      </div>
      <table className="relative">
        <thead className="sticky backdrop-blur-3xl top-0 flex border-b border-[#4a4a4a] gap-2">
          <tr className="flex">
            <th className={tableHeaderStyle}>TEA</th>
            <th className={`${tableHeaderStyle} min-w-32 justify-stretch`}>NAM</th>
            <th className={tableHeaderStyle}>FOR</th>
            <th className={tableHeaderStyle}>VAL</th>
            <th className={tableHeaderStyle}>SEL</th>
            <th className={tableHeaderStyle}>PPG</th>
            <th className={tableHeaderStyle}>PPS</th>
            <th className={tableHeaderStyle}>BPS</th>
            <th className={tableHeaderStyle}>TBN</th>
            <th className={tableHeaderStyle}>ICT</th>
            <th className={tableHeaderStyle}>GST</th>
            <th className={tableHeaderStyle}>GLS</th>
            <th className={tableHeaderStyle}>AST</th>
            <th className={tableHeaderStyle}>CLS</th>
            <th className={tableHeaderStyle}>CON</th>
            <th className={tableHeaderStyle}>Pts</th>
            {weeksToDisplayArray.map((week, index) => (
              <th key={index} className="text-xs text-nowrap flex justify-center min-w-20 py-3 font-light">
                GW{week}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allPlayers.map((player) => (
            <PlayerStatsRow player={player} activeGameWeek={activeGameweek} key={player.id} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
