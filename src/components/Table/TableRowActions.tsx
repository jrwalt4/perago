import * as React from 'react';

import MIconButton from '@material-ui/core/IconButton';
import MMenu from '@material-ui/core/Menu';
import MMenuItem from '@material-ui/core/MenuItem';
import MMoreVertIcon from '@material-ui/icons/MoreVert';

export interface UserRowAction<T> {
  icon: React.FunctionComponent | React.ComponentClass | React.ReactNode;
  onClick: (item: T) => void;
}

interface TableRowActionsProps<T> {
  item: T;
  actions: UserRowAction<T>[];
}

interface TableRowActionsState<T> {
  anchorEl: HTMLElement | null;
}

enum OnCloseReasons {
  ESCAPE = 'escapeKeyDown',
  CLICK = 'backdropClick',
  TAB = 'tabKeyDown'
}

export class TableRowActions<T> extends React.Component<TableRowActionsProps<T>, TableRowActionsState<T>> {

  state: TableRowActionsState<T> = {
    anchorEl: null
  };

  handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  handleActionClick: React.MouseEventHandler<HTMLElement> = (event) => {
    // event.stopPropagation();
    let actionIndexString = event.currentTarget.dataset.actionIndex;
    if (null != actionIndexString) {
      let actionIndex = parseInt(actionIndexString, 10);
      let action = this.props.actions[actionIndex];
      if (null != action && typeof action.onClick === 'function') {
        action.onClick(this.props.item);
      }
    }
  }

  handleClose = (event: React.SyntheticEvent, reason?: OnCloseReasons) => {
    if (reason === OnCloseReasons.CLICK) {
      event.stopPropagation();
    }
    this.setState({
      anchorEl: null
    });
  }

  render() {
    return (
      <React.Fragment>
        <MIconButton
          onClick={this.handleClick}
        >
          <MMoreVertIcon />
        </MIconButton>
        <MMenu
          open={Boolean(this.state.anchorEl)}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
        >
          {this.props.actions.map(({ onClick, icon }, index) => {
            let ActionIcon: React.ReactNode = React.isValidElement(icon) ? icon :
              React.createElement(icon as React.FunctionComponent | React.ComponentClass);

            return (
              <MMenuItem
                key={index}
                onClick={this.handleActionClick}
                data-action-index={index}
              >
                {ActionIcon}
              </MMenuItem>
            );
          })}
        </MMenu>
      </React.Fragment>);
  }
}
