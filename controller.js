module.exports = {

    getOneCategory: ( req, res, next ) => {
        const db = req.app.get('db');
      
        db.find_questions(req.params.category)
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
      
        db.find_categories([])
          .then(questions => { 
            // console.log(questions)
            res.status(200).send(questions); 
          }).catch( err => {
            console.log(err);
            res.status(500).send(err);
          });
      }
    }