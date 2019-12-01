/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import MusicBeast from '../../MusicBeast';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MusicBeast />, div);
  ReactDOM.unmountComponentAtNode(div);
});
