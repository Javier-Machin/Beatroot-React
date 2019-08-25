/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import nock from 'nock';
import Beatroot from '../../Beatroot';
import getTracksMockData from '../../../__mocks__/tracksData';

/** Nock initialization to intercept api requests */

const scope = nock(
  'http://localhost:8080/https://sync-api.beatroot.com/accounts/beatroot-records'
);

beforeEach(() => {
// intercept the default request with params page 1 and per_page 10 on every test
  scope
    .get('/tracks')
    .query({ page: 1, per_page: 10 })
    .reply(
      200,
      { tracks: getTracksMockData(10) },
    );
});

test('select dropdown to change pagination is rendered correctly', async () => {
  // Render app
  const { getByTestId } = render(<Beatroot />);

  // Find the select element in the DOM
  await waitForElement(() => getByTestId('pagination-select'));
});

test('changing pagination displays updated track list correctly', async () => {
  // Render app
  const { getByTestId, queryByTestId } = render(<Beatroot />);

  // Find track 10 in the DOM
  await waitForElement(() => getByTestId('track-10'));

  // Confirm that track 15 isn't currently displayed
  expect(queryByTestId('track-15')).toBeNull();

  // set scope to intercept the request that will happen after changing tracks per page
  scope
    .get('/tracks')
    .query({ page: 1, per_page: 15 })
    .reply(
      200,
      { tracks: getTracksMockData(15) },
    );

  // Change tracks per page
  fireEvent.change(getByTestId('pagination-select'), {
    target: { value: 15 }
  });

  // Find track 15 in the DOM after changing pagination
  await waitForElement(() => getByTestId('track-15'));
});
