//================================Routes===========================================//
var db = require('./data.js')

var currentUser = null

module.exports = function(app) {

    //use this to check the current user
    app.get('/authorize', function(req, res) {
        res.send(currentUser);
    });


    //Query by username
    app.get('/user/:username', function(req, res) {
        var rows = db.users.filter(function(u) {
            return u.username === req.params.username
        })
        res.json(rows);
    });



    //Query by user_id
    app.get('/user_id/:user_id', function(req, res) {
        var rows = db.users.filter(function(u) {
            return String(u.user_id) === req.params.user_id
        })
        res.json(rows);
    });

    app.get('/matches/:username', function(req, res) {
        var user = db.users.filter(function(u) {
            return u.username === req.params.username
        })[0]

        var rows = []
        if (user) {
            rows = db.matches.filter(function(m) {
                return m.user1_id === user.user_id || m.user2_id === user.user_id
            }).sort(function(a, b) {
                return a.degree_of_match - b.degree_of_match
            }).slice(0, 10)
        }

        res.json(rows);
    });

    //=============================== LOGIN ===========================================
    // demo mode: any username/password logs in - matches an existing user by
    // username if there is one, otherwise creates one on the fly
    app.get('/login/:username/:password', function(req, res) {

        var result = db.users.filter(function(u) {
            return u.username === req.params.username
        })[0]

        if (!result) {
            result = db.createUser({
                username: req.params.username,
                password: req.params.password,
                firstname: req.params.username,
                lastname: '',
                email: '',
                level_num: 0,
                country: '',
                gender: '',
                preference: ''
            })
        }

        currentUser = result
        res.send(result)
    });


    //=============================== CREATE USER ===========================================

    app.post("/user/create", function(req, res) {

        db.createUser({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            level_num: req.body.level_num,
            country: req.body.country,
            gender: req.body.gender,
            preference: req.body.preference
        })

        res.send('200 OK')
    });

    //========================== GET CURRENT STAIN AND ITS 4 CLEANING PRODUCTS FOR THE USER =============================
    app.get('/cp_to_show/:username', function(req, res) {

        var user = db.users.filter(function(u) {
            return u.username === req.params.username
        })[0]

        var rows = []
        if (user) {
            var level = ((user.level_num - 1) % db.stainToShow.length) + 1
            rows = db.stainToShow.filter(function(s) {
                return s.level_number === level
            })
        }

        res.json(rows);
    });
    //========================== GET CLEANING PRODUCT NAME WITH ID ===================================
    app.get('/cp_name/:cp_id', function(req, res) {

        var rows = db.cleaningProducts.filter(function(p) {
            return p.product_id === Number(req.params.cp_id)
        })

        res.send(rows);
    });

    //======================Make a MyStain==================================================

    //get stain to show id of the stain the user cleaned
    app.get('/sts_id/:username', function(req, res) {

        var user = db.users.filter(function(u) {
            return u.username === req.params.username
        })[0]

        var rows = []
        if (user) {
            rows = db.stainToShow.filter(function(s) {
                return s.level_number === (1 + user.level_num)
            }).map(function(s) {
                return { sts_id: s.sts_id }
            })
        }

        res.json(rows);
    });


    app.post("/stain/create", function(req, res) {

        db.mystains.push({
            username: req.body.username,
            sts_id: req.body.sts_id,
            cp_chosen: req.body.cp_chosen
        })

        res.send('200 OK')
    })

    //====================== LEVEL UP A USER ==================================================

    app.post("/levelup/:username", function(req, res) {

        var user = db.users.filter(function(u) {
            return u.username === req.params.username
        })[0]

        if (user) {
            user.level_num += 1
        }

        res.send('200 OK')
    })



    //=========================== GET MYSTAIN BY USERNAME ============================================
    app.get('/mystains/:username', function(req, res) {

        var docs = db.mystains.filter(function(m) {
            return m.username === req.params.username
        }).map(function(m) {
            return {
                username: m.username,
                sts_id: m.sts_id,
                cp_chosen: m.cp_chosen
            }
        })

        res.send(docs);
    });

}
