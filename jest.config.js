module.exports = {
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
