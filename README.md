# Flash-Study:

Flash-study is a mobile friendly study aid web application. A user can create flashcards for different subjects, study the flashcards, then test on those subjects.

## For the live version, click [here](myflash-study.com/#/).

## Technologies:

* React
* Redux
* JavaScript(ES6)
* NodeJS
* ExpressJS
* Massive
* PostgreSQL
* Axios
* Chart.js
* Auth0

## Setup:

* `Fork` and `clone` this repository.
* `cd` into the project directory.
* Run `npm install`.
* Create a Postgres database. Use this project's `db/init.sql` file to create the schema.
* Copy the `env.example` file to a new file called `.env` and fill in the environmental variables.
* Start the server with `nodemon`.
* Start the web dev server with `npm start`. In your browser, open `http://localhost:3000`.


### Overview of site features:

<strong>Account Page:</strong>

The account page will show all tests that have been taken by that user. It will also average out the percent score of all tests for individual subjects and iupdate the grapg with that information.

![Image of Home Page](https://github.com/austinr47/main-personal-project/blob/master/src/assets/account.png)

<strong>Subjects Page:</strong>

The subjects page shows all subjects create by the user. A new subject can be create or existing subjects can be edited or deleted.

![Image of Mentor Page](https://github.com/austinr47/main-personal-project/blob/master/src/assets/subjects.png)

<strong>Create Subjects Page:</strong>

THis page is used to create new flashcards and subjects.

![Image of Mentor Page](https://github.com/austinr47/main-personal-project/blob/master/src/assets/create-subject.png)

<strong>Edit Subjects Page:</strong>

This page is used to edit the flashcards in existing subjects or to delete the entire subjects and all of its flashcards.

![Image of Mentor Page](https://github.com/austinr47/main-personal-project/blob/master/src/assets/edit-subjects.png)

<strong>Flashcard Page:</strong>

This page is where the user can study the flashcards made. It will display the flashcards in random order and will continue to cycle through them. 

![Image of Mentor Page](https://github.com/austinr47/main-personal-project/blob/master/src/assets/flashcards.png)

<strong>Testing Page:</strong>

The user will type in the answer to the questions one at a time.

![Image of Mentor Page](https://github.com/austinr47/main-personal-project/blob/master/src/assets/test.png)

<strong>Results Page:</strong>

At the end of the tests, the user will be directed to a results page. This page will display all question, correct answers, users answers, and the percent correct. The user then can retake the test or go back to the account page where the new test has been added and the chart been updated.

![Image of Mentor Page](https://github.com/austinr47/main-personal-project/blob/master/src/assets/results.png)