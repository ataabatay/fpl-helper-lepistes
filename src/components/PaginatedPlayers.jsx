/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

// eslint-disable-next-line react/prop-types
export default function PaginatedPlayers({ allPlayers, itemsPerPage }) {
  useEffect(() => {
    console.log(allPlayers);
  });

  const [itemOffset, setItemOffset] = useState(0);



  return (
    <>

    </>
  );
}
