const express = require('express')
const app = express()
const path = require('path')
const expressHandelBars = require('express-handlebars')
const bodyParser = require('body-parser')

app.engine('.hbs', expressHandelBars({
    defaultLayout: 'main',
    extname: '.hbs'
  }))
  app.set('view engine', '.hbs')
  
  app.use(express.static(path.join(__dirname, 'public')))

  app.use(bodyParser.urlencoded({extended: true}))

  app.use('/', require('./routes/home'))
  app.use('/add', require('./routes/databass/databassSides'))
  app.use('/showInformation', require('./routes/databass/showInformation'))
  app.use('/toSerchFor', require('./routes/databass/searchSide'))

app.use((req, res) => res.status(404).render('error/404'))

console.log()

app.use(async (err, req, res, next) => {
  if (req.app.get('env') !== 'devolopment') {
    return res.status(500).render('error/500')
  }
})
app.listen(8000, () => console.log('starting'))