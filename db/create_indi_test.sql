INSERT INTO indi_test_results_personal_project
(category, user_id)
VALUES
( $1, $2 )
RETURNING *;