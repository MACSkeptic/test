import _ from 'lodash';
import React from 'react';
import { Form, Button } from '@janus.team/janus-particles';
import { actions } from './actions';

const Failure = ({ onSubmit }) => (
  <Form onSubmit={onSubmit}>
    <p>
      You have failed horribly on your quest.
    </p>
    <br />
    <Button primary type="submit">
      try again
    </Button>
  </Form>
);

export default Failure;
