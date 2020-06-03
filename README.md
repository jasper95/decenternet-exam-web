# Template WEB

Frontend Boilerplate

## Prerequisites

This project requires the following in your system

- Node.js 10.x or higher

## Installing

Install project dependencies

```
npm install
```

## Environment Variables

Setup environement variables under `config` directory for development.

```
API_URL=
REACT_APP_API_USERNAME=
REACT_APP_API_PASSWORD=
# reset password and activate account page
CAPTCHA_KEY=
```

## Development

```
  npm run dev
```

## Production

Generate a production build by running

```
npm run build:client
```

This will generate static files under `build` directory

## Linters

- Airbnb React
- jsx-a11y (accessibility)
