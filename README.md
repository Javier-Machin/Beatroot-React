# Beatroot React

The following is a general rundown of the development of this app:

It has a big focus on functional components, but still showcases one class based one `TrackForm.js`
(We still have to support existing code after all).
It also makes extensive use of react hooks.

I wanted to create a solid base so it uses a strict eslint ruleset, husky pre-hooks (won't let you commit if the test coverage is below the specified threshold), and required prop validation.

The testing framework is Jest + [react-testing-library](https://testing-library.com/)

**Check the file `src/components/tests/header.spec.js` for a step by step with comments on what it does,
the rest of the tests are pretty basic due to time constraints**

Biggest challenge I faced was the logic with the modal windows, I ended up having to create a customizable one that would accept both state and state handlers provided as props to open and close it and also a self-contained state that would pass down its own state and ability to change it to its children, in the end worked out ok.

**Quick Journal about development process:**

- I started by getting familiar with the API by adding some of the exposed endpoints to Postman.

- After that I started the development by creating a new `create-react-app` project and cleaning some
of the extra bits it adds, customizing eslint ruleset (using the airbnb one with some changes) and enabling Jest coverage.

- At this point I created some very basic components, an axios instance and the function to fetch the tracklist so I could have  some data to work with.

- After this point I focused on features or stories rather than components, I think about the feature I want and modify and create components as required to get it implemented.

- The first feature I focused on was pagination. 
The ability to set the number of tracks per page and switch between pages.
I went quite hard on this one making it solid so the user isn't able to request non-existing pages and the usually problems related to pagination. 

- I also added a loading state around this time, mainly for the wait until the tracklist makes its way to the app.

- Second feature was gearing up to add the audio player so styling and general layout of each track in the tracklist was needed to be able to interact with it, a combination of html, grid and flexbox.
Added some assets to use as icons.

- With that in place I went and added the audio player itself, I went with [react-player](https://www.npmjs.com/package/react-player).
Added to it a very basic display to show a welcome message and title - author for the currently playing song.

- After the player I made what ended being the challenge of this app, modal windows to display the lyrics, and the track form.
Mainly because I wanted it to open or close based on some other events like changes on the track list or clicks on the different icons.

- With the modal in place it was down to creating a basic form to create and edit tracks, and a readonly textarea to display the lyrics. Around this time I hooked up the delete icon with an actual function and api request.

- The way the create track works is: 
It will make a query to the api requesting an artist with the name introduced in the artist input, if it finds one, will add the artist id to the track object and make the post request.
If it doesn't find an artist with that name it will show an alert saying it didn't find one, try another (ran out of time to handle the artist not found case better)

- Total development was around 30 hours.

Some things that I would like to improve:

- Make it responsive, it probably is pretty bad on a phone right now
- Better error handling for the case where no artist is found with the provided name
- More extensive testing

