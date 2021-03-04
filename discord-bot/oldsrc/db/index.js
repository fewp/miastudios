const sqlite = require('sqlite3').verbose();

// open database in memory
let db = new sqlite.Database('./src/db/main.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
/* db.run(`CREATE TABLE "where_from" (
	"id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"user_id" TEXT NOT NULL,
    "reaction" TEXT NOT NULL
)`);
 */

/* db.all("SELECT * FROM movies ORDER BY id DESC LIMIT 1", function(err, rows) {
    rows.forEach(function (row) {
        console.log(row.id + ": " + row.date + ": " + row.messageId);
    });
}); */


/* db.all("SELECT * FROM movies", function(err, rows) {
    rows.forEach(function (row) {
        console.log(row.id + ": " + row.data + ": " + row.messageId);
    });
}); */