import Axios from 'axios';

const beatrootApi = Axios.create({
  baseURL:
    'http://localhost:8080/https://sync-api.beatroot.com/accounts/beatroot-records/',
  headers: { Authorization: 'Token c1ff5138-2be8-4042-8c6d-6984586fc8bd' }
});

const getTracks = async (page = 1, tracksPerPage = 10) => {
  try {
    const response = await beatrootApi.get(
      `tracks?page=${page}&per_page=${tracksPerPage}`
    );
    const tracks = response.data.tracks.map(track => ({
      title: track.title,
      artist: track.artist,
      explicit: track.explicit,
      isrc: track.isrc,
      lyrics: track.lyrics
    }));

    return tracks;
  } catch (error) {
    return { error };
  }
};

export { getTracks as default };
