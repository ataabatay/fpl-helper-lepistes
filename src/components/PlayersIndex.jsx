/* eslint-disable react/prop-types */
import { useQuery } from 'react-query';
import { createPlayerObjects, getFDRsByWeek } from '../utils/Loaders';
import { difficultyColors, playerStatuses } from '../utils/helpers';
import { useEffect, useState } from 'react';

const NUMBER_OF_FIXTURES_TO_SHOW = 10;

const PlayerStatsRow = ({ player, activeGameWeek }) => {
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

  const [filteredPlayers, setFilteredPlayers] = useState(allPlayers.sort((a,b) => b.totalPoints - a.totalPoints))
  const [filters, setFilters] = useState({
    teamFilter: null,
    positionFilter: null,
    sort: null,
  })

  function changeSort(e) {
    const newSort = e.currentTarget.id
    setFilters((prev) => {
      const newFilter = {
        ...prev,
        sort: newSort
      }
      setFilteredPlayers(prev => {
        let newlySortedPlayers = []
        if (newSort != 'goalsConceded') {
          newlySortedPlayers = [...prev].sort((a,b) => b[newSort] - a[newSort])
        } else {
          newlySortedPlayers = [...prev].sort((a,b) => a[newSort] - b[newSort])
        }
        return newlySortedPlayers
      })
      return newFilter
    })
  }

  useEffect(() => {
    console.log(filters)
  }, [filters])

  // active gameweek and the upcoming fixtures data
  const activeGameweek = allFixturesByWeek.find((obj) => obj.activeGameWeek === true).gameweek;
  const fixturesToDisplayArray = Array.from({ length: NUMBER_OF_FIXTURES_TO_SHOW }, (_, i) => activeGameweek + i);

  const tableHeaderStyle =
    'hover:bg-[#4a4a4a] active:bg-[#4a4a4a] focus:bg-[#4a4a4a] hover:cursor-pointer text-sm font-light size-12 flex items-center justify-center p-0';

  return (
    <section className="all-players min-h-screen max-w-fit mx-auto p-8 ">
      <div className="flex justify-between p-2 text-right">
        <div className="filters">

        </div>
        <div className="flex gap-2 items-center active-gameweek-info">
          <span>Active Gameweek:</span>
          <span className="text-lg text-lime-400">{activeGameweek}</span>
        </div>
      </div>
      <table className="relative">
        <thead className="sticky backdrop-blur-3xl top-0 flex border-b border-[#4a4a4a] gap-2">
          <tr className="flex">
            <th id='status' className={tableHeaderStyle}>sta</th>
            <th id='team' className={tableHeaderStyle}>TEA</th>
            <th id='name' className={`${tableHeaderStyle} min-w-32 justify-stretch`}>NAM</th>
            <th onClick={changeSort} id='form' className={tableHeaderStyle}>FOR</th>
            <th onClick={changeSort} id='value' className={tableHeaderStyle}>VAL</th>
            <th onClick={changeSort} id='ownership' className={tableHeaderStyle}>SEL</th>
            <th onClick={changeSort} id='pointsPerGame' className={tableHeaderStyle}>PPG</th>
            <th onClick={changeSort} id='pointsPerStart' className={tableHeaderStyle}>PPS</th>
            <th onClick={changeSort} id='bps' className={tableHeaderStyle}>BPS</th>
            <th onClick={changeSort} id='totalBonusPoints' className={tableHeaderStyle}>TBN</th>
            <th onClick={changeSort} id='ict' className={tableHeaderStyle}>ICT</th>
            <th onClick={changeSort} id='gamesStarted' className={tableHeaderStyle}>GST</th>
            <th onClick={changeSort} id='goals' className={tableHeaderStyle}>GLS</th>
            <th onClick={changeSort} id='assists' className={tableHeaderStyle}>AST</th>
            <th onClick={changeSort} id='cleanSheets' className={tableHeaderStyle}>CLS</th>
            <th onClick={changeSort} id='goalsConceded' className={tableHeaderStyle}>CON</th>
            <th onClick={changeSort} id='totalPoints' className={tableHeaderStyle}>Pts</th>
            {fixturesToDisplayArray.map((week, index) => (
              <th key={index} className="text-xs text-nowrap flex justify-center min-w-20 py-3 font-light">
                GW{week}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((player) => (
            <PlayerStatsRow player={player} activeGameWeek={activeGameweek} key={player.id} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
