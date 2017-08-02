import * as React from 'react';
import * as Select from 'react-select';
import 'react-select/dist/react-select.css';

import { PgTask } from '../../../store/models';

export type TaskFieldProps = {
    task?: PgTask;
    isEditing?: boolean;
    selectableTasks?: Select.Options;
    onChange?: Select.OnChangeHandler;
};

export type TaskFieldState = {
    selectOptions: Select.Options;
};

export function TaskField({ task, isEditing, selectableTasks, onChange }: TaskFieldProps) {
    let taskId = task && task._id;
    let taskName = task ? task.name : '-';
    if (isEditing) {
        return <Select value={taskId} options={selectableTasks} clearable={false} onChange={onChange} />;
    }
    return <span>{taskName}</span>;
}