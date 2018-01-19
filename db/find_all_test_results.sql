SELECT * FROM indi_test_results_personal_project
FULL OUTER JOIN general_indi_test_result on general_indi_test_result.indi_test = indi_test_results_personal_project.indi_test
WHERE general_indi_test_result.user_id = $1
ORDER BY timestamp DESC;;