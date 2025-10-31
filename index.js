require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const HUBSPOT_API = 'https://api.hubapi.com';
const token = process.env.HUBSPOT_ACCESS_TOKEN;
const objectName = process.env.CUSTOM_OBJECT_NAME || 'pets';

// Homepage - list pets
app.get('/', async (req, res) => {
  try {
    const props = ['name','breed','description'].join(',');
    const response = await axios.get(`${HUBSPOT_API}/crm/v3/objects/${objectName}?properties=${props}&limit=100`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const records = response.data.results || [];
    res.render('homepage', { title: 'Pets - Custom Object Records', records });
  } catch (error) {
    console.error('Error fetching records:', error.response?.data || error.message);
    res.render('homepage', { title: 'Pets - Custom Object Records', records: [], error: error.response?.data || error.message });
  }
});

// GET form to add a pet
app.get('/update-cobj', (req, res) => {
  res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

// POST create a new pet record
app.post('/update-cobj', async (req, res) => {
  const { name, breed, description } = req.body;

  try {
    await axios.post(`${HUBSPOT_API}/crm/v3/objects/${objectName}`, {
      properties: { name, breed, description }
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    res.redirect('/');
  } catch (error) {
    console.error('Error creating record:', error.response?.data || error.message);
    res.send('Error creating record: ' + JSON.stringify(error.response?.data || error.message));
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
