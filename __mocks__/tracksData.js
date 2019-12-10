// Generates tracks data for tests

const getTracksMockData = (numOfTracks = 5) => {
  const tracks = [];
  for (let i = 0; i < numOfTracks; i++) {
    tracks.push({
      id: i + 1,
      title: `test track-${i + 1}`,
      artist: `test artist-${i + 1}`,
      isrc: `test isrc-${i + 1}`
    });
  }

  return tracks;
};

const getTrackMockData = (id = 1, explicit = false) => ({
  id,
  title: `test track-${id}`,
  artist: `test artist-${id}`,
  explicit,
  isrc: `test isrc-${id}`,
  lyrics: 'some lyrics'
});

// Generates pagination data for tests

const getPaginationMockData = (
  current_page = 1,
  prev_page = null,
  next_page = 2,
  total_pages = 2,
  total_count = 14
) => ({
  pagination: {
    current_page,
    next_page,
    prev_page,
    total_pages,
    total_count
  }
});

export { getTracksMockData, getTrackMockData, getPaginationMockData };
