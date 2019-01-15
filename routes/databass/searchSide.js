const side = require('express').Router()
const databass = require('../../databass/databass')

side.route('/')
    .get((req,res) => {
        res.render('databassView/serch')
    })

    .post((req, res) => {
        if(req.body.console) {
        res.redirect('/toSerchFor/serchForConsole/' + req.body.serchForThis + '')
        return null
        }
        if(req.body.serchgame) {
            res.redirect('/toSerchFor/serchForGame/' + req.body.serchForThis +'')
            return null
        }
        if(req.body.serchDevelpor) {
            res.redirect('/toSerchFor/serchForDevelpor/' + req.body.serchForThis +'')
            return null 
        }
        res.redirect('/toSerchFor')
    })
side.route('/serchForGame/:id')
    .get((req,res) => {
        let connection = databass.connect()
        databass.serchForGame(connection,req.params.id,(games) => {
            res.render('databassView/showSerch', {games:games})
        })
    })

side.route('/serchForConsole/:console')
    .get((req, res) => {
        let connection = databass.connect()
        databass.getAllConsoleGames(connection, req.params.console, function(data) {
            res.render('databassView/showSerch', {games:data})
        })
    })

side.route('/serchForDevelpor/:Develpor')
    .get((req, res) => {
        let connection = databass.connect()
        databass.getAllDevelporsGames(connection, req.params.Develpor, function(data) {
            res.render('databassView/showDevelporsGames', {games:data})
        })
    })

    module.exports = side