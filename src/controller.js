module.exports = {

    getOneCategory: ( req, res, next ) => {
        const db = req.app.get('db');
      
        db.find_questions(req.params.category, req.session.user[0].id)
          .then(questions => { 
            console.log(questions)
            res.status(200).send(questions); 
          }).catch( err => {
            console.log(err);
            res.status(500).send(err);
          });
      },

      getAllCategories: ( req, res, next ) => {
        const db = req.app.get('db');
      
        db.find_categories(req.session.user[0].id)
          .then(questions => { 
            res.status(200).send(questions); 
          }).catch( err => {
            console.log(err);
            res.status(500).send(err);
          });
      },

      newTest: ( req, res, next ) => {
          const db = req.app.get('db');
          const { category } = req.body;

          db.new_test(category, req.session.user[0].id)
              .then( (response) => res.status(200).send(response) )
              .catch( () => res.status(500).send() );
          },

      create: ( req, res, next ) => {
        const db = req.app.get('db');
        const { question, answer, test_id } = req.body;
    
        db.create_card([ question, answer, test_id ])
          .then( () => res.status(200).send() )
          .catch( () => res.status(500).send() );
      },
    }