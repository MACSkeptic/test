import React from 'react';
import { Grid, Page } from '@janus.team/janus-particles';
import { Prism } from '../shared';

const Debugger = (props) => (
  <Page.MainBodySection title={<label htmlFor="moreMagic">debugger</label>}>
    <Grid>
      <Grid.Cell xs={12} verticalGutters>
        <Prism>
          {JSON.stringify(props, null, '  ')}
        </Prism>
      </Grid.Cell>
    </Grid>
  </Page.MainBodySection>
);

export default Debugger;
