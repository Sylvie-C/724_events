/**
 * @param {Date} date 
 * @returns {string} 
 */

import { getMonthData } from './index'; 

describe('getMonthData', () => {
  it('the function return janvier for 2022-01-01 as date', () => {
    const date = new Date(2022, 0, 1); // January = 0
    const result = getMonthData(date);

    // Check result
    expect(result).toBe("janvier"); // 'janvier' in MONTHS
  });
});

