import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { gql } from 'graphql-tag';
import { saveAs } from 'file-saver';

import {
  cn,
  currencySite,
  fillArray,
  findQueryVariables,
  formatNumber,
  getNameInitials,
  lowercaseFirstLetter,
  numberWithCurrency,
  propsToCSV,
} from '@/lib/utils';
import { IReportsCSV } from '@/components/pages/reports/reports.types';
import { useTranslation } from 'next-i18next';
import {
  mockClientCache,
  movementsChartMock,
  recentMovementsMock,
} from './utils.mock';

describe('findQueryVariables', () => {
  const mockClient = (cacheContent: NormalizedCacheObject) =>
    new ApolloClient({
      cache: new InMemoryCache().restore(cacheContent),
      uri: 'http://example.com/graphql', // This URI is irrelevant for the test
    });

  const mockQueryDocument = (queryName: string) => gql`
    query ${queryName} {
      someField
    }
  `;

  it('should return an empty object when no variables are found in the query', () => {
    const client = mockClient({});
    const queryDocument = mockQueryDocument('TestQuery');
    const result = findQueryVariables(client, queryDocument);
    expect(result).toEqual({});
  });

  it('should return the correct variables object when variables are found without specifying keyTopLevel', () => {
    const client = mockClient({
      ROOT_QUERY: {
        'testQuery({"param":"value"})': {},
      },
    });
    const queryDocument = mockQueryDocument('TestQuery');
    const result = findQueryVariables(client, queryDocument);
    expect(result).toEqual({ param: 'value' });
  });

  it('should return the correct value for keyTopLevel when specified and exists', () => {
    const client = mockClient({
      ROOT_QUERY: {
        'testQuery({"param":"value", "keyTopLevel": {"nestedKey": "nestedValue"}})':
          {},
      },
    });
    const queryDocument = mockQueryDocument('TestQuery');
    const result = findQueryVariables(client, queryDocument, 'keyTopLevel');
    expect(result).toEqual({ nestedKey: 'nestedValue' });
  });

  it('should return an empty object when keyTopLevel is specified but does not exist', () => {
    const client = mockClient(mockClientCache);
    const queryDocument = mockQueryDocument('TestQuery');
    const result = findQueryVariables(client, queryDocument, 'nonExistentKey');
    expect(result).toEqual({});
  });

  it('should return an empty object on JSON syntax error in query variables', () => {
    const client = mockClient({
      ROOT_QUERY: {
        'testQuery({"param":value})': {},
      },
    });
    const queryDocument = mockQueryDocument('TestQuery');
    const result = findQueryVariables(client, queryDocument);
    expect(result).toEqual({});
  });
});

describe('fillArray', () => {
  it('should create an array of specified length filled with incremental numbers starting from 0', () => {
    expect(fillArray(5)).toEqual([0, 1, 2, 3, 4]);
    expect(fillArray(3)).toEqual([0, 1, 2]);
  });

  it('should return an empty array when length is 0', () => {
    expect(fillArray(0)).toEqual([]);
  });

  it('should handle negative lengths by returning an empty array', () => {
    expect(fillArray(-5)).toEqual([]);
  });
});

declare const globalThis: {
  currencySite: string;
} & typeof global;

describe('numberWithCurrency', () => {
  const originalCurrencySite = globalThis.currencySite;
  beforeAll(() => {
    globalThis.currencySite = currencySite;
  });

  afterAll(() => {
    globalThis.currencySite = originalCurrencySite;
  });

  it('should format string number correctly', () => {
    const result = numberWithCurrency('123456');
    expect(result).toEqual('$\u00A0123.456,00');
  });

  it('should format bigint number correctly', () => {
    const result = numberWithCurrency(BigInt(123456));
    expect(result).toBe('$\u00A0123.456,00');
  });

  it('should handle invalid string as zero', () => {
    const result = numberWithCurrency('not a number');
    expect(result).toBe('$\u00A00,00');
  });

  it('should format negative number correctly', () => {
    const result = numberWithCurrency('-123456');
    expect(result).toBe('-$\u00A0123.456,00');
  });
});

describe('cn', () => {
  it('combines class names into a single string', () => {
    const result = cn('class1', 'class2');
    expect(result).toBe('class1 class2');
  });

  it('handles conditional class names correctly', () => {
    const result = cn('class1', { class2: true, class3: false });
    expect(result).toBe('class1 class2');
  });

  it('merges Tailwind classes resolving conflicts', () => {
    const result = cn('p-4', 'p-2');
    expect(result).toBe('p-2');
  });

  it('handles arrays of class names', () => {
    const result = cn(['class1', 'class2'], ['class3']);
    expect(result).toBe('class1 class2 class3');
  });
});

