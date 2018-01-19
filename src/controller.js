module.exports = {

    getOneCategory: ( req, res, next ) => {
        const db = req.app.get('db');
      
        db.find_questions(req.params.category, req.session.user[0].id)
          .then(questions => res.status(200).send(questions) )
          .catch( err => res.status(500).send(err) );
      },

      getAllCategories: ( req, res, next ) => {
        const db = req.app.get('db');
      
        db.find_categories(req.session.user[0].id)
          .then(questions => res.status(200).send(questions) )
            .catch( err => res.status(500).send(err) );
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

      createGeneralResults: ( req, res, next ) => {
        const db = req.app.get('db');
        const { category, percent } = req.body;
    
        db.create_general_results(req.params.id, category, percent, req.session.user[0].id)
          .then( (response) => res.status(200).send(response) )
            .catch( (err) => res.status(500).send(err) );
      },

      updateTestName: ( req, res, next ) => {
        const db = req.app.get('db');
        const { test_id, category } = req.body;
        console.log(test_id, category)
        db.update_test_name( [ test_id, category ] )
        .then( (response) => res.status(200).send(response) )
          .catch( () => res.status(500).send() );
      },

      deleteTestCard: ( req, res, next ) => {
        const db = req.app.get('db');
    
        db.delete_card(req.params.id)
          .then( (response) => res.status(200).send(response) )
            .catch( () => res.status(500).send() );
      },

      createIndiTest: ( req, res, next ) => {
        const db = req.app.get('db');
    
        db.create_indi_test(req.params.category, req.session.user[0].id)
          .then( (response) => res.status(200).send(response) )
            .catch( () => res.status(500).send() );
      },

      createIndiResults: ( req, res, next ) => {
        const db = req.app.get('db');
        const { my_answer, correct_answer, question, test_id, category, result_table_id } = req.body;
    
        db.create_result([my_answer, correct_answer, question, test_id, category, result_table_id, req.session.user[0].id])
          .then( (response) => res.status(200).send(response) )
            .catch( () => res.status(500).send() );
      },

      indiTestResults: ( req, res, next ) => {
        const db = req.app.get('db');
      
        db.get_indi_results(req.params.id, req.session.user[0].id)
          .then((response) => res.status(200).send(response) )
            .catch( err => res.status(500).send(err) );
        },

      getUserTestResults: ( req, res, next ) => {
        const db = req.app.get('db');
      
        db.find_all_test_results(req.session.user[0].id)
          .then((response) => res.status(200).send(response) )
            .catch( err => res.status(500).send(err) );
        },
    }

    // create_card
    // create_indi_test
    // create_result
    // create_user
    // delete_card
    // find_all_test_results
    // find_categories
    // find_questions
    // get_indi_results
    // find_user
    // new_test
    // update_test_name