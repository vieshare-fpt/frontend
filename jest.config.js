const config = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  testEnvironment: 'jsdom',
  globals: {

  },
}

export default config
