import server, { setupMiddleware } from './server';

export default {
  start(config) {
    setupMiddleware(config)
    server.listen(config.port, () => {
      console.log(`Comp shot app running on http://localhost:${config.port}` );
    });
  }
}