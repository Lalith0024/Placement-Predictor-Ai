import React, { useState } from 'react';
import './App.css';

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
    setResult(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const response = await fetch('http://localhost:5001/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const resultData = await response.json();
      setResult(resultData);
    } catch (error) {
      console.error('Error:', error);
      alert('AI Server not detected.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="glass-card">
        <div className="header-section">
          <h1>Student Analytics AI</h1>
          <p className="subtitle">High-precision predictive modeling for career success.</p>
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
          <div className={`result show`}>
            <div className={`status-badge ${result.placed ? 'status-placed' : 'status-not-placed'}`}>
              {result.placed ? 'Placement Likely' : 'Requires Focus'}
            </div>
            <div className="prediction-text">
              Predictive Correlation: {result.probability}%
            </div>
            <div className="probability-bar">
              <div
                className="probability-fill"
                style={{ width: `${result.probability}%` }}
              ></div>
            </div>
            <p className="message-text">Analysis: {result.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
