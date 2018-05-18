import React from 'react';
import { Form } from '@janus.team/janus-particles';
import { actions } from './actions';

const Step1 = ({ onSubmit, onChange, data: { name }, ...actionHandlers }) => (
  <Form onSubmit={onSubmit}>
    <Form.Input
      onChange={onChange('name')}
      value={name}
      label="What is your name?"
      type="text"
      id="whatIsYourName"
      placeholder="Sir Launcelot of Camelot"
    />
    {actions(actionHandlers)}
  </Form>
);

export default Step1;
