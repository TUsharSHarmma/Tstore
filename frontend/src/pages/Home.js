import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = false; 

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/app");
    } else {
      navigate("/login");
    }
  };
  
  return(
  <div className="home-container">

     <main>
     
        <div className="part">
                <h2>Super Fast and Safe DownloadinG via T-STORE App</h2>
                <h6>One-click to install XAPK/APK files on Android!</h6>
                <button onClick={handleGetStarted}>GET STARTED</button>
        </div>
        <div className="partt">

                <div className="homlog">
                <img src="/homlog.png" alt="Logo" />
      
                </div>
        </div>
     
        <div class="custom-shape-divider-bottom-1696038172">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      
    </main>
    <section className="features">
      <div className="feature-card">
        <h2>Google Play Protect</h2>
        <p>App are protect from all harmfull Virus.</p>
      </div>
      <div className="feature-card">
        <h2>Safe and Fast Downloading</h2>
        <p>Seamlessly Fast Downloading and share progress.</p>
      </div>
      <div className="feature-card">
        <h2>User-Friendly Interface</h2>
        <p>Simple and clean UI for a great experience.</p>
      </div>
    </section>

      <section className="app-collection-preview">
      <h2>Explore Our App Collection</h2>
      <div className="app-card-container">

      <div className="app-card">
      <img src="/appone.png" alt="App Banner" />
      <h3> Squid Game</h3>
      <p>Survival competition where players compete in twisted versions of childhood games.</p>
      <button onClick={handleGetStarted}>GET STARTED</button>
      </div>

      <div className="app-card">
      <img src="/apptwo.png" alt="App Banner" />
      <h3>Rocket Raccoon</h3>
      <p> Marvel's most memorable and emotionally layered characters in the MCU.</p>
      <button onClick={handleGetStarted}>GET STARTED</button>
      </div>

      <div className="app-card">
      <img src="/appthree.png" alt="App Banner" />
      <h3>PokerMan</h3>
      <p> Armed with razor-sharp cards, unmatched bluffing skills, and a gambler’s instinct.</p>
      <button onClick={handleGetStarted}>GET STARTED</button>
      </div>

    
      </div>
      </section>


      <section className="app-collection-preview">
      <h2>Top Download App</h2>
      <div className="app-card-container">

      <div className="app-card">
      <img src="/appfour.png" alt="App Banner" />
      <h3>DesiFood</h3>
      <p>A traditional South Asian cuisine, rich in flavor, spices, and cultural heritage.</p>
      <button onClick={handleGetStarted}>GET STARTED</button>
      </div>

      <div className="app-card">
      <img src="/appfive.png" alt="App Banner" />
      <h3>Tic Tac Toe</h3>
      <p>Two-player strategy game where players take turns marking X or O in a 3×3 grid.</p>
      <button onClick={handleGetStarted}>GET STARTED</button>
      </div>

      <div className="app-card">
      <img src="/asp.png" alt="App Banner" />
      <h3>Location-Tracking</h3>
      <p>Ultra real time location tracking app by sending them request to friend.</p>
      <button onClick={handleGetStarted}>GET STARTED</button>
      </div>

      </div>
      </section>

      <section className="gradient-box">
      <h2>Why Choose T-STORE?</h2>
      <p>
        Experience blazing fast downloads, secure APKs, and a vibrant collection of apps 
        handpicked for performance and trust. Your all-in-one Android app hub!
      </p>
      </section>

      <footer className="site-footer">
      <div className="footer-container">

      <div className="footer-about">
      <h3>T-STORE</h3>
      <p>Your trusted source for fast, safe, and verified Android apps.</p>
      </div>

      <div className="footer-contact">
      <h4>Contact</h4>
      <p>Email: <a href="mailto:contact@tstore.com">tusharsharmaprayagraj@gmail.com</a></p>
      <p>Phone: +91 9026333543</p>
      </div>

      <div className="footer-social">
      <h4>Follow Us</h4>
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
      </div>
    </div>

    <div className="footer-links">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="/about">About Us</a></li>
        <li><a href="/terms">Terms & Conditions</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/faq">FAQ</a></li>
      </ul>
    </div>

  </div>

  <div className="footer-bottom">
    <p>&copy; {new Date().getFullYear()} T-STORE. All rights reserved.</p>
  </div>
      </footer>


</div>
);
};

export default Home;
