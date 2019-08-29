import Axios from 'axios';

const beatrootApi = Axios.create({
  baseURL: 'https://sync-api.beatroot.com/accounts/beatroot-records/',
  headers: {
    Authorization: 'Token c1ff5138-2be8-4042-8c6d-6984586fc8bd'
  }
});

const getTracks = async (page = 1, tracksPerPage = 10) => {
  try {
    const response = await beatrootApi.get(
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

const getTrack = async (trackId) => {
  try {
    const response = await beatrootApi.get(`tracks/${trackId}`);
    const { data } = response;
    const { track } = data;

    return track;
  } catch (error) {
    return { error };
  }
};

const getArtist = async (artistName) => {
  try {
    const response = await beatrootApi.get(
      `artists?filters[text]=${artistName}`
    );

    const artist = response.data.artists[0];
    return artist;
  } catch (error) {
    return { error };
  }
};

const createTrack = async (newTrack) => {
  try {
    const response = await beatrootApi.post('tracks', { track: newTrack });
    return response;
  } catch (error) {
    return { error };
  }
};

const deleteTrack = async (trackId) => {
  try {
    const response = await beatrootApi.delete(`tracks/${trackId}`);
    return response;
  } catch (error) {
    return { error };
  }
};

const updateTrack = async (updatedTrack) => {
  try {
    const response = await beatrootApi.patch(`tracks/${updatedTrack.id}`, { track: updatedTrack });
    return response;
  } catch (error) {
    return { error };
  }
};

export {
  getTracks,
  getTrack,
  getArtist,
  createTrack,
  deleteTrack,
  updateTrack
};
