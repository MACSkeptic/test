import _ from 'lodash';
import React from 'react';
import { Form, Button } from '@janus.team/janus-particles';
import { actions } from './actions';

const Success = ({ onSubmit }) => (
  <Form onSubmit={onSubmit}>
    <p>
      Right. Off you go.
    </p>
    <br />
    <Button primary type="submit">
      Oh, thank you. Thank you very much
    </Button>
  </Form>
);

export default Success;
