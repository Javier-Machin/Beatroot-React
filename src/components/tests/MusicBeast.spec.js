/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import nock from 'nock';
import MusicBeast from '../../MusicBeast';
import {
  getTracksMockData,
  getPaginationMockData,
} from '../../../__mocks__/tracksData';

/** Nock initialization to intercept api requests */

const scope = nock('http://localhost:3000/');

beforeEach(() => {
  // Intercept the default request with params page 1 and per_page 10 on every test
  scope
    .get('/tracks')
    .query({ page: 1, per_page: 10 })
    .reply(200, {
      tracks: getTracksMockData(10),
      pagination: getPaginationMockData().pagination,
    });
});

describe('MusicBeast main component', () => {
  test('is rendered correctly', async () => {
    const { getByTestId } = render(<MusicBeast />);

    await waitForElement(() => getByTestId('app-container'));
  });
});
