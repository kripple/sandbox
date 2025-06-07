// `${driver} ${time}`
// slowest time (total time, not lap time) is eliminated every lap

// ties are both eliminated?

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
    let lastPlace: DriverTime | undefined;
    Object.entries(driverTimesCumulative).map(([driver, time]) => {
      if (!eliminationOrder.includes(driver)) {
        if (!lastPlace || lastPlace.time < time) {
          lastPlace = { driver, time };
        }
      }
    });
    if (lastPlace !== undefined) eliminationOrder.push(lastPlace.driver);
  });

  return eliminationOrder;
}
