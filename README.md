# GitHub Repo Viewer

View GitHub repos, by user. The build & configuration are based off my boilerplate
project: [react-redux-template](https://github.com/NerdDiffer/react-redux-template).

**[Live demo](https://repos-by-user.herokuapp.com/)**

##### Some extra features

* Type in another GitHub username to list repos
* Show info about that user
* Results are cached, so type in a previously-fetched username to see it again
  * Try not to refresh the page if you're getting close to the API rate limit!
* Click table headers to sort and toggle direction
  * Repos sorted by number of watchers by default.
  * If two repos are equal in their sorting criteria, it'll sort by last updated
    in descending order.
  * You can't sort by repo "description", because that's silly.

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

There may be an interactive postinstall script, that asks how you want to
customize your build of `semantic-ui`. Just choose the default choices all the
through. If there's a problem, make sure to set the `base`, `source` and
`output` directories as per the configuration file: `semantic.json`.

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
