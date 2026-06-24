function User(userData) {
    this.username = userData.username
    this.password = userData.password
    this.firstname = userData.firstname
    this.lastname = userData.lastname
    this.email = userData.email
    this.level_num = userData.level_num
    this.country = userData.country
    this.gender = userData.gender
    this.preference = userData.preference
}

User.prototype.updateMatches = function(cp_chosen) {
    var mystain = {
        username: this.username,
        sts_id: this.level_num,
        cp_chosen: cp_chosen
    }
}

User.prototype.levelUp = function(cp_chosen, onDone) {
    var updates = {
        username: this.username,
        sts_id: this.level_num + 1,
        cp_chosen: cp_chosen
    }

    db.createStain(updates)
    db.levelUp(this.username)

    if (onDone) onDone()
}

User.prototype.getMystains = function(onFind) {
    onFind(db.getMystains(this.username))
}