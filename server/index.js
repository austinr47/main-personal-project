const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const axios = require('axios');
// const controller = require('../controller');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
}));

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
}).catch(error => {
    console.log('error', error);
});

app.post('/login', (req, res) => {
    const { userId } = req.body;
    const auth0Url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}`;
    axios.get(auth0Url, {
      headers: {
        Authorization: 'Bearer ' + process.env.AUTH0_MANAGEMENT_ACCESS_TOKEN
      }
    }).then ( response => {
        const userData = response.data;
        // console.log(response)
        const userForDatabase = {
            name: userData.name,
            email: userData.email,
            auth0_id: userData.user_id, 
        };
        app.get('db').find_user(userData.user_id).then(users => {
            if (users.length) {
              req.session.user = userForDatabase;
              res.json({ user: req.session.user });
            } else {
              app.get('db').create_user([userData.user_id, userData.email, userData.name]).then(() => {
                req.session.user = userForDatabase;
                res.json({ user: req.session.user });
              }).catch(error => {
                console.log('error1');
                res.status(500).json({ message: 'AAAHHHH! 1' });
              });
            }
          })
        }).catch(error => {
          console.log('error2');
          res.status(500).json({ message: 'AAAHHHH! 2' });
        });
      });

app.get('/questions', ( req, res, next ) => {
  const db = req.app.get('db');

  db.find_questions(['Math'])
    .then(questions => { 
      console.log(questions)
      res.status(200).send(questions); 
    }).catch( err => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.get('/categories', ( req, res, next ) => {
  const db = req.app.get('db');

  db.find_categories()
    .then(questions => { 
      // console.log(questions)
      res.status(200).send(questions); 
    }).catch( err => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.get('/user-data', (req, res) => {
    res.json({ user: req.session.user })
    console.log('its running!1')
});

const PORT = process.env.SERVER_PORT || 3035;
app.listen(PORT, () => {
    console.log(`Am I on?? Yup, on ${PORT}. `); 
} );