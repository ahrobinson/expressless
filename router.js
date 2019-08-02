const url = require('url');
const fs = require('fs');
const path = require('path');

const getMime = (ext) => {
  let contentType = 'text/html';
  switch (ext) {
      case '.js':
          contentType = 'text/javascript';
          break;
      case '.css':
          contentType = 'text/css';
          break;
      case '.json':
          contentType = 'application/json';
          break;
  }
  return contentType;
};

class Router {
  constructor () {
    this.routes = {
      get: {},
      post: {},
    };
  }

  get (route, handler) {
    this.registerRoute('get', route, handler);
  }
  post (route, handler) {
    this.registerRoute('post', route, handler);
  }
  route (req) {
    this.routes[req.method.toLowerCase()][req.url]
    return this.routes[req.method.toLowerCase()][req.url];
  }
  registerRoute (method, route, handler) {
    this.routes[method][route] = handler;
  }
  missingRoute (req, res) {
    const routeUrl = url.parse(req.url);
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end("No route registered for " + routeUrl.pathname);
  }

};

module.exports = new Router();
