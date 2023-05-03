const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/artist', async (req, res) => {
    try {
        const response = await axios.get('https://api.deezer.com/search', {
            params: {
                q: req.params.q,
                limit: req.params.limit || 10,
                offset: req.params.offset || 0,
                order: req.params.order || 'RANKING',
                output: req.params.output || 'json',
            },
        });

        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});