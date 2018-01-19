CREATE TABLE users_personal_project (
  id SERIAL PRIMARY KEY,
  auth0_id VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  name TEXT
);

CREATE TABLE test_personal_project (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  category VARCHAR
);

CREATE TABLE cards_personal_project (
  id SERIAL PRIMARY KEY,
  question VARCHAR NOT NULL,
  answer VARCHAR NOT NULL,
  test_id INTEGER references test_personal_project(id)
);

CREATE TABLE results_personal_project(
  result_id SERIAL PRIMARY KEY,
  my_answer VARCHAR,
  correct_answer VARCHAR,
  question VARCHAR,
  test_id INTEGER,
  category VARCHAR,
  result_table_id INTEGER,
  user_id INTEGER
);

CREATE TABLE indi_test_results_personal_project(
  indi_test SERIAL PRIMARY KEY,
  category VARCHAR,
  user_id INTEGER,
  date TEXT default current_date,
  timestamp TEXT default CURRENT_TIMESTAMP
);

CREATE TABLE indi_test_results_personal_project(
  indi_test SERIAL PRIMARY KEY,
  category VARCHAR,
  user_id INTEGER,
  date TEXT default current_date,
  timestamp TEXT default CURRENT_TIMESTAMP
);

CREATE TABLE general_indi_test_result(
    gen_indi_test_id SERIAL PRIMARY KEY,
    indi_test INTEGER,
    category VARCHAR,
    percent INTEGER,
    user_id INTEGER
);