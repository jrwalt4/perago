import * as React from 'react';

import { AppContainer } from 'components/AppContainer';
import { EntryList } from 'scenes/Timecard/components/EntryList';
import { RecentTasks } from 'scenes/Timecard/components/RecentTasks';
import { EntryDetail } from 'scenes/Timecard/components/EntryDetail';

import './Timecard.css';

export const Timecard = () => (
  <AppContainer
    primaryComponent={<EntryList />}
    sidebarComponent={<RecentTasks />}
    rightbarComponent={<EntryDetail />} />
);