/* eslint-disable react/prop-types */
import { useQuery } from 'react-query';
import { createPlayerObjects, getFDRsByWeek } from '../utils/Loaders';
import { difficultyColors, playerStatuses } from '../utils/helpers';
import { useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';

const NUMBER_OF_FIXTURES_TO_SHOW = 10;
const PLAYERS_PER_PAGE = 20;

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

export default function PlayersIndexTest() {
  const { data: allFixturesByWeek } = useQuery('fdrsByWeek', getFDRsByWeek);
  const { data: allPlayers } = useQuery('playerObjects', createPlayerObjects);

  // ! Filter state
  const [filters, setFilters] = useState({
    teamFilter: null,
    positionFilter: null,
    sort: 'totalPoints',
  });

  const [currentPage, setCurrentPage] = useState(0);
  const filteredAndSortedPlayers = useMemo(() => {
    let result = [...allPlayers];

    // TODO Filters to be introduced

    // ! Sorting
    result.sort((a, b) => {
      if (filters.sort === 'goalsConceded') {
        return a[filters.sort] - b[filters.sort];
      }
      return b[filters.sort] - a[filters.sort];
    });
    return result;
  }, [allPlayers, filters]);

  // ! Pagination
  const currentPlayers = useMemo(() => {
    const startIndex = currentPage * PLAYERS_PER_PAGE;
    return filteredAndSortedPlayers.slice(startIndex, startIndex + PLAYERS_PER_PAGE);
  }, [filteredAndSortedPlayers, currentPage]);

  const pageCount = Math.ceil(filteredAndSortedPlayers.length / PLAYERS_PER_PAGE);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
  };

  // function to change by what criteria you're sorting the players
  function changeSort(e) {
    const newSort = e.currentTarget.id;
    setFilters((prev) => ({ ...prev, sort: newSort }));
    setCurrentPage(0);
  }

  // active gameweek and the upcoming fixtures data
  const activeGameweek = allFixturesByWeek.find((obj) => obj.activeGameWeek === true).gameweek;
  const fixturesToDisplayArray = Array.from({ length: NUMBER_OF_FIXTURES_TO_SHOW }, (_, i) => activeGameweek + i);

  const tableHeaderStyle =
    'hover:bg-[#4a4a4a] hover:cursor-pointer text-sm font-light size-12 flex items-center justify-center p-0';

  return (
    <section className="all-players min-h-screen max-w-fit mx-auto p-8 ">
      <div className="flex justify-between p-2 text-right">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          previousLabel="< prev"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          className="flex gap-4 py-2"
        />
        <div className="filters"></div>
        <div className="flex gap-2 items-center active-gameweek-info">
          <span>Active Gameweek:</span>
          <span className="text-lg text-lime-400">{activeGameweek}</span>
        </div>
      </div>
      <table className="relative">
        <thead className="sticky backdrop-blur-3xl top-0 flex border-b border-[#4a4a4a] gap-2">
          <tr className="flex">
            <th id="status" className={tableHeaderStyle}>
              sta
            </th>
            <th id="team" className={tableHeaderStyle}>
              TEA
            </th>
            <th id="name" className={`${tableHeaderStyle} min-w-32 justify-stretch`}>
              NAM
            </th>
            <th onClick={changeSort} id="form" className={tableHeaderStyle} style={{background: filters.sort === 'form' ? '#4a4a4a' : 'inherit'}}>
              FOR
            </th>
            <th onClick={changeSort} id="value" className={tableHeaderStyle} style={{background: filters.sort === 'value' ? '#4a4a4a' : 'inherit'}}>
              VAL
            </th>
            <th onClick={changeSort} id="ownership" className={tableHeaderStyle} style={{background: filters.sort === 'ownership' ? '#4a4a4a' : 'inherit'}}>
              SEL
            </th>
            <th onClick={changeSort} id="pointsPerGame" className={tableHeaderStyle} style={{background: filters.sort === 'pointsPerGame' ? '#4a4a4a' : 'inherit'}}>
              PPG
            </th>
            <th onClick={changeSort} id="pointsPerStart" className={tableHeaderStyle} style={{background: filters.sort === 'pointsPerStart' ? '#4a4a4a' : 'inherit'}}>
              PPS
            </th>
            <th onClick={changeSort} id="bps" className={tableHeaderStyle} style={{background: filters.sort === 'bps' ? '#4a4a4a' : 'inherit'}}>
              BPS
            </th>
            <th onClick={changeSort} id="totalBonusPoints" className={tableHeaderStyle} style={{background: filters.sort === 'totalBonusPoints' ? '#4a4a4a' : 'inherit'}}>
              TBN
            </th>
            <th onClick={changeSort} id="ict" className={tableHeaderStyle} style={{background: filters.sort === 'ict' ? '#4a4a4a' : 'inherit'}}>
              ICT
            </th>
            <th onClick={changeSort} id="gamesStarted" className={tableHeaderStyle} style={{background: filters.sort === 'gamesStarted' ? '#4a4a4a' : 'inherit'}}>
              GST
            </th>
            <th onClick={changeSort} id="goals" className={tableHeaderStyle} style={{background: filters.sort === 'goals' ? '#4a4a4a' : 'inherit'}}>
              GLS
            </th>
            <th onClick={changeSort} id="assists" className={tableHeaderStyle} style={{background: filters.sort === 'assists' ? '#4a4a4a' : 'inherit'}}>
              AST
            </th>
            <th onClick={changeSort} id="cleanSheets" className={tableHeaderStyle} style={{background: filters.sort === 'cleanSheets' ? '#4a4a4a' : 'inherit'}}>
              CLS
            </th>
            <th onClick={changeSort} id="goalsConceded" className={tableHeaderStyle} style={{background: filters.sort === 'goalsConceded' ? '#4a4a4a' : 'inherit'}}>
              CON
            </th>
            <th onClick={changeSort} id="totalPoints" className={tableHeaderStyle} style={{background: filters.sort === 'totalPoints' ? '#4a4a4a' : 'inherit'}}>
              Pts
            </th>
            {fixturesToDisplayArray.map((week, index) => (
              <th key={index} className="text-xs text-nowrap flex justify-center min-w-20 py-3 font-light">
                GW{week}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentPlayers.map((player) => (
            <PlayerStatsRow player={player} activeGameWeek={activeGameweek} key={player.id} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
