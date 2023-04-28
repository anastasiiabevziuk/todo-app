import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { Auth0Provider } from "@auth0/auth0-react";
import 'semantic-ui-css/semantic.min.css';
import { domain, clientId } from './auth_config';
import './i18n';
import Loading from './components/Loading';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: "https://localhost:3000/lists" || window.location.origin
    }}
  >
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </Auth0Provider>,

);


