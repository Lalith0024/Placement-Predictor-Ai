const fs = require('fs');

/**
 * Generates synthetic student placement data.
 * Features: CGPA, IQ, Projects, Internship, TechScore, CommScore, Backlogs, Hackathons, Certifications
 * Target: Placed (0 or 1)
 */
function generateData(count = 1500) {
  const data = [];
  for (let i = 0; i < count; i++) {
    const cgpa = (Math.random() * (10 - 5) + 5).toFixed(2);
    const iq = Math.floor(Math.random() * (140 - 80) + 80);
    const projects = Math.floor(Math.random() * 8);
    const internships = Math.floor(Math.random() * 4);
    const techScore = Math.floor(Math.random() * (100 - 40) + 40);
    const commScore = Math.floor(Math.random() * (100 - 40) + 40);
    const backlogs = Math.floor(Math.random() * 5); // 0 to 4
    const hackathons = Math.floor(Math.random() * 6); // 0 to 5
    const certifications = Math.floor(Math.random() * 5); // 0 to 4

    // Advanced heuristic for placement
    let score = 0;
    score += (cgpa - 7.5) * 2.0;
    score += (iq - 100) * 0.05;
    score += projects * 0.5;
    score += internships * 0.8;
    score += (techScore - 60) * 0.05;
    score += (commScore - 60) * 0.03;
    score -= backlogs * 1.5; // Negative impact
    score += hackathons * 0.4;
    score += certifications * 0.3;

    // Sigmoid-like probability mapping
    const probability = 1 / (1 + Math.exp(-score));
    const placed = (Math.random() < probability) ? 1 : 0;

    data.push({
      cgpa: parseFloat(cgpa),
      iq,
      projects,
      internships,
      techScore,
      commScore,
      backlogs,
      hackathons,
      certifications,
      placed
    });
  }

  fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
  console.log(`Successfully generated ${count} records with extended features.`);
}

generateData();
