INSERT INTO cards_personal_project
( question, answer, test_id ) 
VALUES 
( $1, $2, $3 )
RETURNING *;