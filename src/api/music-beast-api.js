import Axios from 'axios';

const musicBeastApi = Axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    Authorization:
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE1NzU0OTYzNzJ9.FsiY4TfV_MlyY6xHvlKoqbzsYir2Tpkfbx2oo7z06PQ'
  }
});

const getTracks = async (page = 1, tracksPerPage = 10) => {
  try {
    // `tracks?page=${page}&per_page=${tracksPerPage}`
    const response = await musicBeastApi.get('tracks');

    // const tracks = response.data.tracks.map
    const tracks = response.data.map(track => ({
      id: track.id,
      title: track.title,
      artist: track.artist,
      lyrics: track.lyrics
    }));

    // const paginationData = response.data.meta.pagination;
    const paginationData = { per_page: 5, page: 1 };

    return { tracks, paginationData };
  } catch (error) {
    return { error };
  }
};

const getTrack = async trackId => {
  try {
    const response = await musicBeastApi.get(`tracks/${trackId}`);
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
