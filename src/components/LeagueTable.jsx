import { useQuery } from 'react-query';
import { getAllData } from '../utils/Loaders';
import { useEffect } from 'react';

export default function LeagueTable() {
  const {
    data: { teams: allTeams },
  } = useQuery('allData', getAllData);

  useEffect(() => {
    console.log(allTeams);
  }, [allTeams]);

  return (
    <>
      <section className="league-table flex flex-col gap-2 py-8 px-10 min-h-screen">
        <h1 className="text-xl">Standings</h1>
        <table className="league-table text-m flex flex-col">
          <tr className="headers text-center flex border-b border-[#4a4a4a] gap-2 px-3 py-2">
            <th className="w-5"></th>
            <th className="w-5"></th>
            <th className="flex-grow text-left">Club</th>
            <th className="w-5">Pl</th>
            <th className="w-5">W</th>
            <th className="w-5">L</th>
            <th className="w-5">D</th>
            <th className="w-5">Pts</th>
          </tr>
          {allTeams.map((team, idx) => {
            return (
              <tr key={idx} className="flex text-center items-center py-2 px-3 border-b gap-2 border-[#4a4a4a] hover:bg-[#4a4a4a]">
                <td className="flex justify-center items-center w-5">{idx + 1}</td>
                <td>
                  <img
                    className="size-5"
                    src={`${`https://resources.premierleague.com/premierleague/badges/100/t${team.code}.png`}`}
                    alt=""
                  />
                </td>
                <td className="flex-grow text-left">{team.name}</td>
                <td className='w-5'>{team.played}</td>
                <td className='w-5'>{team.win}</td>
                <td className='w-5'>{team.loss}</td>
                <td className='w-5'>{team.draw}</td>
                <td className='w-5'>{team.points}</td>
              </tr>
            );
          })}
        </table>
      </section>
    </>
  );
}
