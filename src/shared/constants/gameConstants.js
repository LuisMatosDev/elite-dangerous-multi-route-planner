module.exports = {
  SCOOPABLE_STARS: ['O', 'B', 'A', 'F', 'G', 'K', 'M'],
  NON_SCOOPABLE_STARS: ['D', 'N', 'H', 'T', 'Y', 'W', 'L'],

  MAX_JUMP_RANGE: 100,
  JUMP_TIME_SECONDS: 45,
  SCOOP_TIME_SECONDS: 60,
  NEUTRON_BOOST_MULTIPLIER: 4,

  JOURNAL_PATH_CANDIDATES: [
    'Saved Games\\Frontier Developments\\Elite Dangerous',
    'OneDrive\\Saved Games\\Frontier Developments\\Elite Dangerous',
    'OneDrive - Personal\\Saved Games\\Frontier Developments\\Elite Dangerous',
  ],

  API: {
    EDSM_BASE: 'https://www.edsm.net/api-v1',
    SPANSH_BASE: 'https://spansh.co.uk/api',
    // TODO: adicionar endpoints quando tivermos acesso
  },
};
