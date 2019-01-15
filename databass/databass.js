const sqlite = require('sqlite3').verbose()
const scheman = require('./scheman/scehmanGame')

function connect () {
    let connection = new sqlite.Database('databass.db')
    console.log('connection')
    return connection
  }
  function makeTabel () {
   let con = connect()
   scheman.createTabelGame(con)
  }

  function insertIntoGame(connection,title,genre, gameConsole) {
      connection.run('INSERT INTO Games(Title, Genere, Console) VALUES(?,?,?)', title, genre, gameConsole)
  }
  function insertIntoDevelpor(connection, name, game) {
      connection.run('INSERT INTO Develpor(Name, Game) VALUES(?,?)', name, game)
  }
  function insertIntoPublisher(connection, name, game) {
    connection.run('INSERT INTO Publisher(Name, Game) VALUES(?,?)', name, game)
  }

  function gameWhoYouHaveTwoOf(connection, callback) {
       connection.all('SELECT Title, Genere FROM Games GROUP BY Title HAVING COUNT(Title) > 1', function(err, result) {
        if(err) throw err() 
        callback(result)  
      })
  }

  function howManyGamesByDevelpor (connection, callback) {

    let query = 'SELECT Name, COUNT(Name) AS Times FROM Develpor GROUP BY Name ORDER BY COUNT(NAME) DESC'
    connection.all(query,(err, result) => {
        if(err) throw err
        callback(result)
    })
}


  function getAllGames(connection, callback) {
      connection.all('SELECT * FROM Games INNER JOIN Develpor ON Develpor.game = Games.Title INNER JOIN Publisher ON Games.Title = Publisher.game', function(err, result){
          if(err) throw err

          callback(result)
      })
  }

  function getAllDevelporsGames(connection, company, callback) {
    let query = 'SELECT * FROM Develpor INNER JOIN Games ON Develpor.game = Games.Title AND Develpor.Name = "' + company +'"'
    connection.all(query, function(err, result) {
        if(err) throw err
        callback(result)
    })
  }

  function getAllConsoleGames(connection, theConsole, callback) {
      let query = 'SELECT * FROM Games WHERE Console ="' + theConsole + '"'

      connection.all(query, function(err, result) {
          if(err) throw err
          callback(result)
      })
  }
  function serchForGame(connection, title, callback) {
      let query = 'SELECT * FROM Games WHERE Title = "' + title + '"'

      connection.all(query, function(err, result) {
          if(err) throw err
          callback(result)
      })
  }

    function doItExists(connection, game, callback) {
        let query = 'SELECT Game FROM Develpor WHERE Game = "' + game + '"'
        connection.all(query,(err, result) => {
            if(err) throw err
            callback(result)
        })
    }

  module.exports = {
      connect,
      makeTabel,
      insertIntoGame,
      insertIntoDevelpor,
      insertIntoPublisher,
      gameWhoYouHaveTwoOf,
      getAllGames,
      getAllDevelporsGames,
      getAllConsoleGames, 
      serchForGame,
      doItExists,
      howManyGamesByDevelpor
  }