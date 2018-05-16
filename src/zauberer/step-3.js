import _ from 'lodash';
import React from 'react';
import { Form, Button } from '@janus.team/janus-particles';
import { actions } from './actions';

const Step3 = ({ onSubmit, onChange, data: { colour }, ...actionHandlers }) => (
  <Form onSubmit={onSubmit}>
    <Form.Group label="What is your favourite colour?">
      <Form.Input
        onChange={onChange('colour')}
        checked={colour === 'purple'}
        type="radio"
        value="purple"
        name="colour"
        label="purple"
      />
      <Form.Input
        onChange={onChange('colour')}
        checked={colour === 'blue'}
        type="radio"
        value="blue"
        name="colour"
        label="blue"
      />
      <Form.Input
        onChange={onChange('colour')}
        checked={colour === 'green'}
        type="radio"
        value="green"
        name="colour"
        label="green"
      />
    </Form.Group>
    {actions(actionHandlers)}
  </Form>
);

export default Step3;
