const express = require('express');
const http = require('http');
const path = require('path');
const request = require('request');

// const api = require('./server/routes/api');

const app = express();

app.use('/TAKEALOT',
    function(req, res) {

        const url = 'http://192.168.42.181:8080/TAKEALOT'+req.url;
        var apiResponse = null;
        console.log('******************',url)
        if(req.method === 'POST') {
            apiResponse = apiResponse = request.post({uri: url, json: req.body});
            console.log('******************',apiResponse)
        } else {
            apiResponse = request(url);
            console.log('******************',apiResponse)
        }

        req.pipe(apiResponse).pipe(res);
    }
);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'dist/index.html'));
});

const port = process.env.PORT || '4040';
app.set('port',port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Running`));