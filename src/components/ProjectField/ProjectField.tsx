import * as React from 'react';
import { connect } from 'react-redux';

import { PgAppState } from 'store';
import { taskProjectSelector } from 'store/selectors';

interface ProjectFieldProps {
  projectName: string;
}

export const ProjectField = (props: ProjectFieldProps) => (
  <span>{props.projectName}</span>
);

interface ConnectedProjectFieldProps {
  taskId: string;
}

export const ConnectedProjectField = connect<ProjectFieldProps, {}, ConnectedProjectFieldProps>(
  () => (state: PgAppState, props: ConnectedProjectFieldProps) => {
    let project = taskProjectSelector(state, props);
    return {
      projectName: (project && project.name) ? project.name : ''
    };
  }
)(ProjectField);
