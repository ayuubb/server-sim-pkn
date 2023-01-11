require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const mahasiswaRoute = require('./api/mahasiswa/mahasiswa.router');
const portofolioRoute = require('./api/portofolio/portofolio.router');
const pelaksanaanRoute = require('./api/pelaksanaan/pelaksanaan.router');
const laporanRoute = require('./api/laporan/laporan.router');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

app.use('/api/mahasiswa', mahasiswaRoute);
app.use('/api/portofolio', portofolioRoute);
app.use('/api/pelaksanaan', pelaksanaanRoute);
app.use('/api/laporan', laporanRoute);

const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`running on port ${port}`);
    console.log('ini jalan');
});
