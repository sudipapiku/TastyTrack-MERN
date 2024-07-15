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
    <li>Meal planning and tracking</li>
    <li>Payment processing with Razorpay</li>
    <li>Responsive design</li>
</ul>

# Demo
A live demo of the application can be found <a href="#">here</a>

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
                <pre><code>npm start</code></pre>
            </li>
        </ol>

        <h3>Frontend Setup</h3>
        <ol>
            <li>Navigate to the <code>frontend</code> directory:
                <pre><code>cd ../frontend</code></pre>
            </li>
            <li>Install the required dependencies:
                <pre><code>npm install</code></pre>
            </li>
            <li>Create a <code>.env</code> file in the <code>frontend</code> directory and add the following environment variable:
                <pre><code>REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id</code></pre>
            </li>
            <li>Start the frontend development server:
                <pre><code>npm start</code></pre>
            </li>
        </ol>

        <h2 id="usage">Usage</h2>
        <ol>
            <li>Register a new account or log in with an existing account.</li>
            <li>Create and manage your recipes.</li>
            <li>Plan your meals for the week.</li>
            <li>Process payments using Razorpay.</li>
        </ol>

        <h2 id="technologies">Technologies</h2>
        <ul>
            <li><strong>Frontend:</strong> React, Redux, Bootstrap</li>
            <li><strong>Backend:</strong> Node.js, Express.js, MongoDB</li>
            <li><strong>Authentication:</strong> JWT</li>
            <li><strong>Payment Gateway:</strong> Razorpay</li>
        </ul>

        <h2 id="contributing">Contributing</h2>
        <p>We welcome contributions to improve TastyTrack! Please fork the repository and create a pull request with your changes.</p>

        <h3>Steps to Contribute</h3>
        <ol>
            <li>Fork the project.</li>
            <li>Create your feature branch (<code>git checkout -b feature/AmazingFeature</code>).</li>
            <li>Commit your changes (<code>git commit -m 'Add some AmazingFeature'</code>).</li>
            <li>Push to the branch (<code>git push origin feature/AmazingFeature</code>).</li>
            <li>Open a pull request.</li>
        </ol>

        <h2 id="license">License</h2>
        <p>Distributed under the MIT License. See <code>LICENSE</code> for more information.</p>

        <h2 id="contact">Contact</h2>
        <p>Sudip Api Ku - <a href="mailto:sudipapiku@example.com">sudipapiku@example.com</a></p>
        <p>Project Link: <a href="https://github.com/sudipapiku/TastyTrack-MERN">https://github.com/sudipapiku/TastyTrack-MERN</a></p>
    </div>
</body>
</html>
