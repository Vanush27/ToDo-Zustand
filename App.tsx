import React from 'react';

import ApplicationNavigator from './src/navigators/Application';

import {PaperProvider} from 'react-native-paper';

function App() {
  return (
    <PaperProvider>
      <ApplicationNavigator />
    </PaperProvider>
  );
}

export default App;
