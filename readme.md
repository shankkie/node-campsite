#refactor mongoose code

* create a models directory
* use module.exports
* require everything correctly

#Add seed file
* add a seed js file
* run the seed js file everytime the server starts

#Add User models

* Install all packages needed for Auth
* Define User Model

# Register
* Configure passport
* Add register routes
* Add register template


# login
* Add login routes
* Add login template


# logout/Navbar
* Add logout routes
* prevent user from adding comment if not signed in
* Add links to navbar
* show/hide auth link correctly

# Show/Hide Links
* show hide auth link correctly

# Refactoring all routes
* use express router to reorganise all routes

# Users+ comments
* Assosiate users and comments
* Save authors name to a comment automatically

# Users+ camgrounds
* prevent unauthenticated user from creating a campground
* Save username+id  to a newly created campground

# Editing Campgrounds
* Adding method override
* Add edit route for campgrounds
* Add link to edit page
* Add update route
* Fix $set problem

# Deleting Campgrounds
* Adding deleting route
* Add delete Button

# Authorisation Campgrounds
* User can edit only his campgrounds
* User can delete only his campgrounds
* Hide/Show Edit/Delete Button

# Editing Comments
* Add Edit route for comments
* Add Edit Btn
* Add Update route

# Delete Comments
* Add Destroy route
* Add Delete Btn

#heroku 
heroku config:set DATABASEURL= <url>
