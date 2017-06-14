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
    expect(model.entries.get(entryId).start).toBe(startTime);
    expect(model.tasks.get(taskId).name).toBe(taskName);
  });
});