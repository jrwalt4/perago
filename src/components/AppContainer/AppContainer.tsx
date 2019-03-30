import * as React from 'react';

import { PgAppState } from 'store';
import { pathSelector } from 'store/selectors/router-selectors';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from '@material-ui/core/styles';

const drawerWidth = 200;
const pgAppStyles = (theme: Theme) => createStyles({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  appBarSpacer: theme.mixins.toolbar,
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth
  },
  primary: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: theme.zIndex.drawer + 1
  }
});

export interface AppContainerOwnProps {
  sidebarComponent?: JSX.Element;
  primaryComponent?: JSX.Element;
  rightbarComponent?: JSX.Element;
}

export interface AppContainerStateProps {
  isFetching: boolean;
  path: string;
}

export interface AppContainerDispatchProps {
  goTo(link: string): void;
}

export type AppContainerProps =
  AppContainerOwnProps &
  AppContainerStateProps &
  AppContainerDispatchProps &
  WithStyles<typeof pgAppStyles>;

function AppContainerComponent(props: AppContainerProps) {
  const { classes } = props;
  if (props.isFetching) {
    return <span>... loading</span>;
  }
  const sidebar = props.sidebarComponent && (
    <Drawer variant="permanent" className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
      <div className={classes.appBarSpacer} />
      {props.sidebarComponent}
    </Drawer>
  );
  const rightbar = props.rightbarComponent && (
    <Drawer variant="permanent" anchor="right" className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
      <div className={classes.appBarSpacer} />
      {props.rightbarComponent}
    </Drawer>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton><MenuIcon /></IconButton>
        </Toolbar>
      </AppBar>
      {sidebar}
      <main className={classes.primary}>
        <div className={classes.appBarSpacer} />
        {props.isFetching
          ? <Typography>... loading</Typography>
          : props.primaryComponent}
      </main>
      {rightbar}
      <div className={classes.footer}>
        <BottomNavigation
          onChange={(event, value: string) => {
            props.goTo(value);
          }}
          value={props.path}
          showLabels={true}
        >
          <BottomNavigationAction label="Timecard" value="timecard" />
          <BottomNavigationAction label="Schedule" value="schedule" />
          <BottomNavigationAction label="Database" value="database" />
        </BottomNavigation>
      </div>
    </div>
  );
}

export const AppContainer = connect<
  AppContainerStateProps,
  AppContainerDispatchProps,
  AppContainerOwnProps,
  PgAppState>(
    (state: PgAppState) => ({
      isFetching: state.view.isFetchingData,
      path: pathSelector(state)
    }),
    (dispatch) => ({
      goTo: (link) => {
        dispatch(push(link));
      }
    })
  )(withStyles(pgAppStyles)(AppContainerComponent));
