/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import nock from 'nock';
import ModalWindow from '../ModalWindow';
import AudioPlayer from '../AudioPlayer';
import { getTracksMockData, getPaginationMockData } from '../../../__mocks__/tracksData';

const scope = nock('http://localhost:3000/');

const props = {
  track: {},
  setShouldPlay: jest.fn(),
  shouldPlay: false
};

beforeEach(() => {
  scope
    .get('/tracks')
    .query({ page: 1, per_page: 10 })
    .reply(200, { tracks: getTracksMockData(10), meta: getPaginationMockData() });
});

describe('Modal component', () => {
  test('Modal component renders correctly', async () => {
    const { getByTestId } = render(
      <ModalWindow withOpenButton isOpen>
        <AudioPlayer {...props} />
      </ModalWindow>
    );

    await waitForElement(() => getByTestId('react-modal'));
  });
});
