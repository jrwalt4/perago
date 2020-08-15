import { from as modelFrom, getEntry, getTask, getActiveEntries } from './pg-model';

describe('PgModel', () => {
  it('should create a PgModel', () => {
    let taskName = 'Task 1';
    let startTime = Date.now();
    let taskId = '1';
    let entryId = '2';
    let tasks = [
      {
        _id: taskId,
        name: taskName
      }
    ];
    let entries = [
      {
        _id: entryId,
        start: startTime
      }
    ];

    let model = modelFrom({ tasks, entries });

    let pgEntry = getEntry(model, entryId);
    expect(pgEntry).not.toBeUndefined();
    expect(pgEntry.start).toBe(startTime);

    let pgTask = getTask(model, taskId);
    expect(pgTask).not.toBeUndefined();
    expect(pgTask.name).toBe(taskName);
  });

  it('Should return the active entries', () => {
    const today = Date.now();
    let model = modelFrom({
      entries: [
        { _id: '1', start: today, end: today },
        { _id: '2', start: today },
        { _id: '3', start: today, end: today }
      ],
      tasks: []
    });
    let activeEntries = getActiveEntries(model);
    expect(activeEntries.size).toEqual(1);
    expect(activeEntries.get('2')).not.toBeUndefined();
  });

  it('sets the date on both start and end', () => {
    // 
  });
});
