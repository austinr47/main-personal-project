SELECT * FROM results_personal_project
FULL OUTER JOIN indi_test_results_personal_project on indi_test_results_personal_project.indi_test = results_personal_project.result_table_id
WHERE indi_test_results_personal_project.indi_test = $1 AND indi_test_results_personal_project.user_id = $2;
