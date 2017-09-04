import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Option } from 'react-select';
import Modal, { ReactModalProps } from 'react-modal';
Modal.setAppElement('#root');

import { PgAppState } from '../../../store';
import { PgTask } from '../../../store/models';
import { PgAction, createTask } from '../../../store/actions';

import './NewTask.css';
import { TaskField } from '../TaskField';

interface NewTaskStateProps {

}

interface NewTaskDispatchProps {
  createNewTask: (task: Partial<PgTask>) => void;
}

export type NewTaskProps = {
  defaultName?: string;
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
  setParentTask = ({ value }: Option) => {
    this.setState({
      newTaskParentId: value as string
    });
  }
  render() {
    return (
      <Modal isOpen={this.props.isOpen} contentLabel="New Task"
        overlayClassName="NewTask-overlay" className="NewTask-content">
        <form>
          <div className="form-group">
            <label htmlFor="name">Task Name</label>
            <input type="text" name="name" className="form-control"
              defaultValue={this.state.newTaskName} />
          </div>
          <div className="form-group">
            <label htmlFor="parent">Parent Task</label>
            <TaskField isEditing={true} taskId={this.state.newTaskParentId}
              onChange={this.setParentTask} />
          </div>
        </form>
      </Modal>
    );
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
