import _ from 'lodash';
import React from 'react';
import { Form, Button } from '@janus.team/janus-particles';
import { actions } from './actions';

const Step2 = ({ onSubmit, onChange, data: { quest }, ...actionHandlers }) => (
  <Form onSubmit={onSubmit}>
    <Form.Input
      onChange={onChange('quest')}
      value={quest}
      label="What is your quest?"
      type="text"
      id="whatIsYourQuest"
      placeholder="to seek the holy grail"
    />
    {actions(actionHandlers)}
  </Form>
);

export default Step2;
