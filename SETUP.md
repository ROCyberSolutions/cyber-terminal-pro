# Setup and Deployment Guide

This document provides a comprehensive guide on how to set up and deploy the project on various platforms, including local development, Heroku, Vercel, Netlify, and Docker.

## Local Development
1. **Clone the Repository**  
   Run the following command to clone the repository:
   ```bash
   git clone https://github.com/ROCyberSolutions/cyber-terminal-pro.git
   cd cyber-terminal-pro
   ```  

2. **Install Dependencies**  
   Make sure you have [Node.js](https://nodejs.org/) installed. Then run:
   ```bash
   npm install
   ```  

3. **Run the Application**  
   Start the development server:
   ```bash
   npm start
   ```  
   Access the application at `http://localhost:3000`.


## Deployment on Heroku
1. **Create a Heroku Application**  
   Use the Heroku CLI to create a new application:
   ```bash
   heroku create your-app-name
   ```  

2. **Set Environment Variables**  
   Set any required environment variables:
   ```bash
   heroku config:set VAR_NAME=value
   ```  

3. **Deploy to Heroku**  
   Push your code to Heroku:
   ```bash
   git push heroku main
   ```

4. **Open the Application**  
   After deployment, you can open your application in the browser:
   ```bash
   heroku open
   ```


## Deployment on Vercel
1. **Install Vercel CLI**  
   If you don't have Vercel CLI installed, you can install it using npm:
   ```bash
   npm install -g vercel
   ```  

2. **Deploy the Application**  
   Run the following command in your project directory:
   ```bash
   vercel
   ```  

3. **Follow the Prompts**  
   Complete the deployment process by following the prompts in your terminal.


## Deployment on Netlify
1. **Create a New Site**  
   Go to [Netlify](https://www.netlify.com/) and log in to your account. Create a new site by linking your GitHub repository.

2. **Configure Build Settings**  
   Set the build command to:
   ```bash
   npm run build
   ```  
   And the publish directory to:
   ```bash
   build
   ```

3. **Deploy the Site**  
   Click on the deploy button and wait for your site to be live.


## Docker Deployment
1. **Create a Dockerfile**  
   Ensure you have a `Dockerfile` in your project root with the following content:
   ```dockerfile
   FROM node:14
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 3000
   CMD [ "npm", "start" ]
   ```  

2. **Build Docker Image**  
   Run the following command in your project directory to build the image:
   ```bash
   docker build -t your-image-name .
   ```  

3. **Run the Docker Container**  
   Finally, run the container:
   ```bash
   docker run -p 3000:3000 your-image-name
   ```
   Access the application at `http://localhost:3000`.

---  
This guide should help you set up and deploy the application across multiple platforms efficiently.
