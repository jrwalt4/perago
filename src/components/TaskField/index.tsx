import * as React from 'react';
import { connect } from 'react-redux';
import * as Select from 'react-select';
import 'react-select/dist/react-select.css';

import { PgTask } from 'store/models';
import { tasksArraySelector } from 'store/selectors';
import { PgAppState } from 'store';

export type TaskFieldOwnProps = {
  taskId?: string;
  isEditing?: boolean;
  selectableTasks?: Select.Options;
  onChange?(taskId?: string): void;
  onCreateTask?(name?: string): void;
};

type TaskFieldStateProps = {
  selectableTasks: Select.Options
  task?: PgTask
};

type TaskFieldProps = TaskFieldOwnProps & TaskFieldStateProps;

export type TaskFieldState = {
  currentSearchTaskName?: string
};

export class TaskFieldComponent extends React.Component<TaskFieldProps, TaskFieldState> {
  constructor(props: TaskFieldProps) {
    super(props);
    this.state = {
      currentSearchTaskName: ''
    };
  }

  updateSearchTaskName = (name: string) => {
    this.setState({
      currentSearchTaskName: name
    });
    // return unchanged value
    return name;
  }

  handleTaskChange: Select.OnChangeHandler = ({ value }: Select.Option<string>) => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
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
          <Select.default
            value={taskId}
            options={this.props.selectableTasks}
            clearable={false}
            noResultsText={(
              <i onClick={this.onClickCreateTask}>Create Task: {this.state.currentSearchTaskName}</i>
            )}
            onChange={this.handleTaskChange} ignoreCase={true}
            onInputChange={this.updateSearchTaskName}
          />
        </div>
      );
    }
    return <span>{taskName}</span>;
  }
}

export const TaskField = connect<TaskFieldStateProps, null, TaskFieldOwnProps, TaskFieldProps, PgAppState>(
  (state: PgAppState, { taskId }: TaskFieldOwnProps) => ({
    selectableTasks: tasksArraySelector(state).map((pgTask) => ({ value: pgTask._id, label: pgTask.name })),
    task: taskId ? state.model.tasks.get(taskId) : undefined
  }),
  null,
  (state, dispatch, props: TaskFieldProps) => ({
    ...state,
    ...props
  } as TaskFieldProps)
)(TaskFieldComponent);
