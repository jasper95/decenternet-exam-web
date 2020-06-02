import React from 'react';
import { hydrate, render } from 'react-dom';
import { loadableReady } from '@loadable/component';
import WebFontLoader from 'webfontloader';
import Root from './App';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700'],
  },
  custom: {
    families: [
      'Material Icons',
      'Proxima Nova Condensed: n3, i3, n4, i4, n6, i6',
      'Proxima Nova: n4, i4, n6, i6, n7, i7, n8, n9',
    ],
    urls: ['/css/material-icons.min.css', '/css/proxima.min.css'],
  },
});

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then((registration) => {
    console.log('SW registered: ', registration);
  }).catch((registrationError) => {
    console.log('SW registration failed: ', registrationError);
  });
}


const renderFn = isProduction ? hydrate : render;
const preLoadFn = isProduction ? loadableReady : cb => cb();

preLoadFn(() => renderFn(
  <Root />, document.getElementById('root'),
));
