import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

// Import all the third party stuff
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { MantineProvider, createEmotionCache } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { ConnectedRouter } from 'connected-react-router';
import { withRouter } from 'react-router-dom';
import TagManager from 'react-gtm-module';
import FontFaceObserver from 'fontfaceobserver';
import { history } from 'utils/history';
import 'sanitize.css/sanitize.css';
import AppManagement from 'pages/AppManagement';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { theme } from './theme';
// Import root app

// Load the favicon and the .htaccess file
import 'file-loader?name=.htaccess!./.htaccess';
import '!file-loader?name=manifest.json!./manifest.json';
import '!file-loader?name=[name].[ext]!./assets/images/favicon.ico';
import '!file-loader?name=[name].[ext]!./assets/images/apple-icon-57x57.png';
import '!file-loader?name=[name].[ext]!./assets/images/apple-icon-60x60.png';
import '!file-loader?name=[name].[ext]!./assets/images/apple-icon-72x72.png';
import '!file-loader?name=[name].[ext]!./assets/images/apple-icon-76x76.png';
import '!file-loader?name=[name].[ext]!./assets/images/apple-icon-114x114.png';
import '!file-loader?name=[name].[ext]!./assets/images/apple-icon-120x120.png';
import '!file-loader?name=[name].[ext]!./assets/images/apple-icon-144x144.png';
import '!file-loader?name=[name].[ext]!./assets/images/apple-icon-152x152.png';
import '!file-loader?name=[name].[ext]!./assets/images/apple-icon-180x180.png';
import '!file-loader?name=[name].[ext]!./assets/images/android-icon-192x192.png';
import '!file-loader?name=[name].[ext]!./assets/images/favicon-32x32.png';
import '!file-loader?name=[name].[ext]!./assets/images/favicon-96x96.png';
import '!file-loader?name=[name].[ext]!./assets/images/ms-icon-144x144.png';

import configureStore from './configureStore';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const montserratObserver = new FontFaceObserver('Montserrat', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
montserratObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});
class ScrollToTop extends React.Component<any> {
  public componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  public render() {
    const { children, location } = this.props;
    return React.cloneElement(children as any, {
      location
    });
  }
}

const ScrollToTopHandler = withRouter(ScrollToTop);

const tagManagerArgs = {
  gtmId: 'GTM-55WX5QW'
};

TagManager.initialize(tagManagerArgs);

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app') as HTMLElement;

const root = createRoot(MOUNT_NODE);

const render = (Component = AppManagement) => {
  root.render(
    // tslint:disable-next-line:jsx-wrap-multiline
    <MantineProvider theme={theme} emotionCache={createEmotionCache({ key: 'pv' })} withGlobalStyles withNormalizeCSS>
      <Provider store={store}>
        <NotificationsProvider position="top-right" autoClose={4000}>
          <ModalsProvider>
            <ConnectedRouter history={history}>
              <ScrollToTopHandler>
                <Component />
              </ScrollToTopHandler>
            </ConnectedRouter>
          </ModalsProvider>
        </NotificationsProvider>
      </Provider>
    </MantineProvider>
  );
};

render();
if (module.hot) {
  module.hot.accept('./pages/AppManagement', () => {
    // tslint:disable-next-line:max-line-length
    const AppManagement = require('./pages/AppManagement').default; // https://github.com/webpack/webpack-dev-server/issues/100
    render(AppManagement);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
