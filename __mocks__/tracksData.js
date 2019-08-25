// Generates tracks data for tests

const getTracksMockData = (numOfTracks = 5) => {
  const tracks = [];
  for (let i = 0; i < numOfTracks; i++) {
    tracks.push({
      title: `test track-${i + 1}`,
      artist: `test artist-${i + 1}`,
      explicit: true,
      isrc: `test isrc-${i + 1}`,
      lyrics: `test lyrics-${i + 1}`
    });
  }

  return tracks;
};

const getPaginationMockData = () => ({
  pagination: {
    current_page: 1, next_page: 2, prev_page: null, total_pages: 2, total_count: 14
  }
});

export { getTracksMockData, getPaginationMockData };
