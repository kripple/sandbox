import { List } from '@/models/list';

function _assignTasks({
  workers,
  tasks,
}: {
  workers: List<string>;
  tasks: string[];
}) {
  const taskAssignments = {} as { [worker: string]: string[] };
  if (tasks.length === 0) return taskAssignments;

  tasks.map((task) => {
    const worker = workers.next(); // mutates workersList (advances the index value)
    if (!worker) return;
    if (!taskAssignments[worker]) taskAssignments[worker] = [];
    taskAssignments[worker].push(task);
  });

  return taskAssignments;
}

export function assignTasks({
  workers,
  tasks,
}: {
  workers: string[];
  tasks: string[];
}) {
  const workersList = new List(workers);
  if (tasks.length === 0 && workersList.isEmpty())
    throw Error('missing workers');
  return _assignTasks({ workers: workersList, tasks });
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
  const workersList = new List(workers);
  const specialistsList = new List(specialists);

  if (
    workersList.isEmpty() &&
    specialistsList.isEmpty() &&
    (tasks.length > 0 || specialTasks.length > 0)
  )
    throw Error('missing workers');

  if (specialistsList.isEmpty() && specialTasks.length > 0)
    throw Error('missing specialists');

  const taskAssignments = _assignTasks({
    workers: specialistsList,
    tasks: specialTasks,
  });

  tasks.map((task) => {
    const worker = workersList.nextValue();
    const lastSpecialist = specialistsList.previousValue();

    if (!worker) return;
    if (!taskAssignments[worker]) taskAssignments[worker] = [];
    if (lastSpecialist !== undefined && !taskAssignments[lastSpecialist])
      taskAssignments[lastSpecialist] = [];

    const assignToSpecialist =
      !specialistsList.isEmpty() &&
      lastSpecialist !== undefined &&
      taskAssignments[worker].length > taskAssignments[lastSpecialist].length;

    const selectedWorker = assignToSpecialist
      ? specialistsList.next()
      : workersList.next();
    if (!selectedWorker) return;
    if (!taskAssignments[selectedWorker]) taskAssignments[selectedWorker] = [];
    taskAssignments[selectedWorker].push(task);
  });

  return taskAssignments;
}
