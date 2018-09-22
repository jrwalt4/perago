import * as React from 'react';
import { Link } from 'react-router-dom';

export let Footer = () => (
  <div className="navbar fixed-bottom bg-faded">
    <ul className="nav">
      <li className="nav-item"><Link className="nav-link" to="timecard">Timecard</Link></li>
      <li className="nav-item"><Link className="nav-link" to="schedule">Schedule</Link></li>
      <li className="nav-item"><Link className="nav-link" to="database">Database</Link></li>
    </ul>
  </div>
);
