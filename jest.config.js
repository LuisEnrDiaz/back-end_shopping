/** @type {import('ts-jest').JestConfigWithTsJest} */
const preset = 'ts-jest';
const testEnvironment = 'node';
const testPathIgnorePatterns = ['dist', 'utils'];
const resolver = 'jest-ts-webcompat-resolver';
export default { preset, testEnvironment, testPathIgnorePatterns, resolver };
