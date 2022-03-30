# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



# react-solr-connector
A React component which provides access to a
[Solr](http://lucene.apache.org/solr/)
server. Suitable for use in simple React apps which do not make use of a state management framework like
[Redux](https://github.com/reactjs/redux).
Since the component uses the Solr JSON API, only versions from 5 onward are supported (and I have only tested with 6.0.0).

## Installation

Install the module with npm:
```
npm install --save react-solr-connector
```

## Using the component

The module exports one default object, `SolrConnector`. This should be used to wrap your application components:
```
import SolrConnector from 'react-solr-connector';
...
<SolrConnector searchParams={searchParams}>
  <MyApp/>
</SolrConnector>
```

`SolrConnector` injects a `solrConnector` prop into all of its immediate children. This is an object with the structure:
```
{
  searchParams,
  busy,
  response,
  error
}
```

SolrConnector is passed a prop called `searchParams` (which is also copied into the injected `solrConnector` prop). If `searchParams` contains a non-empty query then the search is performed asynchronously and `busy` is set to true (this could be used to indicate to the user that a search is in progress, for example by displaying a spinner). `response` is null until a response from Solr is received, at which point it is set to the value of the response object from Solr (including the `responseHeader`, the main `response` object, and any `facets`, `highlighting` objects, etc.) `busy` is also set to `false`. If an error occurs, the `error` property is set (to a descriptive string) instead of the `response` property. A search is performed when the component first mounts, and thereafter any time it receives new props.

`searchParams` must have the following properties as a minimum:
```
{
  solrSearchUrl,
  query
}
```

Where `query` is the user-entered query string and `solrSearchUrl` is a Solr search endpoint, e.g.:
```
http://localhost:8983/solr/techproducts/select
```

If you are serving the app from a different host then you will have to
[enable CORS](http://marianoguerra.org/posts/enable-cors-in-apache-solr.html)
on Solr, or use a proxy service.

Optional properties for `doSearch` are:
```
{
  offset,
  limit,
  filter,
  fetchFields,
  facet,
  sort,
  highlightParams
}
```

Most of these correspond exactly with properties in the
[Solr JSON API](http://yonik.com/solr-json-request-api/).
The exceptions are `fetchFields`, which corresponds to the Solr `fields` (which is not a very clear name in my opinion) and `highlightParams`. In fact, highlightParams can contain any of the "traditional" Solr params that the JSON API does not currently support, but highlighting is the most obvious application.

## Running tests
If you have cloned the `react-solr-connector`
[GitHub repository](https://github.com/flaxsearch/react-solr-connector),
you can run the `jest` tests with the following commands:
```
$ npm install
$ npm tests
```

## Running the demo
To run the simple demo, install Solr 6 and start it with the `techproducts` example:
```
$ bin/solr start -e techproducts
```
```
$ yarn start
```

and point your browser at `http://localhost:8080/demo/index.html`.
