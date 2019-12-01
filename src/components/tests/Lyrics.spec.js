/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import nock from 'nock';
import Lyrics from '../Lyrics';
import { getTracksMockData, getPaginationMockData } from '../../../__mocks__/tracksData';

const scope = nock('http://localhost:3000/');

beforeEach(() => {
  scope
    .get('/tracks')
    .query({ page: 1, per_page: 10 })
    .reply(200, { tracks: getTracksMockData(10), meta: getPaginationMockData() });
});

describe('Lyrics component', () => {
  test('Lyrics component renders correctly', async () => {
    const { getByTestId } = render(<Lyrics />);

    await waitForElement(() => getByTestId('lyrics-textarea'));
  });
});
