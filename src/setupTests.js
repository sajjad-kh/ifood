import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock fetch
global.fetch = jest.fn();

// Mock window.location
delete window.location;
window.location = {
  href: 'http://localhost:3001',
  origin: 'http://localhost:3001',
  pathname: '/',
  search: '',
  hash: '',
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
};

// Mock environment variables
process.env.REACT_APP_API_BASE_URL = 'http://localhost:3000';

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

// Mock jest for browser environment
if (typeof window !== 'undefined') {
  window.jest = {
    fn: () => ({
      mock: { calls: [] },
      mockReturnValue: () => ({}),
      mockResolvedValue: () => Promise.resolve({}),
      mockRejectedValue: () => Promise.reject(new Error('Mock error'))
    })
  };
}

// Reset all mocks before each test
beforeEach(() => {
  if (typeof jest !== 'undefined') {
    jest.clearAllMocks();
  }
  localStorage.clear();
  if (fetch && fetch.mockClear) {
    fetch.mockClear();
  }
});