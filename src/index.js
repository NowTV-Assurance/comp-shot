import server, { setupMiddleware } from './server';

export default {
  /*
    @param config

    config:
      - {baselineImageDirectory} string required
      - {getNewScreenshot} function(baseFilename) optional
      - {newImageDirectory} string optional (expects only files with same filename as baseline)
      - {resemblejsThreshold} number 0.1
      - {port} number 3000, port to host the page on

      must have either {getNewScreenshot} or {newImageDirectory}
  */
  start(config) {
    console.log('Hello, world')
    setupMiddleware(config)
    server.listen(config.port, () => {
      console.log(`Comp shot app running on http://localhost:${config.port}` );
    });
    // start a server at {port}
    // 1. get all images in {baselineImageDirectory}
    // 2. for each of them
      // check if it has a 'new' version
      // compare new with old
      // if there is a diff threshold > {resemblejsThreshold}
        // add to {outputList} with base64diff
    // 3. pump out the {outputList} into html file at root
    // 4. host an API endpoint on same point
      // endpoints:
      // choose-image, post: baseline-image-name, baseline or new
        // sets either of the images into the baseline dir with filename
  }
}

/*

Client side:

  - handle a click
    - post to API /choose-image.
    - something visual about the image that's been chosen.
*/

// PROBS?
// - access to project filesystem from node_modules?
// - closing down?
