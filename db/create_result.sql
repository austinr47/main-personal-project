INSERT INTO results_personal_project
( my_answer, correct_answer, question, test_id, category, result_table_id, user_id ) 
VALUES 
( $1, $2, $3, $4, $5, $6, $7 );

-- CREATE TABLE results_personal_project(
-- result_id SERIAL PRIMARY KEY,
-- my_answer VARCHAR,
-- correct_answer VARCHAR,
-- question VARCHAR,
-- test_id INTEGER,
-- category VARCHAR,
-- result_table_id INTEGER,
-- user_id INTEGER
-- );