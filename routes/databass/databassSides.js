const side = require('express').Router()
const databass = require('../../databass/databass')

side.route('/')
  .get((req, res) => {
      res.render('databassView/add')
})
.post((req, res) => {
  let connection = databass.connect()
  databass.insertIntoGame(connection, req.body.gameTitle, req.body.Genre, req.body.gameConsole)

  databass.doItExists(connection,req.body.gameTitle, (data) => {
      if(data.length === 0) {
        databass.insertIntoDevelpor(connection,  req.body.develporName, req.body.gameTitle)
        databass.insertIntoPublisher(connection, req.body.publisher, req.body.gameTitle)
      }
      res.redirect('/showInformation')
  })
})
module.exports = side