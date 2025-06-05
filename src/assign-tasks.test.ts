import { expect, test } from '@playwright/test';

import { assignAllTasks, assignTasks } from './assign-tasks';

const fill = (label: string, count: number) =>
  new Array(count).fill(0).map((_, i) => `${label}-${i + 1}`);
const getProps = ({
  workers = 0,
  specialists = 0,
  tasks = 0,
  specialTasks = 0,
}: {
  workers?: number;
  specialists?: number;
  tasks?: number;
  specialTasks?: number;
}) => ({
  tasks: fill('task', tasks),
  specialists: fill('specialist', specialists),
  workers: fill('worker', workers),
  specialTasks: fill('special-task', specialTasks),
});

test.describe('assignTasks', () => {
  test('assigns tasks', () => {
    const tasks = ['task'];
    const workers = ['worker'];
    const actual = assignTasks({ tasks, workers });
    const expected = {
      worker: ['task'],
    };
    expect(actual).toEqual(expected);
  });

  test('assigns all tasks', () => {
    const actual = assignTasks(
      getProps({
        tasks: 3,
        workers: 2,
      }),
    );
    const total = actual['worker-1'].length + actual['worker-2'].length;
    expect(total).toBe(3);
  });

  test('assigns tasks to all workers', () => {
    const actual = assignTasks(
      getProps({
        tasks: 7,
        workers: 5,
      }),
    );

    Object.values(actual).map((assignedTasks) => {
      expect(assignedTasks.length).toBeGreaterThanOrEqual(1);
      expect(assignedTasks.length).toBeLessThanOrEqual(2);
    });
  });
});

test.describe('assignAllTasks', () => {
  test('assigns tasks', () => {
    const tasks = ['task'];
    const specialTasks = [] as string[];
    const workers = ['worker'];
    const specialists = [] as string[];
    const actual = assignAllTasks({
      tasks,
      specialTasks,
      workers,
      specialists,
    });
    const expected = {
      worker: ['task'],
    };
    expect(actual).toEqual(expected);
  });

  test('assigns all tasks', () => {
    const actual = assignAllTasks(
      getProps({
        tasks: 3,
        workers: 2,
      }),
    );
    const total = actual['worker-1'].length + actual['worker-2'].length;
    expect(total).toBe(3);
  });

  test('assigns tasks to all workers', () => {
    const actual = assignAllTasks(
      getProps({
        tasks: 7,
        workers: 5,
      }),
    );

    Object.values(actual).map((assignedTasks) => {
      expect(assignedTasks.length).toBeGreaterThanOrEqual(1);
      expect(assignedTasks.length).toBeLessThanOrEqual(2);
    });
  });

  test('assigns special tasks', () => {
    const tasks = ['task'];
    const specialTasks = ['special-task'];
    const workers = ['worker'];
    const specialists = ['specialist'];
    const actual = assignAllTasks({
      tasks,
      specialTasks,
      workers,
      specialists,
    });
    const expected = {
      worker: ['task'],
      specialist: ['special-task'],
    };
    expect(actual).toEqual(expected);
  });

  test('assigns tasks equally', () => {
    const actual = assignAllTasks(
      getProps({
        tasks: 7,
        specialTasks: 7,
        workers: 5,
        specialists: 2,
      }),
    );

    // expect specialists to have 3-4 tasks and workers to have 1-2 tasks
    Object.entries(actual).map(([worker, assignedTasks]) => {
      if (worker.includes('specialist')) {
        expect(assignedTasks.length).toBeGreaterThanOrEqual(3);
        expect(assignedTasks.length).toBeLessThanOrEqual(4);
      } else {
        expect(assignedTasks.length).toBeGreaterThanOrEqual(1);
        expect(assignedTasks.length).toBeLessThanOrEqual(2);
      }
    });
  });

  test('assigns regular tasks to specialists', () => {
    const actual = assignAllTasks(
      getProps({
        tasks: 3,
        workers: 1,
        specialists: 2,
      }),
    );

    expect(Object.entries(actual)).toHaveLength(3);
    Object.values(actual).map((assignedTasks) => {
      expect(assignedTasks.length).toBeGreaterThanOrEqual(1);
      expect(assignedTasks.length).toBeLessThanOrEqual(2);
    });
  });
});
