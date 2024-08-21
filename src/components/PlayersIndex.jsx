/* eslint-disable react/prop-types */
import { useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Filters from './Filters';
import PlayerStatsRow from './PlayerStatsRow';
import { useFDRsBYWeek } from '../hooks/useFDRsByWeek';
import { usePlayerObjects } from '../hooks/usePlayerObjects';

const NUMBER_OF_FIXTURES_TO_SHOW = 10;
const PLAYERS_PER_PAGE = 20;

export default function PlayersIndex() {
  const allFixturesByWeek = useFDRsBYWeek()
  const allPlayers = usePlayerObjects()

  // ! Filter state
  const [filters, setFilters] = useState({
    teamFilter: { value: 0, label: 'All' },
    positionFilter: { value: 0, label: 'All' },
    sort: 'totalPoints',
  });

  const filteredAndSortedPlayers = useMemo(() => {
    let result = [...allPlayers];
    // ! Filtering
    const playersFilteredByTeam = result.filter((player) =>
      filters.teamFilter.value === 0 ? player : player.teamId === filters.teamFilter['value']
    );
    const playersFilteredByTeamAndPositions = playersFilteredByTeam.filter((player) =>
      filters.positionFilter.value === 0 ? player : player.positionId === filters.positionFilter['value']
    );

    // ! Sorting
    playersFilteredByTeamAndPositions.sort((a, b) => {
      if (filters.sort === 'goalsConceded') {
        return a[filters.sort] - b[filters.sort];
      }
      return b[filters.sort] - a[filters.sort];
    });
    return playersFilteredByTeamAndPositions;
  }, [allPlayers, filters]);

  // ! Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const currentPlayers = useMemo(() => {
    const startIndex = currentPage * PLAYERS_PER_PAGE;
    return filteredAndSortedPlayers.slice(startIndex, startIndex + PLAYERS_PER_PAGE);
  }, [filteredAndSortedPlayers, currentPage]);
  const pageCount = Math.ceil(filteredAndSortedPlayers.length / PLAYERS_PER_PAGE);
  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
  };

  // ! Sorting handler
  function changeSort(e) {
    const newSort = e.currentTarget.id;
    setFilters((prev) => ({ ...prev, sort: newSort }));
    setCurrentPage(0);
  }

  // ! Variables
  // active gameweek and the upcoming fixtures data
  const activeGameweek = allFixturesByWeek.find((obj) => obj.activeGameWeek === true).gameweek;
  const fixturesToDisplayArray = Array.from({ length: NUMBER_OF_FIXTURES_TO_SHOW }, (_, i) => activeGameweek + i);

  // ! Component Styles
  const tableHeaderStyle =
    'hover:bg-[#4a4a4a] hover:cursor-pointer text-sm font-light size-12 flex items-center justify-center p-0';

  return (
    <section className="all-players min-h-screen max-w-fit mx-auto p-8 ">
      <div className="flex justify-between p-2 text-right">
        <div className="filters flex gap-8">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
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
            <th
              onClick={changeSort}
              id="form"
              className={tableHeaderStyle}
              style={{ background: filters.sort === 'form' ? '#4a4a4a' : 'inherit' }}
            >
              FOR
            </th>
            <th
              onClick={changeSort}
              id="value"
              className={tableHeaderStyle}
              style={{ background: filters.sort === 'value' ? '#4a4a4a' : 'inherit' }}
            >
              VAL
            </th>
            <th
              onClick={changeSort}
              id="ownership"
              className={tableHeaderStyle}
              style={{ background: filters.sort === 'ownership' ? '#4a4a4a' : 'inherit' }}
            >
              SEL
            </th>
            <th
              onClick={changeSort}
              id="pointsPerGame"
              className={tableHeaderStyle}
              style={{ background: filters.sort === 'pointsPerGame' ? '#4a4a4a' : 'inherit' }}
            >
              PPG
            </th>
            <th
              onClick={changeSort}
              id="pointsPerStart"
              className={tableHeaderStyle}
              style={{ background: filters.sort === 'pointsPerStart' ? '#4a4a4a' : 'inherit' }}
            >
              PPS
            </th>
            <th
              onClick={changeSort}
              id="bps"
              className={tableHeaderStyle}
              style={{ background: filters.sort === 'bps' ? '#4a4a4a' : 'inherit' }}
            >
              BPS
            </th>
            <th
              onClick={changeSort}
              id="totalBonusPoints"
              className={tableHeaderStyle}
              style={{ background: filters.sort === 'totalBonusPoints' ? '#4a4a4a' : 'inherit' }}
            >
              TBN
            </th>
            <th
              onClick={changeSort}
              id="ict"
              className={tableHeaderStyle}
              style={{ background: filters.sort === 'ict' ? '#4a4a4a' : 'inherit' }}
            >
              ICT
            </th>
            <th
              onClick={changeSort}
              id="gamesStarted"
              className={tableHeaderStyle}
              style={{ background: filters.sort === 'gamesStarted' ? '#4a4a4a' : 'inherit' }}
            >
              GST
            </th>
            <th
              onClick={changeSort}
              id="goals"
              className={tableHeaderStyle}
              style={{ background: filters.sort === 'goals' ? '#4a4a4a' : 'inherit' }}
            >
              GLS
            </th>
            <th
              onClick={changeSort}
              id="assists"
              className={tableHeaderStyle}
              style={{ background: filters.sort === 'assists' ? '#4a4a4a' : 'inherit' }}
            >
              AST
            </th>
            <th
              onClick={changeSort}
              id="cleanSheets"
              className={tableHeaderStyle}
              style={{ background: filters.sort === 'cleanSheets' ? '#4a4a4a' : 'inherit' }}
            >
              CLS
            </th>
            <th
              onClick={changeSort}
              id="goalsConceded"
              className={tableHeaderStyle}
              style={{ background: filters.sort === 'goalsConceded' ? '#4a4a4a' : 'inherit' }}
            >
              CON
            </th>
            <th
              onClick={changeSort}
              id="totalPoints"
              className={tableHeaderStyle}
              style={{ background: filters.sort === 'totalPoints' ? '#4a4a4a' : 'inherit' }}
            >
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
            <PlayerStatsRow
              NUMBER_OF_FIXTURES_TO_SHOW={NUMBER_OF_FIXTURES_TO_SHOW}
              player={player}
              activeGameWeek={activeGameweek}
              key={player.id}
            />
          ))}
        </tbody>
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        previousLabel="< prev"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        className="flex gap-4 py-6"
      />
    </section>
  );
}
