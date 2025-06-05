import { List } from '@/utils/linked-list';

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
  const taskAssignments = {} as { [worker: string]: string[] };
  if (tasks.length === 0) return taskAssignments;

  const workersList = new List(workers);
  if (workersList.isEmpty()) throw Error('missing workers');

  // let minTaskCount = 0;
  // let workerIndex = 0;

  tasks.map((task, i) => {
    const worker = workersList.getNext();
    // const worker = workers[workerIndex];
    if (!taskAssignments[worker]) taskAssignments[worker] = [];
    taskAssignments[worker].push(task);

    // if (i === tasks.length - 1) {
    //   // save our place
    //   const lastWorker =
    //     workerIndex in workers ? workers[workerIndex] : undefined;
    //   minTaskCount =
    //     lastWorker && lastWorker in taskAssignments
    //       ? taskAssignments[lastWorker].length
    //       : 0;
    // }
    // workerIndex = getNextIndex(workers.length, workerIndex);
  });

  return taskAssignments;
}

// export function assignAllTasks({
//   workers,
//   specialists,
//   tasks,
//   specialTasks,
// }: {
//   workers: string[];
//   specialists: string[];
//   tasks: string[];
//   specialTasks: string[];
// }) {
//   if (
//     workers.length === 0 &&
//     specialists.length === 0 &&
//     (tasks.length > 0 || specialTasks.length > 0)
//   )
//     throw Error('No available workers.');
//   if (specialists.length === 0 && specialTasks.length > 0)
//     throw Error('No available specialists.');

//   const {
//     taskAssignments,
//     minTaskCount,
//     workerIndex: initialSpecialistIndex,
//   } = assignTasks({
//     workers: specialists,
//     tasks: specialTasks,
//   });
//   let specialistIndex = initialSpecialistIndex;

//   let workerIndex = 0;
//   tasks.map((task) => {
//     const worker = workers[workerIndex];
//     if (!taskAssignments[worker]) taskAssignments[worker] = [];

//     // assign regular tasks to specialists
//     if (
//       specialists.length > 0 &&
//       taskAssignments[worker].length > minTaskCount
//     ) {
//       const worker = specialists[specialistIndex];
//       if (!taskAssignments[worker]) taskAssignments[worker] = [];
//       taskAssignments[worker].push(task);
//       specialistIndex = getNextIndex(specialists.length, specialistIndex);
//     } else {
//       taskAssignments[worker].push(task);
//       workerIndex = getNextIndex(workers.length, workerIndex);
//     }
//   });

//   // console.debug(taskAssignments);
//   return taskAssignments;
// }
