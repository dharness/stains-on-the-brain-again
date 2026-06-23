function User(userData, $http) {
    this.username = userData.username
    this.password = userData.password
    this.firstname = userData.firstname
    this.lastname = userData.lastname
    this.email = userData.email
    this.level_num = userData.level_num
    this.country = userData.country
    this.gender = userData.gender
    this.preference = userData.preference
    this.$http = $http
}

User.prototype.updateMatches = function(cp_chosen) {
    var mystain = {
        username: this.username,
        sts_id: this.level_num,
        cp_chosen: cp_chosen
    }
}

User.prototype.levelUp = function(cp_chosen) {
    console.log(cp_chosen)

    var updates = {
        username: currentUser.username,
        sts_id: currentUser.level_num + 1,
        cp_chosen: cp_chosen
    }

    this.$http.post('/stain/create', updates)
    this.$http.post("/levelup/" + currentUser.username).success(function(data) {
        this.level_num++
    })

}

User.prototype.getMystains = function(onFind) {
    this.$http.get("/mystains/" + this.username).success(function(data) {
        onFind(data)
    });
}