// src/pages/Home.js
import React, { useState } from 'react';
import styles from './Home.module.css'; // Import CSS Module
import PDFUpload from '../components/PDFUpload';


const Home = () => {
  const [showUpload, setShowUpload] = useState(false);

  const handleUploadClick = () => {
    setShowUpload(!showUpload);
  };

  return (
    <>
      <div className={styles.home}>
        
        {/* HEADER / HERO SECTION */}
        <div className={styles.header}>
          <h1>Welcome to SmartDocs</h1>

          {/* Subtitle + Image */}
          <p className={styles.subtitle}>
            A smarter way to handle contracts.
            <img
              src="https://th.bing.com/th/id/OIP.l6inwFMHlJA6VExriSe0jwHaJ9?rs=1&pid=ImgDetMain"
              alt="Stack of Documents Icon"
              className={styles.docsIcon}
            />
          </p>
        </div>

        {/* WHY CHOOSE US SECTION */}
        <section className={styles.features}>
          <h2 className={styles.titleFeatures}>Why Choose Us?</h2>
          <div className={styles.featureCards}>
            <div className={styles.featureCard}>
              <h3>Automated Contract Analysis</h3>
              <p>
                Parse and analyze financial contracts to highlight risky clauses,
                penalties, and key points.
              </p>
            </div>

            <div className={styles.featureCard}>
              <h3>Plain English Summaries</h3>
              <p>
                Simplify complex legal terms and conditions with easy-to-read
                summaries.
              </p>
            </div>

            <div className={styles.featureCard}>
              <h3>For Small Businesses</h3>
              <p>
                Affordable tools designed to empower small businesses with
                insights previously accessible only to large firms.
              </p>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <div className={styles.ctaSection}>
          <h2>Ready to Simplify Your Contracts?</h2>
          <p>
            Upload your contract and let our AI-powered tool do the heavy lifting
            for you.
          </p>
          <button className={styles.ctaButton} onClick={handleUploadClick}>
            {showUpload ? 'Close Upload Section' : 'Upload Contract'}
          </button>
        </div>

        {/* CONDITIONAL PDF UPLOAD SECTION */}
        {showUpload && (
          <div className={styles.uploadSection}>
            <PDFUpload />
          </div>
        )}
      </div>

      
    </>
  );
};

export default Home;
