// app/data.js
// In-memory stand-in for the original (now-dead) remote MongoDB/MySQL backends.
// Seeded with sample data so the app runs without any external database.

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

// the full set of real stain photos, ported over from the mysql copy's
// public/images/raw_stains folder (1.png through 106.png)
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

module.exports = {
    users: users,
    matches: matches,
    cleaningProducts: cleaningProducts,
    stainToShow: stainToShow,
    mystains: mystains,
    createUser: function(user) {
        user.user_id = nextUserId++
        users.push(user)
        return user
    }
}
