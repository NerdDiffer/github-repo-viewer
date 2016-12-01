# GitHub Repo Viewer

View GitHub repos, by user. The build & configuration are based off of
[react-redux-template](https://github.com/NerdDiffer/react-redux-template).

## Installations

### Application dependencies

`npm install`

### Run tests

`npm test`

#### Style framework info

This app is using the [Semantic-UI](http://semantic-ui.com/) framework for
consistent styling.

* Globally install [gulp](https://github.com/gulpjs/gulp) build tool
  * `npm install -g gulp`
* Build the source:
  * `npm run build:styles`

Component definitions & preset themes are committed to source control.
This GitHub [issue](https://github.com/Semantic-Org/Semantic-UI/issues/3620)
recommends it.

##### Semantic-UI docs

Read these to know more:

* [Getting Started](http://semantic-ui.com/introduction/getting-started.html)
* [Theming](http://semantic-ui.com/usage/theming.html)
* [React integration](http://react.semantic-ui.com/)

## Starting, building

### Development

* Bundle application & serve it in-memory:
  * `npm start`
* Visit [http://localhost:8080](http://localhost:8080).

### Production

To locally test a production build:

* Remove all build files
  * `npm run clean`
* Install production dependencies
  * `npm install --production`
* Build style framework, bundle application & output to `public/build`
  * `npm run heroku-postbuild`
* Start app:
  * `NODE_ENV=production npm start`
