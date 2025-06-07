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

  laps.map((driverTimes) => {
    let lastPlace: DriverTime | undefined;

    // find the largest time, excluding drivers that have already been eliminated
    driverTimes.map((driverTime) => {
      const currentDriverTime = parseDriverTime(driverTime);
      if (!eliminationOrder.includes(currentDriverTime.driver)) {
        if (!lastPlace || lastPlace.time < currentDriverTime.time) {
          lastPlace = currentDriverTime;
        }
      }
    });

    if (lastPlace !== undefined) eliminationOrder.push(lastPlace.driver);
  });

  return eliminationOrder;
}
