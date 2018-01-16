// module.exports = {
//     getQuestions: (( req, res, next ) => {
//         const db = req.app.get('db');
      
//         db.find_questions(['JavaScript'])
//           .then(questions => { 
//             console.log(questions)
//             res.status(200).send(questions); 
//           }).catch( err => {
//             console.log(err);
//             res.status(500).send(err);
//           });
//       });