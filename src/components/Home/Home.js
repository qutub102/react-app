import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div class="container">
        <h1>Welcome to Our Website</h1>
        <p>This is a simple homepage with a background image and some basic styling.</p>
        <Link to="/form" className="btn">Learn More</Link>
    </div>
  )
}

export default Home