describe('getNameInitials', () => {
  it('should return the first letter of a single name', () => {
    expect(getNameInitials('John')).toBe('J');
  });

  it('should return the initials of a full name', () => {
    expect(getNameInitials('John Doe')).toBe('JD');
  });

  it('should handle names with multiple spaces correctly', () => {
    expect(getNameInitials('John    Doe')).toBe('JD');
  });

  it('should return an empty string if the name is empty', () => {
    expect(getNameInitials('')).toBe('');
  });

  it('should handle names with leading or trailing spaces', () => {
    expect(getNameInitials(' John Doe ')).toBe('JD');
  });
});

// Mocks
jest.mock('file-saver', () => ({ saveAs: jest.fn() }));
jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('propsToCSV', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate CSV content for movementsChart', () => {
    const { t } = useTranslation();
    const data: IReportsCSV = {
      movementsChart: [{ name: 'jan', expense: '100', income: '200' }],
    };
    propsToCSV(data, t);
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'report.csv');
  });

  it('should generate CSV content for recentMovements', () => {
    const { t } = useTranslation();
    const data: IReportsCSV = {
      recentMovements: recentMovementsMock,
    };
    propsToCSV(data, t);
  });

  it('should generate CSV content for movements and balance', () => {
    const { t } = useTranslation();
    const data: IReportsCSV = {
      balance: '1000',
      movements: 256,
      movementsChart: movementsChartMock,
    };
    propsToCSV(data, t);
  });

  it('should handle empty data correctly', () => {
    const { t } = useTranslation();
    const data: IReportsCSV = {};
    propsToCSV(data, t);
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'report.csv');
  });

  it('should generate CSV content for both movementsChart and recentMovements', () => {
    const { t } = useTranslation();
    const data: IReportsCSV = {
      movementsChart: movementsChartMock,
      recentMovements: recentMovementsMock,
    };
    propsToCSV(data, t);
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'report.csv');
  });

  it('should generate CSV content with all data fields', () => {
    const { t } = useTranslation();
    const data: IReportsCSV = {
      movementsChart: movementsChartMock,
      recentMovements: recentMovementsMock,
      movements: 678,
      balance: '$ 1234.56',
    };
    propsToCSV(data, t);
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'report.csv');
  });

  it('should generate correct CSV format when one of the sections has no data', () => {
    const { t } = useTranslation();
    const data: IReportsCSV = {
      movementsChart: [],
      recentMovements: recentMovementsMock,
      movements: 5,
      balance: '$ 1000',
    };
    propsToCSV(data, t);
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'report.csv');
  });

  it('should handle undefined values in data fields correctly', () => {
    const { t } = useTranslation();
    const data: IReportsCSV = {
      movementsChart: undefined,
      recentMovements: undefined,
      movements: undefined,
      balance: undefined,
    };
    propsToCSV(data, t);
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'report.csv');
  });
});

describe('formatNumber', () => {
  it('should format numbers with the appropriate suffix', () => {
    expect(formatNumber(1000)).toBe('1.0K');
    expect(formatNumber(1500000)).toBe('1.5M');
    expect(formatNumber(2000000000)).toBe('2.0B');
    expect(formatNumber(3000000000000)).toBe('3.0T');
  });

  it('should handle numbers less than 1000 without a suffix', () => {
    expect(formatNumber(999)).toBe('999.0');
    expect(formatNumber(10)).toBe('10.0');
    expect(formatNumber(0)).toBe('0');
  });

  it('should handle negative numbers correctly', () => {
    expect(formatNumber(-1000)).toBe('-1.0K');
    expect(formatNumber(-1500000)).toBe('-1.5M');
  });

  it('should respect the precision parameter', () => {
    expect(formatNumber(1500, 0)).toBe('2K');
    expect(formatNumber(1500000, 2)).toBe('1.50M');
  });

  it('should return "0" for null input', () => {
    expect(formatNumber(null as unknown as number)).toBe('0');
  });
});

describe('lowercaseFirstLetter', () => {
  it('should lowercase the first letter of a string', () => {
    expect(lowercaseFirstLetter('Hello')).toBe('hello');
  });

  it('should return the same string if the first character is already lowercase', () => {
    expect(lowercaseFirstLetter('hello')).toBe('hello');
  });

  it('should handle an empty string correctly', () => {
    expect(lowercaseFirstLetter('')).toBe('');
  });

  it('should not change the rest of the string', () => {
    expect(lowercaseFirstLetter('HELLO')).toBe('hELLO');
  });

  it('should handle strings with only one character', () => {
    expect(lowercaseFirstLetter('H')).toBe('h');
    expect(lowercaseFirstLetter('h')).toBe('h');
  });

  it('should handle non-alphabetic characters correctly', () => {
    expect(lowercaseFirstLetter('1Hello')).toBe('1Hello');
    expect(lowercaseFirstLetter('!hello')).toBe('!hello');
  });
});
