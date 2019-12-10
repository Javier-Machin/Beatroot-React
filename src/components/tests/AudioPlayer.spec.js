/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { render, waitForElement, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import nock from 'nock';
import MusicBeast from '../../MusicBeast';
import { getTracksMockData, getPaginationMockData } from '../../../__mocks__/tracksData';

const scope = nock('http://localhost:3000/');

window.HTMLMediaElement.prototype.play = () => {};

beforeEach(() => {
  scope
    .get('/tracks')
    .query({ page: 1, per_page: 10 })
    .reply(200, {
      tracks: getTracksMockData(10),
      pagination: getPaginationMockData().pagination
    });
});

describe('Audio player component', () => {
  test('audio player renders correctly', async () => {
    const { getByTestId } = render(<MusicBeast />);

    await waitForElement(() => getByTestId('audio-player'));
  });

  test("clicking play on a track, shows it's title in the audio player", async () => {
    const { getByTestId } = render(<MusicBeast />);

    await waitForElement(() => getByTestId('track-1'));
    scope
      .get('/tracks/1')
      .query({ serializer: '' })
      .reply(200, {
        id: 1,
        title: 'test track-1',
        artist: 'test artist-1',
        file: 'data'
      });
    fireEvent.click(getByTestId('track-play-1'));
    await waitForElement(() => getByTestId('track-1'));
    expect(getByTestId('audio-display-text')).toHaveTextContent('test track-1 -');
  });
});
