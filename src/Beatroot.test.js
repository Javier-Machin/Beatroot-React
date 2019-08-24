/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Beatroot from './Beatroot';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Beatroot />, div);
  ReactDOM.unmountComponentAtNode(div);
});
