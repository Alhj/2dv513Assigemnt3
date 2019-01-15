const side = require('express').Router()
const databass = require('../../databass/databass')

side.route('/')
  .get(async (req, res) => {
      let conection = databass.connect()
      databass.getAllGames(conection,function(data) {
        res.render('databassView/showInformation', {games: data,})
      })
})


side.route('/dupicateGames')
  .get((req, res) => {
    let conection = databass.connect()
      databass.gameWhoYouHaveTwoOf(conection,function(data) {
        res.render('databassView/showDublicatesGames', {games: data,})
      })
  })

  side.route('/gamesByDelevpors')
  .get((req, res) => {
    let conection = databass.connect()
    databass.howManyGamesByDevelpor(conection, (data) => {
      res.render('databassView/howManyGames', {games: data,})
    })
  })

module.exports = side