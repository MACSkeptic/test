import _ from 'lodash';
import React, { Component } from 'react';
import { machine } from './state-machine';
import { Page } from '@janus.team/janus-particles';
import { Prism, Success, Failure, Bridge, Step1, Step2, Step3 } from '../shared';
import Debugger from './debugger';
import { empty } from '../shared/data';

export const Zauberer = ({ machine, ...rest }) => ({
  bridge: (<Bridge machine={machine} {...rest} />),
  name: (<Step1 machine={machine} {...rest} />),
  quest: (<Step2 machine={machine} {...rest} />),
  colour: (<Step3 machine={machine} {...rest} />),
  success: (<Success machine={machine} {...rest} />),
  failure: (<Failure machine={machine} {...rest} />)
}[machine.value.zauberer] || (<Prism>{JSON.stringify(machine, null, '  ')}</Prism>));

export class State extends Component {
  state = {
    machine: machine.transition(machine, ''),
    data: empty()
  };
  transition = (eventName, { data } = {}) => (
    this.setState((state) => ({
      data: _.merge({}, state.data, data),
      machine: machine.transition(state.machine.value, { type: eventName, data }, state)
    }))
  );

  onChange = (name) => ({ target: { value } }) => (
    this.transition('input', { data: { [name]: value } })
  );

  transitionPreventingDefault = (stateMachineTransitionName, browserEvent) => ([
    _.invoke(browserEvent, 'preventDefault'),
    this.transition(stateMachineTransitionName)
  ]);
  onSubmit = _.partial(this.transitionPreventingDefault, 'next');
  onBack = _.partial(this.transitionPreventingDefault, 'back');
  onCancel = _.partial(this.transitionPreventingDefault, 'cancel');
  onAbandon = _.partial(this.transitionPreventingDefault, 'abandon');

  componentDidUpdate = (previousProps, previousState) => (
    (previousState.machine.actions !== this.state.machine.actions) &&
    _.map(this.state.machine.actions, _.partial(_.invoke, this))
  );

  clearData = () => this.setState({ data: empty() });

  render = () => (
    <Page>
      <Page.Main>
        <Page.MainHeader withSections title={<label htmlFor="magic">quest for the holy grail</label>} />
        <input id="magic" name="debugger" type="checkbox" style={{ display: 'none' }} />
        <input id="moreMagic" name="graph" type="checkbox" style={{ display: 'none' }} />
        <Page.MainBody>
          <Page.MainBodySection title={`step: ${this.state.machine.value.zauberer}`}>
            <Zauberer
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

