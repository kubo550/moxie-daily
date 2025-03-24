## Moxie Daily

Web app to help you keep track of your daily quotes and thoughts.

## Development

### Development setup

- Clone the repository
- make a copy of `.env.example` and rename it to `.env`
- insert firebase config in `.env`
- Run `npm install` to install dependencies
- Run `npm run dev` to start the development server


### Development workflow

- We work on the `develop` branch.
- Always pull the latest changes from `develop` before starting new work.
- Create a new **feature branch** from `develop` for each new feature or fix.
- Once your work is ready, open a **pull request** from your feature branch to `develop`.
- The `main` branch is connected to Continuous Deployment (CD) – pushing to `main` will automatically deploy the app to Netlify.

[![Netlify Status](https://api.netlify.com/api/v1/badges/404de92f-ad96-43d6-9788-7529f925816a/deploy-status)](https://app.netlify.com/sites/chic-crumble-94a11f/deploys)



Moxie shop [here](https://moxieimpact.com/)

Moxie QR page [here](https://my.moxieimpact.com/)