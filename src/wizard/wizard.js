import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { Grid, Page } from '@janus.team/janus-particles';
import { Prism, Success, Failure, Bridge, Step1, Step2, Step3 } from '../shared';

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

export const Wizard = ({ currentStep, ...rest }) => ({
  bridge: (<Bridge {...rest} />),
  name: (<Step1 {...rest} />),
  quest: (<Step2 {...rest} />),
  colour: (<Step3 {...rest} />),
  success: (<Success {...rest} />),
  failure: (<Failure {...rest} />)
}[currentStep] || (<Prism>{JSON.stringify(currentStep, null, '  ')}</Prism>));

export class State extends Component {
  state = {
    currentStep: 'bridge',
    data: { name: '', quest: '', colour: '' }
  };
  onChange = (name) => ({ target: { value } }) => (
    this.setState({
      data: _.merge({}, this.state.data, { [name]: value })
    })
  );
  onSubmit = (event) => {
    _.invoke(event, 'preventDefault');
    const currentStep = (({
      bridge: () => 'name',
      name: () => 'quest',
      quest: () => 'colour',
      colour: () => (
        _.every(_.pick(this.state.data, ['name', 'quest', 'colour'])) ? 'success' : 'failure'
      )
    }[this.state.currentStep]) || (() => this.state.currentStep))();
    this.setState({ currentStep });
  };
  onBack = (event) => {
    _.invoke(event, 'preventDefault');
    const currentStep = (({
      name: () => 'bridge',
      quest: () => 'name',
      colour: () => 'quest'
    }[this.state.currentStep]) || (() => this.state.currentStep))();
    this.setState({ currentStep });
  };
  onCancel = (event) => {
    _.invoke(event, 'preventDefault');
    this.setState({ currentStep: 'bridge' });
  };
  onAbandon = (event) => {
    _.invoke(event, 'preventDefault');
    this.setState({ currentStep: 'name' });
  };
  render = () => (
    <Page>
      <Page.Main>
        <Page.MainHeader withSections title={<label htmlFor="magic">quest for the holy grail</label>} />
        <input id="magic" name="debugger" type="checkbox" style={{ display: 'none' }} />
        <Page.MainBody>
          <Page.MainBodySection title={`step: ${this.state.currentStep}`}>
            <Wizard
              {...this.state}
              {..._.pick(this, ['onChange', 'onCancel', 'onSubmit', 'onBack', 'onAbandon'])}
            />
          </Page.MainBodySection>
          <Debugger {...this.state} />
        </Page.MainBody>
      </Page.Main>
    </Page>
  );
}
