function test() {
  const gameweekArray = [
    {
      gameweek: 1,
      fdrs: {
        1: 5,
        2: 4,
        3: 5,
        4: 1,
      },
    },
    {
      gameweek: 2,
      fdrs: {
        1: 5,
        2: 4,
        3: 5,
        4: 1,
      },
    },
    {
      gameweek: 3,
      fdrs: {
        1: 5,
        2: 4,
        3: 5,
        4: 1,
      },
    },
    {
      gameweek: 4,
      fdrs: {
        1: 5,
        2: 4,
        3: 5,
        4: 1,
      },
    },
    {
      gameweek: 5,
      fdrs: {
        1: 5,
        2: 4,
        3: 5,
        4: 1,
      },
    },
  ];

  console.log(gameweekArray.findIndex((obj) => obj['gameweek'] === 4));
}

test();
