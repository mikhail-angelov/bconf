import React from 'react';
import { Stack, Text, Link, FontWeights } from 'office-ui-fabric-react';
import { Home } from "./components/Home/Home"

const boldStyle = {
  root: { fontWeight: FontWeights.semibold }
};

export const App: React.FunctionComponent = () => {
  return (
    <div className="root">
      <Home />
    </div>
  );
};
