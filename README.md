# Integrating With HubSpot I: Foundations Practicum

## Practicum: Pets Custom Object (Completed)

This fork has been modified to implement the Integrating With HubSpot I: Foundations practicum.
The custom object used in this implementation is **Pets** (replace `CUSTOM_OBJECT_NAME` in `.env` with your object's internal name).

### What I added / changed
- `index.js` with three routes:
  - GET `/` - lists custom object records (properties: name, breed, description)
  - GET `/update-cobj` - form to add a record
  - POST `/update-cobj` - creates a new record via HubSpot CRM API
- `views/homepage.pug` - table view for records
- `views/updates.pug` - form to create records
- `public/css/style.css` - basic styling
- `.env.example` - environment variables example

### How to run locally
1. Copy `.env.example` to `.env` and set `HUBSPOT_ACCESS_TOKEN` and `CUSTOM_OBJECT_NAME`.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the app:
   ```
   node index.js
   ```
4. Open `http://localhost:3000` in your browser.

### README: HubSpot custom object list link (placeholder)
Add this to the top of your README before submitting:
```
Custom Object List: https://app.hubspot.com/contacts/<test-account-id>/objects/<custom-object-id>/views/all/list
```

### Git commands suggested
```
git checkout -b working-branch
git add .
git commit -m "First commit to my Integrating With HubSpot I: Foundations practicum repository."
git push origin working-branch
```
Then open a PR and merge to main before submitting the practicum.
