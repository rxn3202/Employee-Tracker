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
                    'Veiw all employees',
                    'Add a deparment',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Exit',
                ],
            },
        ])
        .then((answers) => {
            switch (answers.action) {
                case 'View all deparments':
                    viewDepartments();
                    break;
                case ''
                case ''
                case ''
                case ''
                case ''
                case ''
                case ''    
            }
        })
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



promptAction();