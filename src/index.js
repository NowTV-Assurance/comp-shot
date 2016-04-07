import server, { setupMiddleware } from './server';

export default {
  start(config) {
    setupMiddleware(config)
    server.listen(config.port, () => {
      console.log(`Comp shot app running on http://localhost:${config.port}` );
    });
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
