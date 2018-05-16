import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
import '@janus.team/janus-particles/dist/particles.css';
import './index.css';

import * as zauberer from './zauberer/zauberer';
import * as wizard from './wizard/wizard';

const App = () => (
  /vanilla/.test(window.location.search) ? (<wizard.State />) : (<zauberer.State />)
);

export default App;
