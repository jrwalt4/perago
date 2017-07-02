import { PgModel } from './pg-model';

describe('PgModel', () => {
  it('should create a PgModel', () => {
    let taskName = 'Task 1';
    let startTime = new Date;
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

    let model = PgModel.from({ tasks, entries });

    let pgEntry = model.entries.get(entryId);
    expect(pgEntry).not.toBeUndefined();
    expect(pgEntry.start).toBe(startTime);

    let pgTask = model.tasks.get(taskId);
    expect(pgTask).not.toBeUndefined();
    expect(pgTask.name).toBe(taskName);
  });

  it('Should return the active entries', () => {
    let model = PgModel.from({
      entries: [
        { _id: '1', start: new Date, end: new Date },
        { _id: '2', start: new Date },
        { _id: '3', start: new Date, end: new Date }
      ],
      tasks: []
    });
    let activeEntries = PgModel.getActiveEntries(model);
    expect(activeEntries.size).toEqual(1);
    expect(activeEntries.get('2')).not.toBeUndefined();
  });
});