/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { render, waitForElement, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import nock from 'nock';
import TrackForm from '../TrackForm';
import { getTracksMockData, getPaginationMockData } from '../../../__mocks__/tracksData';

const scope = nock(
  'https://sync-api.beatroot.com/accounts/beatroot-records'
);

const props = {
  updateTrackList: jest.fn(),
  setLoading: jest.fn(),
  tracksPerPage: 5,
  page: 1
};

beforeEach(() => {
  scope
    .get('/tracks')
    .query({ page: 1, per_page: 10 })
    .reply(
      200,
      { tracks: getTracksMockData(10), meta: getPaginationMockData() },
    );
});

describe('TrackForm component', () => {
  test('TrackForm component renders correctly', async () => {
    const { getByTestId } = render(<TrackForm {...props} />);

    await waitForElement(() => getByTestId('track-form'));
  });

  test('typing on input updates value', async () => {
    const { getByTestId } = render(<TrackForm {...props} />);

    fireEvent.change(getByTestId('title-input'), { target: { name: 'title', value: 'a' } });
    await waitForElement(() => getByTestId('track-form'));
    expect(getByTestId('title-input').value).toBe('a');
  });
});
