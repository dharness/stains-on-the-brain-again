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

    //=============================== LOGIN ===========================================
    app.get('/login/:username/:password', function(req, res) {

        _db.collection('stain_db_users').findOne({
                username: req.params.username,
                password: req.params.password
            },
            function(err, result) {
                if (err)
                    throw err
                if (result)
                    res.send(result)
            })
    });


    //=============================== CREATE USER ===========================================

    app.post("/user/create", function(req, res) {

        _db.collection('stain_db_users').insert({

            //all info for a particular user
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            level_num: req.body.level_num,
            country: req.body.country,
            gender: req.body.gender,
            preference: req.body.preference

        }, function(err, records) {
            if (err)
                throw err
            res.send('200 OK')
        })

    });

    //========================== GET 4 CLEANING PRODUCTS FOR USER'S NEXT LEVEL =============================
    app.get('/cp_to_show/:username', function(req, res) {

        connection.query('SELECT sts.cp1_id, sts.cp2_id, sts.cp3_id, sts.cp4_id FROM stain_to_show sts WHERE level_number = (SELECT (1 + u.level_num ) FROM user u WHERE (u.username = "' + req.params.username + '"))',
            function(err, rows) {
                if (err)
                    res.send(err);
                res.json(rows);
            });

    });
    //========================== GET CLEANING PRODUCT NAME WITH ID ===================================
    app.get('/cp_name/:cp_id', function(req, res) {

        var queryText = 'SELECT product_name FROM cleaning_product WHERE product_id = ' + req.params.cp_id;
        console.log('query: ' + queryText);
        connection.query(queryText, function(err, rows) {

            res.send(rows);

        });
    });



    //====================== GET IMAGE URL FOR CURRENT USER ==================================================

    // app.get('/img_url/:username', function(req, res) {

    //     connection.query('SELECT img_url from substance WHERE substance_id = ( SELECT substance_id from stain_to_show WHERE level_number = ( SELECT 1+ level_num from user WHERE (username = "' + req.params.username + '") ) )',
    //         function(err, rows) {
    //             if (err)
    //                 res.send(err);
    //             res.json(rows);
    //         });
    // });

    //======================Make a MyStain==================================================

    //get stain to show id of the stain the user cleaned
    app.get('/sts_id/:username', function(req, res) {

        connection.query("SELECT sts_id FROM stain_to_show WHERE level_number = (SELECT 1 + level_num from user WHERE (username = '" + req.params.username + "'))",

            function(err, rows) {
                if (err)
                    res.send(err);
                res.json(rows);
            });

    });


    app.post("/stain/create", function(req, res) {

        _db.collection('stain_db_mystains').insert({

            username: req.body.username,
            sts_id: req.body.sts_id,
            cp_chosen: req.body.cp_chosen

        }, function(err, records) {
            if (err)
                throw err
            res.send('200 OK')
        })
    })

    //====================== LEVEL UP A USER ==================================================

    app.post("/levelup/:username", function(req, res) {

        _db.collection('stain_db_users').update({
            username: req.params.username
        }, {
            $inc: {
                level_num: 1
            }
        }, function(err, records) {
            if (err)
                throw err
            res.send('200 OK')
        })
    })



    //=========================== GET MYSTAIN BY USERNAME ============================================
    app.get('/mystains/:username', function(req, res) {

        _db.collection('stain_db_mystains').find({
            username: req.params.username
        }, {

            username: 1,
            sts_id: 1,
            cp_chosen: 1,
            _id: 0

        }).toArray(function(err, docs) { //return the mystains as an array
            res.send(docs);
        });

    });

}