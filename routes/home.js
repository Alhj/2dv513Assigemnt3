const side = require('express').Router()

side.route('/')
  .get((req, res) => {
      res.render('home/Startsida')
})

module.exports = side