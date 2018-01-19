UPDATE test_personal_project
SET category = $2
WHERE id = $1
RETURNING *;

-- SELECT * FROM test_personal_project;