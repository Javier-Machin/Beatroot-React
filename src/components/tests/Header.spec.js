/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import nock from 'nock';
import Beatroot from '../../Beatroot';
import { getTracksMockData, getPaginationMockData } from '../../../__mocks__/tracksData';

/** Nock initialization to intercept api requests */

const scope = nock(
  'https://sync-api.beatroot.com/accounts/beatroot-records'
);

beforeEach(() => {
  // Intercept the default request with params page 1 and per_page 10 on every test
  scope
    .get('/tracks')
    .query({ page: 1, per_page: 10 })
    .reply(
      200,
      { tracks: getTracksMockData(10), meta: getPaginationMockData() },
    );
});

describe('Header and pagination elements', () => {
  test('select dropdown to change pagination is rendered correctly', async () => {
    // Render app
    const { getByTestId } = render(<Beatroot />);

    // Find the select element in the DOM, not finding it will make the test fail
    await waitForElement(() => getByTestId('pagination-select'));
  });


  test('changing pagination displays updated track list correctly', async () => {
    // Render app
    const { getByTestId, queryByTestId } = render(<Beatroot />);

    // Find track 10 in the DOM
    await waitForElement(() => getByTestId('track-10'));

    // Confirm that track 15 isn't currently displayed
    expect(queryByTestId('track-15')).toBeNull();

    // Set scope to intercept the request that will happen after changing tracks per page
    scope
      .get('/tracks')
      .query({ page: 1, per_page: 15 })
      .reply(
        200,
        { tracks: getTracksMockData(15), meta: getPaginationMockData() },
      );

    // Change tracks per page
    fireEvent.change(getByTestId('pagination-select'), {
      target: { value: 15 }
    });

    // Find track 15 in the DOM after changing pagination
    await waitForElement(() => getByTestId('track-15'));
  });


  test('clicking next page button updates the track list correctly', async () => {
    const { getByTestId, queryByTestId } = render(<Beatroot />);

    await waitForElement(() => getByTestId('track-10'));
    expect(queryByTestId('track-20')).toBeNull();

    scope
      .get('/tracks')
      .query({ page: 2, per_page: 10 })
      .reply(
        200,
        { tracks: getTracksMockData(20), meta: getPaginationMockData(2, 1, null, 2, 40) },
      );

    fireEvent.click(getByTestId('forward-button'));
    await waitForElement(() => getByTestId('track-20'));
  });


  test('next page button is disabled when there is no next page', async () => {
    const { getByTestId, queryByTestId } = render(<Beatroot />);

    await waitForElement(() => getByTestId('track-10'));
    expect(queryByTestId('track-20')).toBeNull();

    scope
      .get('/tracks')
      .query({ page: 2, per_page: 10 })
      .reply(
        200,
        { tracks: getTracksMockData(20), meta: getPaginationMockData(2, 1, null, 2, 40) },
      );

    fireEvent.click(getByTestId('forward-button'));

    await waitForElement(() => getByTestId('track-20'));

    fireEvent.click(getByTestId('forward-button'));

    /**
       * No need to mock second request as it shouldn't happen.
       * Next expect will fail if the request is made.
       * To confirm behaviour, change the parameter "null" in the previous request mock
       * to 3 (providing a next page and enabling the button), the test will fail.
       */

    await waitForElement(() => getByTestId('track-20'));
  });


  test('clicking previous page button updates the track list correctly', async () => {
    const { getByTestId, queryByTestId } = render(<Beatroot />);

    await waitForElement(() => getByTestId('track-10'));
    expect(queryByTestId('track-20')).toBeNull();

    scope
      .get('/tracks')
      .query({ page: 2, per_page: 10 })
      .reply(
        200,
        { tracks: getTracksMockData(20), meta: getPaginationMockData(2, 1, null, 2, 40) },
      );

    fireEvent.click(getByTestId('forward-button'));
    await waitForElement(() => getByTestId('track-20'));

    scope
      .get('/tracks')
      .query({ page: 1, per_page: 10 })
      .reply(
        200,
        { tracks: getTracksMockData(10), meta: getPaginationMockData(1, null, 2, 2, 40) },
      );

    fireEvent.click(getByTestId('back-button'));

    await waitForElement(() => getByTestId('track-10'));
    expect(queryByTestId('track-20')).toBeNull();
  });


  test('previous page button is disabled when there is no previous page', async () => {
    const { getByTestId, queryByTestId } = render(<Beatroot />);

    await waitForElement(() => getByTestId('track-10'));
    expect(queryByTestId('track-20')).toBeNull();

    scope
      .get('/tracks')
      .query({ page: 2, per_page: 10 })
      .reply(
        200,
        { tracks: getTracksMockData(20), meta: getPaginationMockData(2, 1, null, 2, 40) },
      );

    fireEvent.click(getByTestId('forward-button'));
    await waitForElement(() => getByTestId('track-20'));

    scope
      .get('/tracks')
      .query({ page: 1, per_page: 10 })
      .reply(
        200,
        { tracks: getTracksMockData(10), meta: getPaginationMockData(1, null, 2, 2, 40) },
      );

    fireEvent.click(getByTestId('back-button'));

    await waitForElement(() => getByTestId('track-10'));
    expect(queryByTestId('track-20')).toBeNull();

    fireEvent.click(getByTestId('back-button'));

    await waitForElement(() => getByTestId('track-10'));
  });
});
