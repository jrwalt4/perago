import * as React from 'react';

import { PgTask } from '../../../store/models';

export type TaskFieldProps = {
  task?: PgTask;
  isEditing?: boolean;
  taskSelectionOptions?: { _id: string, name: string }[];
};

export class TaskField extends React.Component<TaskFieldProps, {}> {
  render() {
    let taskName = this.props.task ? this.props.task.name : '-';
    if (this.props.isEditing) {
      return <input />;
    }
    return <span>{taskName}</span>;
  }
}