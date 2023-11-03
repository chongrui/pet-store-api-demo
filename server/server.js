const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const httpProxy = require('http-proxy');
const url = require('url');
const path = require('path');

const SWAGGER_PET_STORE_API_SERVER_TARGET = process.env.SWAGGER_PET_STORE_API_SERVER_ADDRESS || 'http://127.0.0.1:8080';

const handleApiProxyError = (res) => (e) => {
  console.log(e);
  res.status(500).send(e?.message || 'Internal Server Error');
};

const port = process.env.PORT || 4000;
const app = express();
app.disable('x-powered-by');
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const apiProxy = httpProxy.createProxyServer({ secure: false });

const serverHostname = url.parse(SWAGGER_PET_STORE_API_SERVER_TARGET).hostname;
apiProxy.on('proxyReq', (proxyReq) => {
  proxyReq.setHeader('Host', serverHostname);
});
app.all('/api/v3/*', (req, res) => {
  apiProxy.web(req, res, { target: SWAGGER_PET_STORE_API_SERVER_TARGET }, handleApiProxyError(res));
});

app.use('/', express.static('build'));

app.get('/*', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Swagger Pet Store API Demo listening on port ${port}`);
});
