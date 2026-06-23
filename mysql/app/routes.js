//===============================Make connection to db===================================//
var mysql = require('mysql');
var connection = require('express-myconnection'); //for db access

var connection = mysql.createConnection({
    host: '104.131.5.102',
    user: 'dylan',
    password: 'bluecakes',
    database: 'stains',
});

var currentUser = null;

connection.connect();



//================================Routes===========================================//

module.exports = function(app) {

    //use this to check the current user
    app.get('/authorize', function(req, res) {
        res.send(currentUser);
    });


    //Query by username
    app.get('/user/:username', function(req, res) {
        connection.query('SELECT * FROM user WHERE (username = "' + req.params.username + '")',
            function(err, rows) {
                if (err)
                    res.send(err);
                res.json(rows);

            });
    });



    //Query by user_id
    app.get('/user_id/:user_id', function(req, res) {
        connection.query('SELECT * FROM user WHERE (user_id = "' + req.params.user_id + '")',
            function(err, rows) {
                if (err)
                    res.send(err);
                res.json(rows);

            });
    });

    app.get('/matches/:username', function(req, res) {

        connection.query('SELECT degree_of_match, user1_id, user2_id FROM matches WHERE (user1_id = (SELECT user_id FROM user WHERE username = "' + req.params.username + '") OR user2_id = (SELECT user_id FROM user WHERE username = "' + req.params.username + '")) ORDER BY degree_of_match LIMIT 0,10',
            function(err, rows) {

                if (err)
                    res.send(err);

                res.json(rows);

            });
    });

    //LOGIN
    app.get('/login/:username/:password', function(req, res) {

        var username = req.params.username;
        var password = req.params.password;

        console.log('u ' + username + " p " + password);

        var queryText = "SELECT * FROM user WHERE (username= '" + username + "'" + "AND" + " password='" + password + "')";

        //check if the user is in the database
        connection.query(queryText,
            function(err, rows) {
                currentUser = rows[0];
                res.send(currentUser);
            });

    });
    //===============================CREATE USER ===========================================
    app.post("/user/create", function(req, res) {
        console.log(req.body);

        var values =
            "(username, password, firstname, lastname, email, level_num, country, gender, preference)";

        var post = "INSERT INTO user" + values + "VALUES (" + "'" + req.body.username + "'" + "," +
            "'" + req.body.password + "'" + "," +
            "'" + req.body.firstname + "'" + "," +
            "'" + req.body.lastname + "'" + "," +
            "'" + req.body.email + "'" + "," +
            "'" + req.body.level_num + "'" + "," +
            "'" + req.body.country + "'" + "," +
            "'" + req.body.gender + "'" + "," +
            "'" + req.body.preference + "'" + ")";


        console.log(' in a pie ' + post);

        connection.query(post, function(error) {
            if (error) {

                console.log(error.message);
            } else {
                console.log('post ');

            }
        });
    });
    //==========================GET 4 CLEANING PRODUCTS FOR USER'S NEXT LEVEL=============================
    app.get('/cp_to_show/:username', function(req, res) {

        connection.query('SELECT sts.cp1_id, sts.cp2_id, sts.cp3_id, sts.cp4_id FROM stain_to_show sts WHERE level_number = (SELECT (1 + u.level_num ) FROM user u WHERE (u.username = "' + req.params.username + '"))',
            function(err, rows) {
                if (err)
                    res.send(err);
                res.json(rows);
            });

    });
    //==========================GET CLEANING PRODUCT NAME WITH ID===================================
    app.get('/cp_name:cp_id', function(req, res) {

        connection.query('SELECT product_name FROM cleaning_product WHERE product_id = ' + req.params.cp_id,

            function(err, rows) {
                if (err)
                    res.send(err);
                res.json(rows);
            });

    });

    //======================GET IMAGE URL FOR CURRENT USER==================================================

    app.get('/img_url/:username', function(req, res) {

        connection.query('SELECT img_url from substance WHERE substance_id = ( SELECT substance_id from stain_to_show WHERE level_number = ( SELECT 1+ level_num from user WHERE (username = "' + req.params.username + '") ) )',

            function(err, rows) {
                if (err)
                    res.send(err);
                res.json(rows);
            });

    });
    //======================Make a MyStain==================================================



}