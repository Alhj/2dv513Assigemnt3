
function createTabelGame(database) {
    let tabelGame = 'CREATE TABELGames (title TEXT NOT NULL, Developer Name TEXT NOT NULL, Genre TEXT NOT NULL, Console TEXT NOT NULL)'
    database.run(tabelGame, () => {
        console.log('create Game Tabel')
    })
}
function createTabelDevelpor(database) {
    let tabelGame = 'CREATE TABEL Develpor name TEXT NOT NULL, Game TEXT NOT NULL '
    database.run(tabelGame, () => {
        console.log('create Game Develpor')
    })
}
function createTabelPublisher(database) {
    let tabelGame = 'CREATE TABEL Publisher name TEXT NOT NULL, Game TEXT NOT NULL '
    database.run(tabelGame, () => {
        console.log('create Game Develpor')
    })
}


  module.exports = {
    createTabelGame,
    createTabelDevelpor,
    createTabelPublisher
}