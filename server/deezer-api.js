const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');

// cors settings
const corsOptions = {
    origin:'http://127.0.0.1:3000',
    credential: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// loading middleware
app.use(bodyParser.json());

app.use(express.static(__dirname + '/dist/order-app'));

// hosting the project
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname+'/dist/musicdb-app-angular/index.html'));
});

// cors for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.get('/api/artist', async (req, res) => {
    try {
        const response = await axios.get('https://api.deezer.com/search', {
            params: {
                q: req.params.q,
                limit: req.params.limit || 5,
                offset: req.params.offset || 0,
                order: req.params.order || 'RANKING',
                output: req.params.output || 'json',
            },
        });

        res.json(response.data);
    } catch (error) {
        console.log(error);
        console.log('inside the error block');
        res.status(500).send('Internal server error');
    }
});

app.get('/api/artist/details', async (req, res) => {
    try {
        const response = await axios.get('https://api.deezer.com/artist', {
            params: {
                q: req.params.q,
                limit: req.params.limit || 5,
                offset: req.params.offset || 0,
                order: req.params.order || 'RANKING',
                output: req.params.output || 'json',
            },
        });

        res.json(response.data);
    } catch (error) {
        console.log(error);
        console.log('inside the error block');
        res.status(500).send('Internal server error');
    }
});

app.get('/api/artist/number/of/fans', async (req, res) => {
    try {
        const response = await axios.get('https://api.deezer.com/artist', {
            params: {
                q: req.params.q,
                limit: req.params.limit || 5,
                offset: req.params.offset || 0,
                order: req.params.order || 'RANKING',
                output: req.params.output || 'json',
            },
        });

        res.json(response.data);
    } catch (error) {
        console.log(error);
        console.log('inside the error block');
        res.status(500).send('Internal server error');
    }
});

app.get('/api/artist/top/charts', async (req, res) => {
    try {
        const response = await axios.get('https://api.deezer.com/artist', {
            params: {
                q: req.params.q,
                limit: req.params.limit || 5,
                offset: req.params.offset || 0,
                order: req.params.order || 'RANKING',
                output: req.params.output || 'json',
            },
        });

        res.json(response.data);
    } catch (error) {
        console.log(error);
        console.log('inside the error block');
        res.status(500).send('Internal server error');
    }
});

app.get('/api/artist/albums', async (req, res) => {
    try {
        const response = await axios.get('https://api.deezer.com/user', {
            params: {
                q: req.params.q,
                limit: req.params.limit || 5,
                offset: req.params.offset || 0,
                order: req.params.order || 'RANKING',
                output: req.params.output || 'json',
            },
        });

        res.json(response.data);
    } catch (error) {
        console.log(error);
        console.log('inside the error block');
        res.status(500).send('Internal server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});