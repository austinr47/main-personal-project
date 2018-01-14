INSERT INTO users_personal_project (auth0_id, email, name) VALUES ($1, $2, $3)
RETURNING *;