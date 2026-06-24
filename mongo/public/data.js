// data.js
// Front-end-only, in-memory data store. No server, no database, no network
// calls - this replaces what app/data.js + app/routes.js used to do on the
// (now-dead) Express/MongoDB backend. Everything lives in memory for the
// lifetime of the page load, and resets on refresh.

var users = [
    { user_id: 1, username: 'demo', password: 'demo', firstname: 'Demo', lastname: 'User', email: 'demo@example.com', level_num: 1, country: 'USA', gender: 'F', preference: 'M' },
    { user_id: 2, username: 'alice', password: 'alice', firstname: 'Alice', lastname: 'Anderson', email: 'alice@example.com', level_num: 3, country: 'Canada', gender: 'F', preference: 'M' },
    { user_id: 3, username: 'bob', password: 'bob', firstname: 'Bob', lastname: 'Brown', email: 'bob@example.com', level_num: 2, country: 'UK', gender: 'M', preference: 'F' }
]

var matches = [
    { degree_of_match: 1, user1_id: 1, user2_id: 2 },
    { degree_of_match: 2, user1_id: 1, user2_id: 3 }
]

var cleaningProducts = [
    { product_id: 1, product_name: 'Bleach' },
    { product_id: 2, product_name: 'Soap' },
    { product_id: 3, product_name: 'Vinegar' },
    { product_id: 4, product_name: 'Baking Soda' }
]

// the full set of real stain photos, in images/raw_stains (1.png through 106.png)
var stainImages = []
for (var i = 1; i <= 106; i++) {
    stainImages.push('raw_stains/' + i + '.png')
}

// cycle through the 4 seeded cleaning products and all 106 stain images,
// so the demo doesn't dead-end after a couple of clicks
var stainToShow = []
for (var lvl = 1; lvl <= stainImages.length; lvl++) {
    stainToShow.push({
        sts_id: lvl,
        level_number: lvl,
        cp1_id: 1,
        cp2_id: 2,
        cp3_id: 3,
        cp4_id: 4,
        img_url: stainImages[(lvl - 1) % stainImages.length]
    })
}

var mystains = []
var nextUserId = users.length + 1

var db = {

    // demo mode: any username/password logs in - matches an existing user
    // by username if there is one, otherwise creates one on the fly
    login: function(username, password) {
        var result = users.filter(function(u) { return u.username === username })[0]

        if (!result) {
            result = db.createUser({
                username: username,
                password: password,
                firstname: username,
                lastname: '',
                email: '',
                level_num: 0,
                country: '',
                gender: '',
                preference: ''
            })
        }

        return result
    },

    createUser: function(user) {
        user.user_id = nextUserId++
        users.push(user)
        return user
    },

    getUser: function(username) {
        return users.filter(function(u) { return u.username === username })
    },

    getUserById: function(user_id) {
        return users.filter(function(u) { return String(u.user_id) === String(user_id) })
    },

    getMatches: function(username) {
        var user = users.filter(function(u) { return u.username === username })[0]
        if (!user) return []

        return matches.filter(function(m) {
            return m.user1_id === user.user_id || m.user2_id === user.user_id
        }).sort(function(a, b) {
            return a.degree_of_match - b.degree_of_match
        }).slice(0, 10)
    },

    getCpToShow: function(username) {
        var user = users.filter(function(u) { return u.username === username })[0]
        if (!user) return []

        var level = ((user.level_num - 1) % stainToShow.length) + 1
        return stainToShow.filter(function(s) { return s.level_number === level })
    },

    getCpName: function(cp_id) {
        return cleaningProducts.filter(function(p) { return p.product_id === Number(cp_id) })
    },

    createStain: function(stain) {
        mystains.push(stain)
    },

    levelUp: function(username) {
        var user = users.filter(function(u) { return u.username === username })[0]
        if (user) user.level_num += 1
    },

    getMystains: function(username) {
        return mystains.filter(function(m) { return m.username === username })
    }
}
