import Axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const musicBeastApi = Axios.create({
  baseURL: 'http://localhost:3000/'
});

const getTracks = async (page = 1, tracksPerPage = 10, setLoggedIn) => {
  try {
    const response = await musicBeastApi.get(
      `tracks?page=${page}&per_page=${tracksPerPage}`,
      {
        headers: {
          Authorization: cookies.get('auth') || ''
        }
      }
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
    if (String(error).includes('422')) {
      setLoggedIn(false);
    }
    return { error };
  }
};

const logIn = async (email, password, setLoggedIn) => {
  try {
    const response = await musicBeastApi.post('/auth/login', {
      email,
      password
    });

    const { data = {} } = response;
    const { auth_token = '' } = data;

    if (auth_token) {
      cookies.set('auth', auth_token, { path: '/' });
      setLoggedIn(true);
    }

    return response;
  } catch (error) {
    return { error };
  }
};

const signUp = async (name, email, password, passwordConfirm, setLoggedIn) => {
  try {
    const response = await musicBeastApi.post('/signup', {
      name,
      email,
      password,
      password_confirmation: passwordConfirm
    });

    const { data = {} } = response;
    const { auth_token = '' } = data;

    if (auth_token) {
      cookies.set('auth', auth_token, { path: '/' });
      setLoggedIn(true);
    }

    return response;
  } catch (error) {
    return { error };
  }
};

const getTrack = async (trackId, serializer = '', setLoggedIn) => {
  try {
    const response = await musicBeastApi.get(
      `tracks/${trackId}?serializer=${serializer}`,
      {
        headers: {
          Authorization: cookies.get('auth') || ''
        }
      }
    );
    const { data: track } = response;

    return track;
  } catch (error) {
    if (String(error).includes('422')) {
      setLoggedIn(false);
    }
    return { error };
  }
};

const createTrack = async (newTrack, setLoggedIn) => {
  try {
    const response = await musicBeastApi.post('tracks', { ...newTrack });
    return response;
  } catch (error) {
    if (String(error).includes('422')) {
      setLoggedIn(false);
    }
    return { error };
  }
};

const deleteTrack = async (trackId, setLoggedIn) => {
  try {
    const response = await musicBeastApi.delete(`tracks/${trackId}`);
    return response;
  } catch (error) {
    if (String(error).includes('422')) {
      setLoggedIn(false);
    }
    return { error };
  }
};

const updateTrack = async (updatedTrack, setLoggedIn) => {
  try {
    const response = await musicBeastApi.patch(`tracks/${updatedTrack.id}`, {
      ...updatedTrack
    });
    return response;
  } catch (error) {
    if (String(error).includes('422')) {
      setLoggedIn(false);
    }
    return { error };
  }
};

export { getTracks, getTrack, createTrack, deleteTrack, updateTrack, logIn, signUp };
