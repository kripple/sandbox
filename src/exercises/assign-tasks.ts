import { List } from '@/data-structures/list';
import { isEmpty } from '@/utils/array-empty';

type TaskAssignments = { [worker: string]: string[] };
class WorkersList<T> extends List<T> {
  index: number;
  bookmark: number | undefined;

  constructor(list: Array<T>) {
    super(list);
    if (list.length === 0) throw TypeError('list is empty');
    this.index = 0;
  }

  setBookmark() {
    this.bookmark = this.index;
  }

  getBookmark() {
    return this.bookmark === undefined ? undefined : this.list[this.bookmark];
  }

  // advances index, last item loops back to first item
  step() {
    this.index = this.getNextIndex(this.index);
  }

  next() {
    const nextIndex = this.getNextIndex(this.index);
    return this.list[nextIndex];
  }

  current() {
    return this.list[this.index];
  }
}

function step<T>(list: WorkersList<T>, callbackFn: (listItem: T) => void) {
  callbackFn(list.current());
  list.step(); // mutates list (advances the index value)
  list.setBookmark();
}

function _assignTasks({
  workers,
  tasks,
}: {
  workers: WorkersList<string>;
  tasks: string[];
}) {
  const taskAssignments = {} as TaskAssignments;
  if (isEmpty(tasks)) {
    workers.setBookmark();
    return taskAssignments;
  }
  tasks.map((task) => {
    step(workers, (worker) => {
      if (!taskAssignments[worker]) taskAssignments[worker] = [];
      taskAssignments[worker].push(task);
    });
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
  if (isEmpty(tasks) && isEmpty(workers)) throw Error('missing workers');
  if (isEmpty(workers)) return {} as TaskAssignments;

  const workersList = new WorkersList(workers);
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
  if (
    isEmpty(workers) &&
    isEmpty(specialists) &&
    (tasks.length > 0 || specialTasks.length > 0)
  )
    throw Error('missing workers');

  if (isEmpty(specialists) && specialTasks.length > 0)
    throw Error('missing specialists');

  const emptyTaskAssignments = {} as TaskAssignments;
  if (isEmpty(workers) && isEmpty(specialists)) return emptyTaskAssignments;

  const workersList = new WorkersList(workers);
  const specialistsList = isEmpty(specialists)
    ? undefined
    : new WorkersList(specialists);
  const taskAssignments = specialistsList
    ? _assignTasks({
        workers: specialistsList,
        tasks: specialTasks,
      })
    : emptyTaskAssignments;

  tasks.map((task) => {
    const nextWorker = workersList.next();
    const lastSpecialist = specialistsList?.getBookmark();

    if (!taskAssignments[nextWorker]) taskAssignments[nextWorker] = [];
    if (lastSpecialist !== undefined && !taskAssignments[lastSpecialist])
      taskAssignments[lastSpecialist] = [];

    const assignToSpecialist =
      specialistsList !== undefined &&
      lastSpecialist !== undefined &&
      taskAssignments[nextWorker].length >
        taskAssignments[lastSpecialist].length;

    step(assignToSpecialist ? specialistsList : workersList, (worker) => {
      if (!taskAssignments[worker]) taskAssignments[worker] = [];
      taskAssignments[worker].push(task);
    });
  });

  return taskAssignments;
}
