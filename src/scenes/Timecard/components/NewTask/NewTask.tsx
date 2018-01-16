import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Option } from 'react-select';
import Modal, { ReactModalProps } from 'react-modal';

import { PgAppState } from 'store';
import { PgTask } from 'store/models';
import { PgAction, createTask } from 'store/actions';
import { TaskField } from 'components/TaskField';

import './NewTask.css';

interface NewTaskStateProps {

}

interface NewTaskDispatchProps {
  createNewTask: (task: Partial<PgTask>) => void;
}

export type NewTaskProps = {
  defaultName?: string;
  requestClose?(): void;
} & ReactModalProps;

export type NewTaskOwnProps = NewTaskProps & NewTaskDispatchProps;

export interface NewTaskState {
  newTaskName?: string;
  newTaskParentId?: string;
}

export class NewTaskComponent extends React.Component<NewTaskOwnProps, NewTaskState>
  implements React.ComponentLifecycle<NewTaskOwnProps, NewTaskState> {
  constructor(props: NewTaskOwnProps) {
    super(props);
    this.state = {
      newTaskName: props.defaultName || ''
    };
  }
  componentWillReceiveProps(props: NewTaskOwnProps) {
    this.setState({
      newTaskName: props.defaultName
    });
  }
  setTaskName = ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      newTaskName: currentTarget.value
    });
  }
  setParentTask = ({ value }: Option) => {
    this.setState({
      newTaskParentId: value as string
    });
  }
  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.createNewTask({
      name: this.state.newTaskName,
      parentId: this.state.newTaskParentId
    });
    if (this.props.requestClose) {
      this.props.requestClose();
    }
  }
  render() {
    if (this.props.isOpen) {
      return (
        <Modal contentLabel="New Task"
          overlayClassName="NewTask-overlay" className="NewTask-content"
          shouldCloseOnOverlayClick={true}
          {...this.props}>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Task Name</label>
              <input type="text" name="name" className="form-control"
                value={this.state.newTaskName}
                onChange={this.setTaskName} />
            </div>
            <div className="form-group">
              <label htmlFor="parent">Parent Task</label>
              <TaskField isEditing={true} taskId={this.state.newTaskParentId}
                onChange={this.setParentTask} />
            </div>
            <div className="NewTask-control-container">
              <button className="NewTask-control btn btn-danger" onClick={this.props.requestClose}>Cancel</button>
              <input className="NewTask-control btn btn-primary" type="submit" value="Create Task" />
            </div>
          </form>
        </Modal>
      );
    } else {
      return null;
    }
  }
}

export let NewTask = connect(
  (state: PgAppState) => ({

  }),
  (dispatch: Dispatch<PgAction>) => ({
    createNewTask: (task: Partial<PgTask>): void => {
      dispatch(createTask(task));
    }
  }),
  (stateProps: NewTaskStateProps, dispatchProps: NewTaskDispatchProps, props: NewTaskProps) => ({
    ...dispatchProps,
    ...props
  })
)(NewTaskComponent);
