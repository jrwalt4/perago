import * as React from 'react';
import { connect } from 'react-redux';

import { PgAppState } from 'store';
import { setFilter } from 'store/actions';

export type TimecardFilterProps = {
  onFilterChange: React.ChangeEventHandler<HTMLInputElement>
} & React.HTMLProps<HTMLDivElement>;

export let TimecardFilterComponent = (props: TimecardFilterProps) => (
  <div className="TimecardFilter col">
    <label htmlFor="task">Task:</label>
    <input name="task" type="text" placeholder="Task Name" onChange={props.onFilterChange} />
    <button>This Week</button>
    <button>Last Week</button>
  </div>
);

export let TimecardFilter = connect(
  (state: PgAppState) => state,
  (dispatch) => ({
    onFilterChange: (ev: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setFilter(ev.target.value));
    }
  })
)(TimecardFilterComponent);
