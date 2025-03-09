global.fetch = jest.fn();

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createRoot: () => ({
    render: jest.fn(),
  }),
}));
