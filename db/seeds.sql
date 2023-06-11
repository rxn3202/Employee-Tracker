USE employee_db;

-- Insert sample departments
INSERT INTO department (name) VALUES
  ('Sales'),
  ('Marketing'),
  ('Finance'),
  ('Engineering'),
  ('Human Resources');

-- Insert sample roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Manager', 70000, 1),
  ('Sales Representative', 50000, 1),
  ('Marketing Manager', 60000, 2),
  ('Marketing Coordinator', 40000, 2),
  ('Finance Manager', 80000, 3),
  ('Finance Analyst', 55000, 3),
  ('Software Engineer', 80000, 4),
  ('UI/UX Designer', 60000, 4),
  ('HR Manager', 70000, 5),
  ('HR Specialist', 50000, 5);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('David', 'Johnson', 3, 1),
  ('Emily', 'Williams', 4, 2),
  ('Michael', 'Brown', 5, 3),
  ('Olivia', 'Davis', 6, 3),
  ('Robert', 'Wilson', 7, 4),
  ('Sarah', 'Taylor', 8, 4),
  ('Thomas', 'Clark', 9, 5),
  ('Jessica', 'Anderson', 10, 5);
