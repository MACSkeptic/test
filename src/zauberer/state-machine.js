import _ from 'lodash';
import { Machine } from 'xstate';

const conditions = {
  valid: (state, event) => (
    _.every(_.pick(_.merge({}, state.data, event.data), ['name', 'quest', 'colour']))
  ),
  invalid: (state, event) => (
    !_.every(_.pick(_.merge({}, state.data, event.data), ['name', 'quest', 'colour']))
  )
};

const name = {
  on: {
    back: 'bridge',
    submit: 'quest',
    cancel: 'bridge'
  }
};

const quest = {
  on: {
    back: 'name',
    submit: 'colour',
    cancel: 'bridge'
  }
};

const colour = {
  on: {
    back: 'quest',
    abandon: 'name',
    submit: {
      'success': { cond: conditions.valid },
      'failure': { cond: conditions.invalid }
    },
    cancel: 'bridge'
  }
};

const bridge = {
  on: {
    submit: 'name'
  }
};

const success = {
};

const failure = {
};

const zauberer = {
  initial: 'bridge',
  states: {
    bridge,
    name,
    quest,
    colour,
    success,
    failure
  }
};

const empty = {
  on: {
    submit: {
      valid: { cond: conditions.valid },
      invalid: { cond: conditions.invalid }
    }
  }
};

const valid = {
  on: {
    submit: {
      invalid: { cond: conditions.invalid }
    }
  }
};

const invalid = {
  on: {
    submit: {
      valid: { cond: conditions.valid }
    }
  }
};

const data = {
  initial: 'empty',
  states: {
    empty,
    valid,
    invalid
  }
};

export const machineConfiguration = {
  parallel: true,
  states: { zauberer, data }
};

export const machine = Machine(machineConfiguration);
