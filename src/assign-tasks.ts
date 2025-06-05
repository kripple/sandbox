// loop back to the beginning of the array
const getNextIndex = (arrayLength: number, currentIndex: number) => {
  if (currentIndex === arrayLength - 1) {
    return 0;
  } else {
    return currentIndex + 1;
  }
};

export function assignTasks({
  workers,
  tasks,
}: {
  workers: string[];
  tasks: string[];
}) {
  if (workers.length === 0) throw Error('No available workers.');
  const taskAssignments = {} as { [worker: string]: string[] };

  let workerIndex = 0;
  tasks.map((task) => {
    const worker = workers[workerIndex];
    if (!taskAssignments[worker]) taskAssignments[worker] = [];
    taskAssignments[worker].push(task);
    workerIndex = getNextIndex(workers.length, workerIndex);
  });

  return taskAssignments;
}

export function assignAllTasks({
  workers,
  specialists,
  tasks,
  specialTasks,
}: {
  workers: string[];
  specialists: string[];
  tasks: string[];
  specialTasks: string[];
}) {
  if (
    workers.length === 0 &&
    specialists.length === 0 &&
    (tasks.length > 0 || specialTasks.length > 0)
  )
    throw Error('No available workers.');
  if (specialists.length === 0 && specialTasks.length > 0)
    throw Error('No available specialists.');

  const taskAssignments = {} as { [worker: string]: string[] };
  let lastWorker: string | undefined;
  let minTaskCount = 0;

  let specialistIndex = 0;
  for (let i = 0; i < specialTasks.length; i++) {
    const task = specialTasks[i];
    const worker = specialists[specialistIndex];
    if (!taskAssignments[worker]) taskAssignments[worker] = [];
    taskAssignments[worker].push(task);
    if (i === specialTasks.length - 1) {
      // save our place
      lastWorker =
        specialistIndex in specialists
          ? specialists[specialistIndex]
          : undefined;
      minTaskCount =
        lastWorker && lastWorker in taskAssignments
          ? taskAssignments[lastWorker].length
          : 0;
    }
    specialistIndex = getNextIndex(specialists.length, specialistIndex);
  }

  let workerIndex = 0;
  for (let j = 0; j < tasks.length; j++) {
    const task = tasks[j];
    const worker = workers[workerIndex];
    if (!taskAssignments[worker]) taskAssignments[worker] = [];

    // assign regular tasks to specialists
    if (
      specialists.length > 0 &&
      taskAssignments[worker].length > minTaskCount
    ) {
      const worker = specialists[specialistIndex];
      if (!taskAssignments[worker]) taskAssignments[worker] = [];
      taskAssignments[worker].push(task);
      specialistIndex = getNextIndex(specialists.length, specialistIndex);
    } else {
      taskAssignments[worker].push(task);
      workerIndex = getNextIndex(workers.length, workerIndex);
    }
  }

  // console.debug(taskAssignments);
  return taskAssignments;
}
