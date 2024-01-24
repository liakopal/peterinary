# Peterinary

Peterinary is a web application for veterinary clinic management, featuring user and doctor interfaces for managing pet information, scheduling examinations, and facilitating communication.

## Technologies

- Backend: Node.js, Express, MongoDB
- Frontend: React (Create React App), EJS for static pages
- Database: MongoDB

## Setup

### Installation

Clone and set up the project repository:

```bash
git clone https://github.com/liakopal/peterinary.git
cd veterinary
npm install

Environment Configuration

Set up your environment variables in a .env file at the project root:

SESSION_SECRET=<your_session_secret>
MONGO_URI=mongodb://localhost:27017/peterinary
NEWS_API_KEY=<your_news_api_key>
JWT_SECRET=<your_jwt_secret>

Running the Project

Ensure MongoDB is active, then start the backend server:

# Start the backend server (make sure MongoDB service is running)
npm run start

# In a new terminal, start the React development server
cd react-dashboard
npm start

Note: The .env in the React app disables browser auto-launch. Manually navigate to http://localhost:3010 to access the EJS pages. For dynamic React features, access http://localhost:3000 after starting the React server.

Features
Static Pages: View content-rich EJS pages like Home and About.
Dynamic Interactions: Register, log in, and manage pet details in the React app.
Communication: Users and doctors can exchange messages within the platform.

Development Notes

When you run nodemon ./index.js in the peterinary directory, it opens the EJS static pages at http://localhost:3010/home.
To interact with dynamic features, ensure npm start is executed in peterinary/react-dashboard, which sets up the React app.
The proxy setup in the React app allows API interactions with the backend without CORS issues.

Database Collections

examinations: Tracks pet health examinations.
messages: Facilitates communication between users and veterinarians.
pets: Holds information about registered pets.
users: Manages user profiles and authentication data.

Additional Reminders/Information

Ensure MongoDB is installed and running before starting the project.
Replace `<your_session_secret>`, `<your_news_api_key>`, and `<your_jwt_secret>` with the actual values that will be used for the application.

For inquiries or support, please contact liakopoulosalex@gmail.com.