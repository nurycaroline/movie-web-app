import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './assets/style.scss';

ReactDOM.render(<App />, document.getElementById('root'));

const registerServiceWorker = () => {
  navigator.serviceWorker
    .register('pwabuilder-sw.js', {
      scope: './',
    })
    .then((reg) => {
      console.log(
        '[PWA Builder] Service worker has been registered:',
        reg,
        `[PWA Builder] Service worker scope: ${reg.scope}`,
      );
    });
};

if ('serviceWorker' in navigator && 'PushManager' in window) {
  if (navigator.serviceWorker.controller) {
    console.log(
      '[PWA Builder] active service worker found, no need to register',
    );
  } else {
    registerServiceWorker();
  }
}
