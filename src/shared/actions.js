import React from 'react';
import { Form, Button } from '@janus.team/janus-particles';
export const actions = ({ onBack, onCancel }) => (
  <Form.Actions>
    <Button type="submit" primary>Next</Button>
    <Button type="button" onClick={onBack} secondary>Back</Button>
    <Button type="button" onClick={onCancel} tertiary>Cancel</Button>
  </Form.Actions>
);
