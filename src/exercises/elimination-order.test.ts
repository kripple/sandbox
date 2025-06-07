import { expect, test } from '@playwright/test';

import { getEliminationOrder } from '@/exercises/elimination-order';

test.describe('getEliminationOrder', () => {
  test('returns a list of drivers', () => {
    const laps = [
      ['driver-1 10', 'driver-2 20'],
      ['driver-1 10', 'driver-2 20'],
    ];
    const actual = getEliminationOrder(laps);
    const expected = ['driver-2', 'driver-1'];
    expect(actual).toEqual(expected);
  });

  test('uses total time, not lap time', () => {
    const laps = [
      ['driver-1 10', 'driver-2 20', 'driver-3 30', 'driver-4 40'],
      ['driver-1 40', 'driver-2 20', 'driver-3 30', 'driver-4 70'],
      ['driver-1 20', 'driver-2 20', 'driver-3 20', 'driver-4 20'],
      ['driver-1 20', 'driver-2 10', 'driver-3 20', 'driver-4 20'],
    ];
    const actual = getEliminationOrder(laps);
    const expected = ['driver-4', 'driver-3', 'driver-1', 'driver-2'];
    expect(actual).toEqual(expected);
  });
});
