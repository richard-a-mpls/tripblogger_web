
# tripblogger a.k.a slackr REACT application
I created this app during the summer of 2021 where I decided to take a career break and did a number of hiking trips.  

This is hosted on https://slackr.azurewebsites.net/ using free services in azure (so might take a bit of time to load, also may not be available if i've run out of free grace for the day/month/year...).

Behind this are the following microservices

- python flask api handling profile and images including image reduction on upload, etc.
- springboot api handles most project gets/posts, etc...
- springboot api providing centralized location for Azure B2C JWT token verification including caching.

Additionally, this is all backed by a Mongo Atlas instance.

Deployment is done via github actions for most items and deploy into Azure App Services.

Authentication is handled via Azure B2C using the OpenID Connect specification.

The following enivronment variables are required when running locally (I do have plans to setup docker and docker compose to make this easier)
* HOST - the host you wish the app to be started and accessed as
* REACT_APP_ENVIRONMENT - PRODUCTION or TEST, use TEST for running locally
* REACT_APP_OIDC_REDIRECT_URI - OIDC redirect uri, usually https://<HOST>:3000/
* REACT_APP_PYTHON_API - endpoint where the python based api is hosted
* REACT_APP_PROJECTS_API - endpoint where the springboot projects api is hosted
* REACT_APP_WAKEUP_ENDPOINTS - location where the wakeup endpoints are hosted.  set only in a dev environment, these endpoints will wakeup the hosted services and validate they are running before allowing the user to continue.




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

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
