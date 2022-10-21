import React from 'react';
import { Provider } from 'react-redux'
import { store } from '@redux/store'
import AppWrapper from '@src/AppWrapper';

const App = () => {
  return (<>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  </>)
}



export default App