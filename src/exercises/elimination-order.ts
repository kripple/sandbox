import { sortByAlphabet } from '@/utils/array-sort';

type DriverTime = {
  driver: string;
  time: number;
};

const parseDriverTime = (value: string): DriverTime => {
  const [driver, time] = value.split(' ');
  return { driver, time: parseInt(time) };
};

export function getEliminationOrder(laps: string[][]) {
  const eliminationOrder = [] as string[];
  const driverTimesCumulative = {} as { [driver: string]: number };

  // find the largest time, excluding drivers that have already been eliminated
  laps.map((driverTimes) => {
    driverTimes.map((driverTime) => {
      const { driver, time } = parseDriverTime(driverTime);
      if (!eliminationOrder.includes(driver)) {
        if (!(driver in driverTimesCumulative)) {
          driverTimesCumulative[driver] = time;
        } else {
          driverTimesCumulative[driver] += time;
        }
      }
    });

    // eliminate slowest driver
    const lastPlace = { time: 0, drivers: [] } as {
      time: number;
      drivers: string[];
    };
    Object.entries(driverTimesCumulative).map(([driver, time]) => {
      if (!eliminationOrder.includes(driver)) {
        if (lastPlace.time < time) {
          lastPlace.time = time;
          lastPlace.drivers = [driver];
        } else if (lastPlace.time === time) {
          lastPlace.drivers.push(driver);
        }
      }
    });

    if (lastPlace.drivers.length > 0)
      eliminationOrder.push(...sortByAlphabet(lastPlace.drivers));
  });

  return eliminationOrder;
}
