export default {
  preset: 'ts-jest/presets/js-with-ts-esm',
  reporters: [
    'default',
    [
      'jest-junit',
      { outputDirectory: 'reports/jest', outputName: 'jest-report.xml' },
    ],
  ],
}
