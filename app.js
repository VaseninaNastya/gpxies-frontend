const express = require('express');
const path = require('path');

const app = express();
// const userRouter = require('./routes/page.route');

app.get('/', (req, res) => {
  res.redirect('/mytracks');
});
// set static directories
app.use(express.static(path.join(__dirname, 'dist')));
const port = 3900;

// const secured = (req, res, next) => {
//   // console.log(req);
//   console.log(localStorage.getItem('gpxiesToken'));
//   if (req.user) {
//     return next();
//   }
//   // req.session.returnTo = req.originalUrl;
//   res.redirect("/login");
// };

app.use('/registration', express.static(path.join(__dirname, 'dist/registrationPage.html')));
app.use('/login', express.static(path.join(__dirname, 'dist/loginPage.html')));
app.use('/mytracks', express.static(path.join(__dirname, 'dist/trackListPage.html')));
app.use('/upload', express.static(path.join(__dirname, 'dist/loadTrackPage.html')));

app.use('/track/:hashString', (req, res, next) => {
  express.static(__dirname + '/dist/showTrack.html')(req, res, next);
});
app.use('/track/:hashString/edit', (req, res, next) => {
  express.static(__dirname + '/dist/showTrack.html')(req, res, next);
});

app.listen(port, () => {
  console.log(`🛸 Front-end app listening at http://localhost:${port}`);
});
