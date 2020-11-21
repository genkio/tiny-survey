# tiny-survey

## Requirements

- `node v12`

## Initial setup

1. Install Node version manager [nvm](https://github.com/nvm-sh/nvm)
2. `nvm install 12`

## Development

### [Setup and launch server](./functions/README.md)

### [Setup and launch web client](./web/README.md)

## Deployment

### Continuous deployment

Any push or pull request merge into the `main` branch will trigger deployment via Github actions

### Manual deployment

`npm run deploy`

This command deploys both web client and server. They can also be deployed separately by run the same command in their own folder
