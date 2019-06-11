
var db  = {};
var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : '101.200.56.109',
    user            : 'root',
    password        : 'zucc',
    database        : 'js'
});

db.query = function(sql, callback){

    if (!sql) {
        callback();
        return;
    }
    pool.query(sql, function(err, rows, fields) {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        };

        callback(null, rows, fields);
    });
}
db.dataCenter = function(sql, fn) {
    // (callback && typeof(callback) === "function")
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log("POOL ==> " + err);
            return fn(err);
        } else {
            conn.query(sql, function (err, res) {
                conn.release();
                return fn(res);
            });
        }
    });
};
db.queryplug = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(err)
                resolve( err )
            } else {
                connection.query(sql, values, ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
};
module.exports = db;
