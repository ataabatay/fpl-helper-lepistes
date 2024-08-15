/* eslint-disable react/prop-types */
import { useQuery } from 'react-query';
import { getFDRsByWeek } from '../utils/Loaders';
import { useState } from 'react';

export default function ActiveGameweekFixture() {
  const {
    data: allFixturesByWeek,
  } = useQuery('fdrsByWeek', getFDRsByWeek);

  const [activeGameweek, setActiveGameweek] = useState(
    () => allFixturesByWeek.find((obj) => obj.activeGameWeek === true).gameweek
  );
  const [activeGameweekFixtures, setActiveGameweekFixtures] = useState(allFixturesByWeek[activeGameweek - 1].fdrs);

  const goToPrev = () => {
    setActiveGameweek((prev) => {
      const newGameweek = prev - 1;
      setActiveGameweekFixtures(allFixturesByWeek[newGameweek - 1]?.fdrs || []);
      return newGameweek
    });
  };

  const goToNext = () => {
    setActiveGameweek((prev) => {
      const newGameweek = prev + 1;
      setActiveGameweekFixtures(allFixturesByWeek[newGameweek - 1]?.fdrs || []);
      return newGameweek;
    });
  };

  return (
    <>
      <section className="current-weeks-fixture flex justify-center min-w-fit">
        <table className="flex flex-col gap-10 p-10">
          <thead className="flex items-center justify-between relative">
            {activeGameweek === 1 ? (
              ''
            ) : (
              <button onClick={goToPrev} className="absolute left-0">
                ⬅️
              </button>
            )}
            <th className="flex text-3xl justify-center mx-auto">Gameweek {activeGameweek}</th>
            {activeGameweek === allFixturesByWeek.length ? (
              ''
            ) : (
              <button onClick={goToNext} className="absolute right-0">
                ➡️
              </button>
            )}
          </thead>
          <tbody className="flex flex-col gap-4">
            {activeGameweekFixtures.map((game, index) => {
              if (game.homeAway === 'H') {
                return (
                  <tr key={index}>
                    <td className="text-xl flex gap-2">
                      <div className="home-team flex items-center gap-2 min-w-fit">
                        <span className="min-w-20 text-center">{game.teamName}</span>
                        <img
                          className="size-8"
                          src={`${`https://resources.premierleague.com/premierleague/badges/100/t${game.homeTeamCode}.png`}`}
                          alt=""
                        />
                      </div>
                      <span className="min-w-20 text-center">
                        {game.goalsFor ? game.goalsFor : '-'} : {game.goalsAgainst ? game.goalsAgainst : '-'}
                      </span>{' '}
                      <div className="home-team flex items-center gap-2 min-w-fit">
                        <img
                          className="size-8"
                          src={`${`https://resources.premierleague.com/premierleague/badges/100/t${game.againstTeamCode}.png`}`}
                          alt=""
                        />
                        <span className="min-w-20 text-center">{game.againstName}</span>
                      </div>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}
