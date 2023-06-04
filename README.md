## CLIENT UI

Frontend codebase for client

## Requirements

- Node `v16.17.0`
- NPM `v8.15.0`

### Setup Instructions:

`git clone git@github.com:vrahulkrishnan/client-ui.git`

`cd client-ui`

`npm install --legacy-peer-deps`

### Run Instructions:

Create `.env` file in root folder. (Required keys can be found in `.env.sample` file)

`npm start`

Then go to 

`dev.client.com:3000`

### Run as PWA

`npm install -g serve`
`npm run build`
`serve -s build`

Then go to

`dev.client.com:3000` in normal window(not incognito)
Install App by click on install icon in search bar adjascent to bookmark icon.
Open the application as PWA.

For using API's, follow the given instructions.

1.  `sudo nano /etc/hosts`
2.  Add `${ip} api.admin.com`, where ip belongs to API of hosted machine.
3.  Save and Exit.

### Test

`npm run test`

### Lint

`npm run lint`

### Issue Tracker

### Coding styles

- Keep it simple and readable with type definitions.
- Write unit tests as much as possible.
- Follow the rule of linting. You can't do committing with messy codes.
