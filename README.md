# TastyTrack
Welcome to TastyTrack, a MERN stack application designed to help users track their favorite recipes and manage their meal plans efficiently. This project integrates Razorpay for seamless payment processing.

**Table of Contents**
<ul>
    <li><a href="#features">Features</a></li>
    <li><a href="#demo">Demo</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#technologies">Technologies</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
</ul>

# Features
<ul>
    <li>User Authentication with JWT</li>
    <li>Create, Read, Update, and Delete (CRUD) operations for recipes</li>
    <li>Payment processing with Razorpay</li>
    <li>Responsive design</li>
</ul>

# Demo
A live demo of the application can be found <a href="https://tastytrack-frontend.onrender.com" target="_blank">here</a>. <br>
Admin dashboard can be accessed <a href="https://tastytrack-admin.onrender.com" target="_blank">here</a>.

# Installation

To run this project locally, follow these steps

**Prerequisites**
<ul>
    <li>Node.js</li>
    <li>MongoDB</li>
    <li>Razorpay account</li>
</ul>

# Clone the Repository
<pre><code>git clone https://github.com/sudipapiku/TastyTrack-MERN.git
cd TastyTrack-MERN</code></pre>

# Backend Setup
<ul>
<li>Navigate to the <code>backend</code> directory:
<pre><code>cd backend</code></pre></li>
<li>Install the required dependencies:
    <pre><code>npm install</code></pre>
</li>
<li>Create a <code>.env</code> file in the <code>backend</code> directory and add the following environment variables:
                <pre><code>MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret</code></pre>
            </li>
            <li>Start the backend server:
                <pre><code>npm run server</code></pre>
            </li>
</ul>

# Frontend Setup
<ul>
    <li>Navigate to the <code>frontend</code> directory:
    <pre><code>cd ../frontend</code></pre> </li>
    <li>Install the required dependencies:
        <pre><code>npm install</code></pre></li>
<li>Create a <code>.env</code> file in the <code>frontend</code> directory and add the following environment variable:
                <pre><code>REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id</code></pre>
            </li>
            <li>Start the frontend development server:
                <pre><code>npm run dev</code></pre>
            </li>
        </ul>

# Usage
<ul>
    <li>Register a new account or log in with an existing account.</li>
    <li>Create and manage your recipes.</li>
    <li>Plan your meals for the week.</li>
    <li>Process payments using Razorpay.</li>
</ul>

# Technologies
<ul>
    <li> Frontend: React, CSS</li>
    <li>Backend: Node.js, Express.js, MongoDB</li>
    <li>Authentication: JWT</li>
    <li>Payment Gateway: Razorpay</li>
</ul>

# Contributing
We welcome contributions to improve TastyTrack! Please fork the repository and create a pull request with your changes.

**Steps to Contribute** 
<ul>
    <li>Fork the project.</li>
    <li>Create your feature branch (<code>git checkout -b feature/AmazingFeature</code>).</li>
    <li>Commit your changes (<code>git commit -m 'Add some AmazingFeature'</code>).</li>
    <li>Push to the branch (<code>git push origin feature/AmazingFeature</code>).</li>
    <li>Open a pull request.</li>
</ul>

# License
Distributed under the MIT License. See <code>LICENSE</code> for more information.

# Contact
**Email:** <a href="mailto:sudipapiku@gmail.com">sudipapiku@gmail.com</a> <br>
**Project Link:** <a href="https://github.com/sudipapiku/TastyTrack-MERN">https://github.com/sudipapiku/TastyTrack-MERN</a>
   
