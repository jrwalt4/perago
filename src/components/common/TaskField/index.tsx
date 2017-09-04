import * as React from 'react';
import { connect } from 'react-redux';
import * as Select from 'react-select';
import 'react-select/dist/react-select.css';

import { PgTask } from '../../../store/models';
import { PgAppState } from '../../../store';

export type TaskFieldProps = {
  taskId?: string;
  isEditing?: boolean;
  selectableTasks?: Select.Options;
  onChange?: Select.OnChangeHandler;
  onCreateTask?(name?: string): void;
};

type TaskFieldStateProps = {
  selectableTasks: Select.Options
  task: PgTask
};

type TaskFieldOwnProps = TaskFieldProps & TaskFieldStateProps;

export type TaskFieldState = {
  currentSearchTaskName?: string
};

export class TaskFieldComponent extends React.Component<TaskFieldOwnProps, TaskFieldState> {
  constructor(props: TaskFieldOwnProps) {
    super(props);
    this.state = {
      currentSearchTaskName: ''
    };
  }

  updateSearchTaskName = (name: string) => {
    this.setState({
      currentSearchTaskName: name
    });
  }

  onClickCreateTask = () => {
    if (this.props.onCreateTask) {
      this.props.onCreateTask(this.state.currentSearchTaskName);
    }
  }

  render() {
    let taskId = this.props.task && this.props.task._id;
    let taskName = this.props.task ? this.props.task.name : '-';
    if (this.props.isEditing) {
      return (
        <div>
          <Select value={taskId} options={this.props.selectableTasks} clearable={false}
            noResultsText={(
              <i onClick={this.onClickCreateTask}>Create Task: {this.state.currentSearchTaskName}</i>
            )}
            onChange={this.props.onChange} ignoreCase={true}
            onInputChange={this.updateSearchTaskName} />
        </div>
      );
    }
    return <span>{taskName}</span>;
  }
}

export let TaskField = connect(
  ({ model }: PgAppState, { taskId }: TaskFieldProps) => ({
    selectableTasks: model.tasks.toArray().map((pgTask) => ({ value: pgTask._id, label: pgTask.name })),
    task: taskId && model.tasks.get(taskId)
  }),
  null,
  (state, dispatch, props: TaskFieldProps) => ({
    ...state,
    ...props
  } as TaskFieldProps)
)(TaskFieldComponent);
