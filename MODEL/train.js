const fs = require('fs');
const StudentPlacementModel = require('./model_engine');

// Load generated data
const rawData = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

// Feature scaling (Normalization)
function normalize(data) {
  // Extended feature list
  const features = [
    'cgpa', 'iq', 'projects', 'internships',
    'techScore', 'commScore', 'backlogs',
    'hackathons', 'certifications'
  ];
  const stats = {};

  features.forEach(f => {
    const values = data.map(d => d[f]);
    stats[f] = {
      min: Math.min(...values),
      max: Math.max(...values)
    };
  });

  const normalizedData = data.map(d => {
    const row = [];
    features.forEach(f => {
      // Min-Max Normalization: (x - min) / (max - min)
      let val = (d[f] - stats[f].min) / (stats[f].max - stats[f].min);
      row.push(val || 0); // Handle division by zero
    });
    return { x: row, y: d.placed };
  });

  return { normalizedData, stats };
}

const { normalizedData, stats } = normalize(rawData);
const X = normalizedData.map(d => d.x);
const y = normalizedData.map(d => d.y);

// Create and train model
const model = new StudentPlacementModel();
// Increase epochs for better convergence with more features
model.epochs = 2000;
model.train(X, y);

// Save everything
const modelData = {
  model: model.toJSON(),
  stats: stats,
  featureOrder: [
    'cgpa', 'iq', 'projects', 'internships',
    'techScore', 'commScore', 'backlogs',
    'hackathons', 'certifications'
  ]
};

fs.writeFileSync('./model_state.json', JSON.stringify(modelData, null, 2));
console.log("Model state with extended features saved.");

// Test accuracy
let correct = 0;
X.forEach((features, i) => {
  const pred = model.predict(features);
  if (pred === y[i]) correct++;
});
console.log(`Final Training Accuracy: ${(correct / X.length * 100).toFixed(2)}%`);
