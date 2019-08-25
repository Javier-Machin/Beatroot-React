// filter a warning coming from react-dom that will be solved in future react / react-dom updates
const consoleError = console.error;

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (
      !args[0].includes('Warning: An update to %s inside a test was not wrapped in act')
    ) {
      consoleError(...args);
    }
  });
});
