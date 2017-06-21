import * as React from 'react';

import './Header.css';

export let Header = () => (
  <div className="Header navbar sticky-top bg-primary">
    <ul className="nav">
      <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
      <li className="nav-item"><a className="nav-link" href="#">About</a></li>
      <li className="nav-item"><a className="nav-link" href="#">Help</a></li>
    </ul>
  </div>
);
