SELECT * FROM test_personal_project
FULL OUTER JOIN cards_personal_project on cards_personal_project.test_id = test_personal_project.id
WHERE test_personal_project.category = $1 AND test_personal_project.user_id = $2;