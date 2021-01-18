const express = require('express');
const path = require('path');

const app = express()
// const userRouter = require('./routes/page.route');

// set static directories
app.use(express.static(path.join(__dirname, 'dist')));
const port = 3900

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use('/registration', express.static(path.join(__dirname, 'dist/registrationPage.html')))
app.use('/login', express.static(path.join(__dirname, 'dist/loginPage.html')))
// app.use('/show/:id', express.static(path.join(__dirname,'dist/showTrack.html')))
app.use('/mytracks', express.static(path.join(__dirname, 'dist/trackListPage.html')))
app.use('/upload', express.static(path.join(__dirname, 'dist/loadTrackPage.html.html')))


app.listen(port, () => {
  console.log(`🛸 Example app listening at http://localhost:${port}`)
})