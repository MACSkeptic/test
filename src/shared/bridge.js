import React from 'react';
import { Form, Button } from '@janus.team/janus-particles';

const Bridge = ({ onSubmit }) => (
  <Form onSubmit={onSubmit}>
    <p>
      Stop! Who would cross the Bridge of Death must answer me these questions three,
      &apos;ere the other side he see.
    </p>
    <br />
    <Button primary type="submit">
      Ask me the questions, bridge-keeper. I&apos;m not afraid
    </Button>
  </Form>
);

export default Bridge;
