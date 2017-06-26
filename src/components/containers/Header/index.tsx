import * as React from 'react';

import './Header.css';

export let Header = () => (
  <div className="Header navbar sticky-top bg-primary">
    <ul className="nav">
      <li className="nav-item"><a className="nav-link">File</a></li>
      <li className="nav-item"><a className="nav-link">Edit</a></li>
      <li className="nav-item"><a className="nav-link">View</a></li>
      <li className="nav-item"><a className="nav-link">Help</a></li>
    </ul>
  </div>
);
