# ThePipe

ThePipe is a clone of YouTube. Users can go to the website and watch videos submitted by other users. Users can like and comment on videos as well as subscribe to other Tubers to keep notified of any new videos they post. If a user wants to make an account, this gives them the option to become a content creator and post their own videos, as well as comment on videos.

## Features

- Create an account, login with a created account, or login as a demo user.
- Create, view, edit, delete
   - Videos
   - Comments

## Technologies Used
- Flask SQLAlchemy
- PostgresSQL
- Python
- Javascript
- React
- Redux
- CSS

## Installation
 1. Clone ThePipe from https://github.com/Josso7/the-pipe.git

## Backend
 1. From root directory install backend dependencies 
   `pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt`
 2. Create a psql user with a PASSWORD and CREATEDB priviledges
 3. Create a psql database with the created user as OWNER
 4. Create a .env file using .env.example as a template
 5. Migrate and seed your database from within Python's virtual environment
   `pipenv shell`
   `pipenv shell`
   `flask db upgrade`
   `flask seed all`
 6. Start the backend server from within Python's virtual environment
   `flask run`

## Frontend
 1. From react-app directory install frontend dependencies
   `npm install`
 2. Start the front end server from react-app directory
   `npm start`
 ThePipe should automatically open in a new tab using your default browser. If not, navigate to localhost:3000 

# Home Page 
![DB Schema](https://github.com/Josso7/the-pipe/blob/main/wiki-images/the-pipe-home-page.png)
# Video Page 
![DB Schema](https://github.com/Josso7/the-pipe/blob/main/wiki-images/the-pipe-video-page.png)
# Video Comments 
![DB Schema](https://github.com/Josso7/the-pipe/blob/main/wiki-images/the-pipe-video-comments.png)
# User Channel 
![DB Schema](https://github.com/Josso7/the-pipe/blob/main/wiki-images/the-pipe-user-channel-page.png)
# Manage Videos 
![DB Schema](https://github.com/Josso7/the-pipe/blob/main/wiki-images/the-pipe-manage-videos-page.png)

# Personal Challenges

## Learning
This project I had a goal to use Cloudinary as my upload storage. I also had a goal of using modals. I learned so many things that I had not come across before such as interacting with 3rd party API's and creating my first "real world" connection from request to response to a live company. I use Cloudinary to host videos that users upload. The video url's are saved to the database where I can simply put them as the "src" to a video player element.
## Styling
I spent a lot of time on styling elements. I choose to mostly use react hooks as well as some tricky class adding and removing to create a smooth error validation process. The comment buttons have edit buttons that turn into a save button if the user clicks edit, and the save button becomes greyed out, preventing the user from updating a comment if the comment has no text.
