const Roles = require("../enums/RoleType")

class userEntity {
    constructor({email, password, name, role = Roles.EMPLOYEE, creationDate}){
        this.email = email
        this.password = password
        this.name = name
        this.role = role
        this.creationDate = creationDate 
    }

    ifIsAdmin(){
        return this.role === Roles.ADMIN;
    }
}

module.exports = userEntity;