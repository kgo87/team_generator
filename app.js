const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");



const render = require("./lib/htmlRenderer");
const employeeList = [];


const questionsManager = [

    {
        type: 'input',
        message: 'What is your name?',
        name: 'name',
    },
    {
        type: 'input',
        message: 'What is your id?',
        name: 'id',
    },
    {
        type: 'input',
        message: 'What is your email?',
        name: 'email',
    },
    {
        type: 'input',
        message: 'What is your office number?',
        name: 'officeNumber',
    }

];

const questionsEngineer = [

    {
        type: 'input',
        message: 'What is your name?',
        name: 'name',
    },
    {
        type: 'input',
        message: 'What is your id?',
        name: 'id',
    },
    {
        type: 'input',
        message: 'What is your email?',
        name: 'email',
    },
    {
        type: 'input',
        message: 'What is your GitHub?',
        name: 'github',
    }

];

const questionsIntern = [

    {
        type: 'input',
        message: 'What is your name?',
        name: 'name',
    },
    {
        type: 'input',
        message: 'What is your id?',
        name: 'id',
    },
    {
        type: 'input',
        message: 'What is your email?',
        name: 'email',
    },
    {
        type: 'input',
        message: 'What school did you attend?',
        name: 'school',
    }

];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function (error){
        if (error) {
            throw error;
        }
    });
}

function askforManagerInfo() {
    console.log("Hello Manager! Let's build your awesome team!")
    console.log("To start, follow the prompts and enter information about yourself.")
    return inquirer.prompt(questionsManager)
    .then((response) => {
        const newManager = new Manager(response.name,response.id,response.email, response.officeNumber);
        employeeList.push(newManager)
        addEmployer();
    })
};

function addEmployer() {
    return inquirer.prompt([{
        type: 'list',
        message: 'Select whom do you want to add to the team:',
        name: 'selection',
        choices: ['Engineer','Intern', 'My team is all set'],        
    }]).then((response) => {
            if(response.selection === 'Engineer') {
                askForEngineerInfo();
            }
            if(response.selection === 'Intern') {
                askForInternInfo();
            }
            else {
                createHTMLfile();
            }
    
        })
};

function askForEngineerInfo() {
    return inquirer.prompt(questionsEngineer)
    .then((response) => {
        const newEngineer = new Engineer(response.name,response.id,response.email, response.github);
        employeeList.push(newEngineer)
        addEmployer(); 
    })
    
}

function askForInternInfo() {
    return inquirer.prompt(questionsIntern)
    .then((response) => {
        const newIntern = new Intern(response.name,response.id,response.email, response.school);
        employeeList.push(newIntern);
        addEmployer();

    })
    
}

function createHTMLfile() {
    const htmlContent = render(employeeList);
    writeToFile(outputPath,htmlContent);

}

askforManagerInfo();
