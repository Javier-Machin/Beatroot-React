import Axios from 'axios';

const musicBeastApi = Axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    Authorization: ''
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
      isrc: track.isrc
    }));

    const paginationData = response.data.meta.pagination;

    return { tracks, paginationData };
  } catch (error) {
    return { error };
  }
};

const getTrack = async trackId => {
  try {
    const response = await musicBeastApi.get(`tracks/${trackId}`);
    const { data } = response;
    const { track } = data;

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
    const response = await musicBeastApi.post('tracks', { track: newTrack });
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
      track: updatedTrack
    });
    return response;
  } catch (error) {
    return { error };
  }
};

export { getTracks, getTrack, getArtist, createTrack, deleteTrack, updateTrack };
