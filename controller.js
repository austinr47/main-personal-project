module.exports = {
    getQuestions: ( req, res, next ) => {
      const dbInstance = req.app.get('db');
  
      dbInstance.find_questions(['JavaScript'])
        .then(quesitons => { res.status(200).send(questions); })
        .catch( err => {
          console.log(err);
          res.status(500).send(err);
        });
    }
  };