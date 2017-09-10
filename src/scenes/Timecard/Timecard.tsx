import * as React from 'react';

import { AppContainer } from '../../components/AppContainer';
import { EntryList } from './components/EntryList';
import { RecentTasks } from './components/RecentTasks';
import { EntryDetail } from './components/EntryDetail';

import './Timecard.css';

export const Timecard = () => (
  <AppContainer
    primaryComponent={<EntryList />}
    sidebarComponent={<RecentTasks />}
    rightbarComponent={<EntryDetail />} />
);