import { getSkipped, mockPagination, pageMeta } from '@/server/utils';

describe('getSkipped', () => {
  it('returns 0 for the first page', () => {
    expect(getSkipped(100)).toBe(0);
  });

  it('calculates skipped items correctly for given page and limit', () => {
    expect(getSkipped(100, 2, 10)).toBe(10);
    expect(getSkipped(100, 3, 20)).toBe(40);
  });

  it('defaults to limit of 10 if not specified', () => {
    expect(getSkipped(100, 2)).toBe(10);
  });

  it('throws an error if the page is less than 1', () => {
    expect(() => getSkipped(100, 0)).toThrow('Page number not found!');
  });

  it('throws an error if the page is greater than the total number of pages', () => {
    expect(() => getSkipped(100, 11, 10)).toThrow('Page number not found!');
  });
});

describe('pageMeta', () => {
  const sampleData = ['item1', 'item2', 'item3'];

  it('should handle a valid page correctly', () => {
    const result = pageMeta(sampleData, {
      pageOptions: { page: 1 },
      itemCount: 30,
    });
    expect(result.meta.page).toBe(1);
    expect(result.meta.pageCount).toBe(3);
    expect(result.meta.hasPreviousPage).toBe(false);
    expect(result.meta.hasNextPage).toBe(true);
  });

  it('should reset to page 1 if requested page is less than 1', () => {
    const result = pageMeta(sampleData, {
      pageOptions: { page: 0 },
      itemCount: 30,
    });
    expect(result.meta.page).toBe(1);
  });

  it('should reset to page 1 if requested page is greater than total pages', () => {
    const result = pageMeta(sampleData, {
      pageOptions: { page: 5 },
      itemCount: 20,
    });
    expect(result.meta.page).toBe(1);
  });

  it('should handle a custom limit correctly', () => {
    const result = pageMeta(sampleData, {
      pageOptions: { limit: 5, page: 2 },
      itemCount: 22,
    });
    expect(result.meta.limit).toBe(5);
    expect(result.meta.pageCount).toBe(5);
    expect(result.meta.page).toBe(2);
  });

  it('should correctly calculate hasPreviousPage and hasNextPage', () => {
    const result = pageMeta(sampleData, {
      pageOptions: { page: 2 },
      itemCount: 30,
    });
    expect(result.meta.hasPreviousPage).toBe(true);
    expect(result.meta.hasNextPage).toBe(true);
  });
});

describe('mockPagination', () => {
  it('should return the correct structure with default meta values and provided error message', () => {
    const errorMessage = 'Test error';
    const dataMock = ['item1', 'item2'];
    const result = mockPagination(errorMessage, dataMock);

    expect(result).toEqual({
      data: dataMock,
      meta: {
        page: 1,
        limit: 10,
        itemCount: 0,
        pageCount: 0,
        hasPreviousPage: false,
        hasNextPage: false,
        errorMessage: errorMessage,
      },
    });
  });

  it('should handle different types of dataMock correctly', () => {
    const dataMock = ['item1', 'item2'];
    const result = mockPagination('', dataMock);
    expect(result.data).toBe(dataMock);

    expect(result.data).toBe(dataMock);
  });

  it('should handle different types of error messages correctly', () => {
    const errorMessage = 'Another test error';
    const dataMock = ['item1', 'item2'];
    const result = mockPagination(errorMessage, dataMock);
    expect(result.data).toBe(dataMock);

    expect(result.meta.errorMessage).toBe(errorMessage);
  });
});
