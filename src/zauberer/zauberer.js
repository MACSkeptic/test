import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { machineConfiguration, machine } from './state-machine';
import Bridge from './bridge';
import { Grid, Page } from '@janus.team/janus-particles';
import Success from './success';
import Failure from './failure';
import Step1 from './step-1';
import Step2 from './step-2';
import Step3 from './step-3';
import Prism from './prism';
import Graph from './graph';

export const Zauberer = ({ machine, ...rest }) => ({
  bridge: (<Bridge machine={machine} {...rest} />),
  name: (<Step1 machine={machine} {...rest} />),
  quest: (<Step2 machine={machine} {...rest} />),
  colour: (<Step3 machine={machine} {...rest} />),
  success: (<Success machine={machine} {...rest} />),
  failure: (<Failure machine={machine} {...rest} />)
}[machine.value.zauberer] || (<Prism>{JSON.stringify(machine, null, '  ')}</Prism>));

const Debugger = (props) => (
  <Page.MainBodySection title="debugger">
    <input type="checkbox" />
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

export class State extends Component {
  state = {
    machine: machine.transition(machine, ''),
    data: { name: '', quest: '', colour: '' }
  };
  transition = (eventName, { data } = {}) => (
    this.setState((state) => ({
      data: _.merge({}, state.data, data),
      machine: machine.transition(state.machine.value, { type: eventName, data }, state)
    }))
  );
  onChange = (name) => ({ target: { value } }) => (
    this.transition('input', {
      data: { [name]: value }
    })
  );
  transitionPreventingDefault = (stateMachineTransitionName, browserEvent) => ([
    _.invoke(browserEvent, 'preventDefault'),
    this.transition(stateMachineTransitionName)
  ]);
  onSubmit = _.partial(this.transitionPreventingDefault, 'submit');
  onBack = _.partial(this.transitionPreventingDefault, 'back');
  onCancel = _.partial(this.transitionPreventingDefault, 'cancel');
  render = () => (
    <Page>
      <Page.Main>
        <Page.MainHeader withSections title="quest for the holy grail" />
        <Page.MainBody>
          <Page.MainBodySection title={`step: ${this.state.machine.value.zauberer}`}>
            <Zauberer
              {...this.state}
              {..._.pick(this, ['onChange', 'onCancel', 'onSubmit', 'onBack'])}
            />
          </Page.MainBodySection>
          <Debugger {...this.state} />
        </Page.MainBody>
      </Page.Main>
    </Page>
  );
}

