module.exports = {
  verbose: true, // To give details about tests being run,additional debugging info.
  transform: {
    '^.+\\.js$': 'babel-jest', // use Babel for transforming js files.
  },
  // moduleDirectories: ["node_modules", "src"],
  testEnvironment: 'jsdom',
  // moduleFileExtensions: ["js", "json", "jsx", "node"],
};
