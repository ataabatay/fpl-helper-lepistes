import Select from 'react-select';

export default function Filters({filters, }) {
  return (
    <>
      <Select 
      defaultValue={'All Players'} 
      options={groupedOptions} 
      onChange={setSelectedFilter}
      formatGroupLabel={formatGroupLabel} />
    </>
  );
}
