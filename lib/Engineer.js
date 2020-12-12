// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.



const Employee = require("./Employee.js")

class Engineer extends Employee {
    constructor(name,id,email,GitHUb) {
        super(name,id,email);
        this.github = GitHUb
    }

    getGithub() {
        return this.github
    }

    getRole() {
        return "Engineer"
    }
}

module.exports = Engineer