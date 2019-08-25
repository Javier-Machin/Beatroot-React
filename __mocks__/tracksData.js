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

export { getTracksMockData as default };
