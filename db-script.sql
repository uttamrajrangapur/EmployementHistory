CREATE ROLE employeeapp WITH CREATEDB LOGIN PASSWORD 'employeeapp';
GRANT employeeapp to postgres;
CREATE database employee_database OWNER=employeeapp;
\c employee_database

CREATE TABLE IF NOT EXISTS credentials
 (
   id uuid,
   employee_id uuid,
   hashed_password text,
   created_date timestamp with time zone DEFAULT now(),
   modified_date timestamp with time zone DEFAULT now(),
   CONSTRAINT credentials_pkey PRIMARY KEY (id)
 )
 WITH (
   OIDS=FALSE
 );
 ALTER TABLE credentials
  OWNER TO employeeapp;

CREATE UNIQUE INDEX IF NOT EXISTS credentials_employee_id
  ON credentials
  USING btree
 (employee_id);


CREATE TABLE IF NOT EXISTS employees
 (
   id uuid,
   name text,
   created_date timestamp with time zone DEFAULT now(),
   modified_date timestamp with time zone DEFAULT now(),
   CONSTRAINT employees_pkey PRIMARY KEY (id)
 )
 WITH (
   OIDS=FALSE
 );
 ALTER TABLE employees
  OWNER TO employeeapp;

CREATE UNIQUE INDEX IF NOT EXISTS employees_name
  ON employees
  USING btree
 (name);

CREATE TABLE IF NOT EXISTS employee_history
 (
   id uuid,
   employee_id uuid,
   company_id uuid,
   status text,
   created_date timestamp with time zone DEFAULT now(),
   modified_date timestamp with time zone DEFAULT now(),
   CONSTRAINT employee__history_pkey PRIMARY KEY (id)
 )
 WITH (
   OIDS=FALSE
 );
 ALTER TABLE employee_history
  OWNER TO employeeapp;


CREATE TABLE IF NOT EXISTS company
 (
   id uuid,
   name text,
   current_employees jsonb,
   past_employees jsonb,
   created_date timestamp with time zone DEFAULT now(),
   modified_date timestamp with time zone DEFAULT now(),
   CONSTRAINT company_pkey PRIMARY KEY (id)
 )
 WITH (
   OIDS=FALSE
 );
 ALTER TABLE company
  OWNER TO employeeapp;

CREATE UNIQUE INDEX IF NOT EXISTS company_name
ON company
USING btree
(name);


-- delete from company;
-- delete from credentials;
-- delete from employee_history;
-- delete from employees;
