# Bandwidth Project

This project is built with Flask and React. Desktop support only.

![Screenshot](./public/screenshot.png)

## Requirements

1. Node.js (10.13.0^)
2. Yarn
3. Python3

## Quick Start

Install dependencies

```bash
yarn install
```

Setup the back end

```bash
cd api/
```

```bash
python3 -m venv venv
```

```bash
. venv/bin/activate
```

```bash
pip install flask
```

```bash
pip install python-dotenv
```

Start the backend

```bash
flask run && cd ..
```

Start the frontend
```bash
yarn start
```

## Using the Bandwidth dashboard

Upon boot up, you will notice a list of device ids and a graph of bandwidth data (aggregated in groups showing bytes-from-server and bytes-to-server for each device). The graph will display the first device id in the list to start. Clicking on a device id will update the chart with corresponding bandwidth data. You can add query parameters to limit the number of device ids initially returned on the first load.

Supported filters paramters

1. class (ex. "Medical")
2. device_id (ex. "00e12926-fb84-4f62-a81b-1077dafc6ada")
3. type (ex. "Anesthesia Machine")
4. location (ex. "Main Campus")
5. model (ex. "GE Datex Ohmeda Avance S5 Anesthesia Machine")
6. organization (ex. "NYU")

This implementation uses the device id to query device bandwidth data using some default values:

1. end_time (defaults to 1524835983)
2. num_windows (defaults to 10)
3. window_time (defaults to 60)

Examples:

[http://localhost:3000/?organization=NYU][1]<br>
[http://localhost:3000/?type=Infusion%20Pump][2]<br>
[http://localhost:3000/?type=Anesthesia%20Machine][3]<br>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

[1]: http://localhost:3000/?organization=NYU
[2]: http://localhost:3000/?type=Infusion%20Pump
[3]: http://localhost:3000/?type=Anesthesia%20Machine