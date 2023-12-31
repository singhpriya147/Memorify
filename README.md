# Memorify

Memorify is a social media web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The platform aims to connect users, facilitate social interactions, and enable seamless sharing of content. Leveraging the power of modern web technologies, the project provides a user-friendly and engaging experience for its members.

**LIVE LINK :** https://memorify.onrender.com
## Features
- **User Authentication and Authorization**
Memorify allows users to sign up, log in,log out and manage their profiles securely. User data is stored in MongoDB, and password encryption ensures data privacy.
- **Post Creation and Interaction:**
Users can create, edit, and delete posts. They can also like, comment, and share posts from other users, fostering meaningful interactions within the community.
- **Dynamic Posts Feed**
The Memorify offers users a dynamic feed that aggregates and displays posts from all the people they follow. The feed provides a real-time and personalized experience, presenting content in chronological order, ensuring users never miss updates from their connections.
- **Follow and Unfollow Functionality**
Users have the ability to follow and unfollow other users within the platform. By following others, they opt-in to receive updates from those accounts in their news feed, while unfollowing will remove the account's posts from their feed.
- **User Interactions**
 Within the posts feed, users can interact with the posts by liking, commenting. These interactions foster social engagement and enable users to express their thoughts and appreciation for the content they come across.
- **Discover New Connections**
The Memorify also provides a 'Discover' feature that suggests new users to follow . This helps users expand their network and discover new content that aligns with their preferences.
- **Comment Deletion Features**
Users can delete the visibility of their comments on feed posts and also the post owner can delete the comment of other users.The platform ensures user privacy and allows them to manage their preferences for a customized social media experience.
- **Post Management**
The Memorify includes a feature that allows users to manage their own posts effectively. Users can view a list of their posts and have the option to delete or edit them as needed.
- **Password Update**
The Memorify includes a secure password update feature that enables users to change their account passwords. Users can update their password by providing their old password along with the new password they wish to set.
Profile Update - The project includes a comprehensive profile update feature that empowers users to manage and customize their profile information.
Users can update various fields in their profile, such as name, profile picture, location, and other relevant personal information.

## Tech Stack:

The project leverages a modern and efficient tech stack, with Redux Toolkit as the state management solution, ensuring a seamless and robust user experience. The following technologies are employed

  -  **Front-end**:The user interface is built using React.js, a powerful and popular JavaScript library known for its component-based architecture and reusability. Redux Toolkit is employed as the state management library to manage the application's global state effectively.

  -  **Back-end**: The server-side is powered by Node.js and Express.js, handling API requests and business logic. MongoDB serves as the database to store user information, posts, and other relevant data.

  -   **Database**: The project utilizes MongoDB, a NoSQL database, for storing and managing user information, posts, and other relevant data.


  - **Styling**: For styling, the project employs CSS and may utilize UI libraries like Material-UI for a consistent and visually appealing design.

  -  **Security Measures**: The project incorporates security best practices, such as password hashing, data encryption, and implementing proper authentication and authorization mechanisms.
  -  **Deployment and Hosting**: The application is deployed and hosted on a cloud platform render ensuring scalability and reliability.
    
## Usage

When you access the project by following the provided link, you will be directed to the login page of our Memorify web application. Here's a step-by-step guide on how to use the project:

1- **Login or Register :** If you are an existing user, simply enter your registered email and password to log in. For new users, click on the "Register" link to create a new account.

2- **Explore the Feed :** Once logged in, you will be redirected to your personalized feed, which displays posts from users you follow. Engage with posts by liking, commenting.

3- **Post Creation :** Create your own posts by clicking on the "Create Post" button. Add text, images, or videos to share your thoughts and experiences with your followers.

4- **Profile Management :** Click on the 'Update Profile' button located on the left side of your profile section. Here, you can conveniently update your profile information, including your name, profile picture, occupation, and location. Additionally, if you wish to change your password, you can click on the 'Update Password' button, which will prompt you to provide your current password and set a new one securely.

5- **Edit and Delete Posts**: In the "My Posts" section, you can view all the posts you've created. To make changes, click on the "Edit" icon to modify the content or  "Delete" icon to remove a post.

6- **Discover People**: Utilize the suggestion section  to find other users, Discover new connections based on shared interests or mutual friends.

7-**Logout**: When you are done using the application, click on the "Logout" button to securely log out of your account

## Screenshots 
1- **Login Page**

![Screenshot (813)](https://github.com/singhpriya147/Memorify/assets/72970648/a3ce710c-4954-41f2-a10b-e0bdcf9702cc)

2- **Register Page**

![Screenshot (815)](https://github.com/singhpriya147/Memorify/assets/72970648/ed4a0e42-4a64-4b34-8d1f-e05d1018b785)

3- **Dashboard Page**

![Screenshot (816)](https://github.com/singhpriya147/Memorify/assets/72970648/0ce55c3c-e3b3-4322-b5e0-28cdb28674ea)

![Screenshot (818)](https://github.com/singhpriya147/Memorify/assets/72970648/60d0531a-f875-41bb-a5ee-f4ea6f972511)

4- **Comment Modal**

![Screenshot (823)](https://github.com/singhpriya147/Memorify/assets/72970648/385998f2-3e78-459a-91f9-01ee701f9b9d)

 **User can delete their comment**
 
![Screenshot (825)](https://github.com/singhpriya147/Memorify/assets/72970648/361bdc79-4ee8-444f-a064-794f0fd4ad30)

 **Post user can delete any comment on their post**
 
 ![Screenshot (824)](https://github.com/singhpriya147/Memorify/assets/72970648/6a0c0e38-cf65-40b5-ba75-d6f98475536a)
 
5- **user can see there post by clicking on "My post" button in header**

![Screenshot (821)](https://github.com/singhpriya147/Memorify/assets/72970648/c32f4b27-5aaa-42d4-8fa8-fb77f99706e6)

6- **Edit Caption modal**

![Screenshot (822)](https://github.com/singhpriya147/Memorify/assets/72970648/c6a16415-968f-4ae8-9683-b1ba61594f7e)

7-**Update Profile**

![Screenshot (819)](https://github.com/singhpriya147/Memorify/assets/72970648/ba69ff4d-536c-40dc-9911-5f5a051d080d)

8-**Update password**

![Screenshot (820)](https://github.com/singhpriya147/Memorify/assets/72970648/0183a809-08d7-4be5-9b8c-44ee7ad2e7f2)


## Installation

**Step-1 Clone the Repository**

1-Open your terminal/command prompt.
2-Navigate to the directory where you want to store the project.

3-Run the following command to clone the repository:
```bash
git clone https://github.com/singhpriya147/Memorify.git
```
4-Navigate to the project directory:

```bash
cd Memorify
```
**Step-2 Set Up Backend (Node.js and Express)**

1-Navigate to the backend directory:
```bash
cd backend
```
2-Install backend dependencies:
```bash
npm install
```
3-Create a .env file in the backend directory and set up environment variables, such as MongoDB connection URI, JWT secret, etc.

**Step-3 Set Up Frontend**

1-Navigate to the frontend directory:
```bash
cd ../frontend
```
2-Install frontend dependencies:
```bash
npm install
```

## Future Feature 

1- **Forget password** 
Feature will be  designed to help users reset their passwords in case they forget their login credentials. This feature provides a user-friendly way for users to regain access to their accounts.

2- **List of Followers/ Following** 
Users can usually access their list of followers from their profile . There will  be an option to view a list of users who are following them
