/* eslint-disable no-undef */
import nock from 'nock';
import { getTracksMockData, getPaginationMockData } from '../../__mocks__/tracksData';
import '@testing-library/jest-dom/extend-expect';
import { getTracks, createTrack, deleteTrack, updateTrack } from './music-beast-api';

const scope = nock('http://localhost:3000/');

scope
  .get('/tracks')
  .query({ page: 1, per_page: 10 })
  .reply(200, {
    tracks: getTracksMockData(10),
    pagination: getPaginationMockData().pagination
  });

describe('API interaction functions', () => {
  describe('getTracks', () => {
    it('return an object with the expected keys', async () => {
      scope
        .get('/tracks')
        .query({ page: 1, per_page: 5 })
        .reply(200, {
          tracks: getTracksMockData(5),
          pagination: getPaginationMockData().pagination
        });
      const response = await getTracks(1, 5);
      expect(response).toMatchObject({
        paginationData: {
          next_page: 2,
          prev_page: null
        },
        tracks: [
          {
            artist: 'test artist-1',
            id: 1,
            title: 'test track-1'
          },
          {
            artist: 'test artist-2',
            id: 2,
            title: 'test track-2'
          },
          {
            artist: 'test artist-3',
            id: 3,
            title: 'test track-3'
          },
          {
            artist: 'test artist-4',
            id: 4,
            title: 'test track-4'
          },
          {
            artist: 'test artist-5',
            id: 5,
            title: 'test track-5'
          }
        ]
      });
    });
  });

  describe('deleteTrack', () => {
    it('makes a delete request with the provided id', async () => {
      scope.delete('/tracks/3').reply(204, { data: { status: 204 } });
      const response = await deleteTrack(3);
      expect(response).toMatchObject({ status: 204 });
    });
  });

  describe('updateTrack', () => {
    it('updates the specified track with the provided data', async () => {
      scope.patch('/tracks/3').reply(200, {
        id: 3,
        name: 'some song',
        artist: 'some artist'
      });
      const response = await updateTrack({
        id: 3,
        name: 'some song',
        artist: 'some artist'
      });
      expect(response).toMatchObject({
        data: {
          id: 3,
          name: 'some song',
          artist: 'some artist'
        }
      });
    });
  });

  describe('updateTrack', () => {
    it('makes a patch request with the specified data', async () => {
      scope.patch('/tracks/3').reply(200, {
        id: 3,
        name: 'some song',
        artist: 'some artist'
      });
      const response = await updateTrack({
        id: 3,
        name: 'some song',
        artist: 'some artist'
      });
      expect(response).toMatchObject({
        data: {
          id: 3,
          name: 'some song',
          artist: 'some artist'
        }
      });
    });
  });

  describe('createTrack', () => {
    it('makes a post request with the provided data', async () => {
      scope.post('/tracks').reply(200, {
        id: Math.floor(Math.random()),
        title: 'some title',
        artist_id: 3,
        explicit: false,
        isrc: '1234',
        lyrics: 'some lyrics'
      });
      const response = await createTrack({
        title: 'some title',
        artist_id: 3,
        explicit: false,
        isrc: '1234',
        lyrics: 'some lyrics'
      });
      expect(response).toMatchObject({
        data: {
          id: expect.anything(),
          title: 'some title',
          artist_id: 3,
          explicit: false,
          isrc: '1234',
          lyrics: 'some lyrics'
        }
      });
    });
  });
});
