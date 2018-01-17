INSERT INTO test_personal_project
( user_id, category ) 
VALUES 
( $2, $1 )
RETURNING *;