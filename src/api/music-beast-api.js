import Axios from 'axios';

const musicBeastApi = Axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    Authorization:
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE1NzYwOTUyNTh9.W9Vn2Q9zxc7wPLUZ0RtZNp0qzG5AWRlL2kzhsEznKFA'
  }
});

const getTracks = async (page = 1, tracksPerPage = 10) => {
  try {
    const response = await musicBeastApi.get(
      `tracks?page=${page}&per_page=${tracksPerPage}`
    );

    const tracks = response.data.tracks.map(track => ({
      id: track.id,
      title: track.title,
      artist: track.artist,
      lyrics: track.lyrics,
      file: track.file
    }));

    const paginationData = response.data.pagination;

    return { tracks, paginationData };
  } catch (error) {
    return { error };
  }
};

const getTrack = async (trackId, serializer = '') => {
  try {
    const response = await musicBeastApi.get(
      `tracks/${trackId}?serializer=${serializer}`
    );
    const { data: track } = response;

    return track;
  } catch (error) {
    return { error };
  }
};

const getArtist = async artistName => {
  try {
    const response = await musicBeastApi.get(`artists?filters[text]=${artistName}`);

    const artist = response.data.artists[0];
    return artist;
  } catch (error) {
    return { error };
  }
};

const createTrack = async newTrack => {
  try {
    const response = await musicBeastApi.post('tracks', { ...newTrack });
    return response;
  } catch (error) {
    return { error };
  }
};

const deleteTrack = async trackId => {
  try {
    const response = await musicBeastApi.delete(`tracks/${trackId}`);
    return response;
  } catch (error) {
    return { error };
  }
};

const updateTrack = async updatedTrack => {
  try {
    const response = await musicBeastApi.patch(`tracks/${updatedTrack.id}`, {
      ...updatedTrack
    });
    return response;
  } catch (error) {
    return { error };
  }
};

export { getTracks, getTrack, getArtist, createTrack, deleteTrack, updateTrack };
