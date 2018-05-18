import _ from 'lodash';
import React from 'react';
import { machineConfiguration } from './state-machine';
import { Grid, Page } from '@janus.team/janus-particles';
import { Prism } from '../shared';
import Graph from './graph';

const Debugger = (props) => (
  <Page.MainBodySection title={<label htmlFor="moreMagic">debugger</label>}>
    <Grid>
      <Grid.Cell xs={12} verticalGutters>
        <Prism>
          {JSON.stringify(_.pick(props, ['data', 'machine.value', 'machine.actions']), null, '  ')}
        </Prism>
      </Grid.Cell>
      <Grid.Cell xs={7} verticalGutters>
        <Graph machine={machineConfiguration.states.zauberer} />
      </Grid.Cell>
      <Grid.Cell xs={5} verticalGutters>
        <Graph machine={machineConfiguration.states.data} />
      </Grid.Cell>
    </Grid>
  </Page.MainBodySection>
);

export default Debugger;
