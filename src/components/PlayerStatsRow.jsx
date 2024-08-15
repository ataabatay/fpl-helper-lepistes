import { difficultyColors, playerStatuses } from '../utils/helpers';

/* eslint-disable react/prop-types */
export default function PlayerStatsRow({ player, activeGameWeek, NUMBER_OF_FIXTURES_TO_SHOW }) {
  const fixturesToShow = player?.fdrs?.slice(activeGameWeek - 1, NUMBER_OF_FIXTURES_TO_SHOW);
  const tableDataStyle = 'flex items-center size-12 justify-center p-0';

  return (
    <tr className="flex border-b border-[#4a4a4a] hover:cursor-pointer text-s font-light hover:bg-[#4a4a4a] active:bg-[#4a4a4a] focus:bg-[#4a4a4a]">
      <td className={tableDataStyle}>{playerStatuses[player.status]}</td>
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
      <td className={tableDataStyle}>{Number(player.form)}</td>
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