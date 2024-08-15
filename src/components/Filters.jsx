/* eslint-disable react/prop-types */
import { useQuery } from 'react-query';
import ReactSelect from 'react-select';
import { getAllData } from '../utils/Loaders';
import Select from 'react-select';

export default function Filters({filters, setFilters}) {
  const {
    data: { teams: allTeams, element_types: positions },
  } = useQuery('allData', getAllData);

  // ! Function to filter players based on team
  function changeTeamFilter(e) {
    console.log(e);
    setFilters((prev) => ({
      ...prev,
      teamFilter: e,
    }));
  }
  // ! Function to filter players based on position
  function changePositionFilter(e) {
    console.log(e);
    setFilters((prev) => ({
      ...prev,
      positionFilter: e,
    }));
  }

  // ! Filtering option variables
  const teamOptions = allTeams.map((team) => ({
    value: team.id,
    label: team.name,
  }));
  teamOptions.unshift({
    value: 0,
    label: 'All',
  });
  const positionOptions = positions.map((position) => ({
    value: position.id,
    label: position.singular_name_short,
  }));
  positionOptions.unshift({
    value: 0,
    label: 'All',
  });

  // ! Component styles
  const selectStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      background: 'inherit',
      textAlign: 'left',
      cursor: 'pointer',
      color: 'white',
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      textAlign: 'left',
      cursor: 'pointer',
      background: state.isFocused ? '#4a4a4a' : '#2a2a2a',
      color: 'white',
    }),
    input: (baseStyles) => ({
      ...baseStyles,
      minWidth: '150px',
      color: 'white',
      cursor: 'pointer',
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      background: '#2a2a2a',
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: 'white',
    }),
  };

  return (
    <>
      <ReactSelect
        onChange={changeTeamFilter}
        options={teamOptions}
        name="teamFilter"
        placeholder="Filter by team"
        value={filters.teamFilter}
        styles={selectStyles}
      />
      <Select
        onChange={changePositionFilter}
        options={positionOptions}
        name="positionFilter"
        placeholder="Filter by position"
        value={filters.positionFilter}
        styles={selectStyles}
      />
    </>
  );
}
