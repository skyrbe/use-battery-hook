import React from 'react';
import useBattery from 'use-battery-hook';

const App = (props) => {
  const [data, loading] = useBattery('hi');
  return (
    <div className="className">
      content
    </div>
  );
};

export default App;
