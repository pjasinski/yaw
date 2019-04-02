const express = require('express');
const app = express();
const https = require('http');
// start server
const port = 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
