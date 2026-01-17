import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const LOADING_STEPS = [
  { label: 'Initializing Neural Engine', subtext: 'Connecting to inference server...' },
  { label: 'Ingesting Student Profile', subtext: 'Normalizing input vectors...' },
  { label: 'Cross-referencing Industry Benchmarks', subtext: 'Scanning historical placement trends...' },
  { label: 'Running ML Predictive Inference', subtext: 'Weighted analysis of academic & technical metrics...' },
  { label: 'Compiling Professional Report', subtext: 'Finalizing career success probability...' }
];

function App() {
  const [formData, setFormData] = useState({
    cgpa: '',
    iq: '',
    projects: '',
    internships: '',
    techScore: '',
    commScore: '',
    backlogs: '',
    hackathons: '',
    certifications: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const resultRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation check
    const data = {
      cgpa: Math.min(Math.max(parseFloat(formData.cgpa), 0), 10),
      iq: Math.min(Math.max(parseInt(formData.iq), 50), 200),
      projects: Math.min(Math.max(parseInt(formData.projects), 0), 20),
      internships: Math.min(Math.max(parseInt(formData.internships), 0), 24),
      techScore: Math.min(Math.max(parseInt(formData.techScore), 0), 100),
      commScore: Math.min(Math.max(parseInt(formData.commScore), 0), 100),
      backlogs: Math.min(Math.max(parseInt(formData.backlogs), 0), 10),
      hackathons: Math.min(Math.max(parseInt(formData.hackathons), 0), 20),
      certifications: Math.min(Math.max(parseInt(formData.certifications), 0), 20)
    };

    setLoading(true);
    setLoadingStep(0);
    setResult(null);

    // Simulate stepping through the process for UI experience
    try {
      // Step 1: Initializing
      await new Promise(resolve => setTimeout(resolve, 800));
      setLoadingStep(1);

      // Step 2: Normalization
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoadingStep(2);

      // Step 3: Benchmarking
      await new Promise(resolve => setTimeout(resolve, 1200));
      setLoadingStep(3);

      // Step 4: Actual Inference (Fetch)
      let baseApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/predict';
      if (!baseApiUrl.endsWith('/api/predict')) {
        baseApiUrl = baseApiUrl.endsWith('/')
          ? `${baseApiUrl}api/predict`
          : `${baseApiUrl}/api/predict`;
      }

      const response = await fetch(baseApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const resultData = await response.json();

      // Step 5: Finalizing
      setLoadingStep(4);
      await new Promise(resolve => setTimeout(resolve, 800));

      setResult(resultData);

      // Smooth scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (error) {
      console.error('Inference Error:', error);
      alert(`AI System Reachability Issue: ${error.message}. Please verify backend status.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loader-ring"></div>
            <div className="steps-container">
              {LOADING_STEPS.map((step, index) => (
                <div
                  key={index}
                  className={`step-item ${index === loadingStep ? 'active' : ''} ${index < loadingStep ? 'completed' : ''}`}
                >
                  <div className="step-dot">
                    {index < loadingStep ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (index + 1)}
                  </div>
                  <div className="step-text">
                    <div className="step-label">{step.label}</div>
                    <div className="step-subtext">{step.subtext}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="progress-track">
              <div
                className="progress-bar"
                style={{ width: `${((loadingStep + 1) / LOADING_STEPS.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div className="glass-card">
        <div className="header-section">
          <div className="ai-badge">Advanced Neural Model v2.4</div>
          <h1>Placement Predictor AI</h1>
          <p className="subtitle">High-precision predictive modeling for career success. Enter your academic and professional data below.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid">
            <div className="input-group">
              <label>Academic CGPA (0-10)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                name="cgpa"
                placeholder="8.50"
                value={formData.cgpa}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Cognitive IQ (50-200)</label>
              <input
                type="number"
                min="50"
                max="200"
                name="iq"
                placeholder="100"
                value={formData.iq}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Projects (Max 20)</label>
              <input
                type="number"
                min="0"
                max="20"
                name="projects"
                placeholder="3"
                value={formData.projects}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Internship Months</label>
              <input
                type="number"
                min="0"
                max="24"
                name="internships"
                placeholder="6"
                value={formData.internships}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Active Backlogs</label>
              <input
                type="number"
                min="0"
                max="10"
                name="backlogs"
                placeholder="0"
                value={formData.backlogs}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Hackathons Won</label>
              <input
                type="number"
                min="0"
                max="20"
                name="hackathons"
                placeholder="1"
                value={formData.hackathons}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Certifications</label>
              <input
                type="number"
                min="0"
                max="20"
                name="certifications"
                placeholder="2"
                value={formData.certifications}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Technical (0-100)</label>
              <input
                type="number"
                min="0"
                max="100"
                name="techScore"
                placeholder="80"
                value={formData.techScore}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Soft Skills (0-100)</label>
              <input
                type="number"
                min="0"
                max="100"
                name="commScore"
                placeholder="75"
                value={formData.commScore}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="main-btn">
            {loading ? 'Running AI Inference...' : 'Generate Prediction Report'}
          </button>
        </form>

        {result && (
          <div ref={resultRef} className={`result show`}>
            <div className={`status-badge ${result.placed ? 'status-placed' : 'status-not-placed'}`}>
              {result.placed ? 'Placement Likely' : 'Requires Focus'}
            </div>
            <h2>Analysis Summary</h2>
            <div className="prediction-text">
              Predictive Correlation: <span className="highlight">{result.probability}%</span>
            </div>
            <div className="probability-bar-container">
              <div className="probability-bar">
                <div
                  className="probability-fill"
                  style={{ width: `${result.probability}%` }}
                ></div>
              </div>
              <div className="bar-labels">
                <span>0%</span>
                <span>Confidence Lexicon</span>
                <span>100%</span>
              </div>
            </div>
            <div className="message-box">
              <p className="message-text">{result.message}</p>
            </div>

            <div className="result-actions">
              <button onClick={() => setResult(null)} className="secondary-btn">Run New Analysis</button>
            </div>

            <div className="professional-note">
              <strong>Important Disclaimer:</strong> This analysis is generated by an AI predictive model. AI systems can occasionally produce inaccurate results or show statistical bias. This report is intended for informational and strategic guidance only, and should not be considered a final or guaranteed determination of career outcomes.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
