import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import './assets/styles/index.scss';
import MainApp from './MainApp';

import configureStore from './configureStore';

const store = configureStore();

// render(
//   <AppContainer>
//     <Provider store={store}>
//       <div>
//         <MainApp />
//       </div>
//     </Provider>
//   </AppContainer>,
//   document.getElementById('root')
// );

const renderApp = Component =>
  render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );

renderApp(MainApp);

// Webpack Hot Module Replacement API
if (module.hot) module.hot.accept('./MainApp', () => renderApp(MainApp));
