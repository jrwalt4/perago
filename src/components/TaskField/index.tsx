import * as React from 'react';
import { connect } from 'react-redux';
import Select, { OnChangeHandler, Option, Options } from 'react-select';
import 'react-select/dist/react-select.css';

import { PgTask } from 'store/models/pg-task';
import { tasksArraySelector } from 'store/selectors';
import { PgAppState } from 'store';

export type TaskFieldOwnProps = {
  taskId?: string;
  isEditing?: boolean;
  selectableTasks?: Options<string>;
  onChange?(taskId?: string): void;
  onCreateTask?(name?: string): void;
};

type TaskFieldStateProps = {
  selectableTasks: Options<string>
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

  handleTaskChange: OnChangeHandler<string> = (newValue: Option<string> | null) => {
    if (newValue && this.props.onChange) {
      const { value } = newValue;
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
          <Select<string>
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
    selectableTasks: tasksArraySelector(state).map((pgTask: PgTask) => ({ value: pgTask._id, label: pgTask.name })),
    task: taskId ? state.model.tasks.get(taskId) : undefined
  }),
  null,
  (state, dispatch, props: TaskFieldOwnProps) => ({
    ...state,
    ...props
  } as TaskFieldProps)
)(TaskFieldComponent);
