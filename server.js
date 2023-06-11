const { default: inquirer } = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to execute SQL queries
function executeQuery(sql, params) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Prompt for the initial action
function promptAction() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
          ],
        },
      ])
      .then((answers) => {
        switch (answers.action) {
          case 'View all departments':
            viewDepartments();
            break;
          case 'View all roles':
            viewRoles();
            break;
          case 'View all employees':
            viewEmployees();
            break;
          case 'Add a department':
            addDepartment();
            break;
          case 'Add a role':
            addRole();
            break;
          case 'Add an employee':
            addEmployee();
            break;
          case 'Update an employee role':
            updateEmployeeRole();
            break;
          case 'Exit':
            console.log('Goodbye!');
            process.exit();
        }
      });
  }

// View all departments
function viewDepartments() {
    const sql = 'SELECT * FROM department';
    executeQuery(sql)
      .then((results) => {
        console.table(results);
        promptAction();
      })
      .catch((error) => {
        console.log('An error occurred while retrieving departments:', error);
        promptAction();
      });
  }
  
  // View all roles
  function viewRoles() {
    const sql = 'SELECT role.*, department.name AS department_name FROM role JOIN department ON role.department_id = department.id';
    executeQuery(sql)
      .then((results) => {
        console.table(results);
        promptAction();
      })
      .catch((error) => {
        console.log('An error occurred while retrieving roles:', error);
        promptAction();
      });
  }

  // View all employees
function viewEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, 
      role.title, department.name AS department, role.salary,
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      JOIN role ON employee.role_id = role.id
      JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    executeQuery(sql)
      .then((results) => {
        console.table(results);
        promptAction();
      })
      .catch((error) => {
        console.log('An error occurred while retrieving employees:', error);
        promptAction();
      });
  }

//Add a department
function addDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter the name of the department:',
        },
      ])
      .then((answers) => {
        const sql = 'INSERT INTO department (name) VALUES (?)';
        const params = [answers.name];
        executeQuery(sql, params)
          .then(() => {
            console.log('Department added successfully!');
            promptAction();
          })
          .catch((error) => {
            console.log('An error occurred while adding the department:', error);
            promptAction();
          });
      });
  }

//Add a role
function addRole() {
  const sql = 'SELECT * FROM department';
  executeQuery(sql)
    .then((departments) => {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role:',
          },
          {
            type: 'number',
            name: 'salary',
            message: 'Enter the salary for the role:',
          },
          {
            type: 'list',
            name: 'department_id',
            message: 'Select the department for the role:',
            choices: departments.map((department) => ({
              name: department.name,
              value: department.id,
            })),
          },
        ])
        .then((answers) => {
            
        })
}
//Add an employee
function addEmployee() {
    const sql = 'SELECT * FROM ';
    executeQuery(sql)
      .then((departments) => {
        inquirer
          .prompt([
            {
                
            }
          ])
}
//Update an employee role
function updateEmployeeRole() {
    const sql = 'SELECT * FROM ';
    executeQuery(sql)
      .then((departments) => {
        inquirer
          .prompt([
            {
                
            }
          ])
}


promptAction();