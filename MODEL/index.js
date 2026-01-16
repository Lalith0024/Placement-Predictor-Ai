const express = require('express');
const cors = require('cors');
const fs = require('fs');
const StudentPlacementModel = require('./model_engine');

const app = express();
app.use(cors());
app.use(express.json());

// Load model state
let modelData;
try {
  modelData = JSON.parse(fs.readFileSync('./model_state.json', 'utf8'));
} catch (err) {
  console.error("AI Model state not found. Run 'npm run train' first.");
}

const model = new StudentPlacementModel();
if (modelData) {
  model.fromJSON(modelData.model);
}

function normalizeInput(input, stats, order) {
  return order.map(f => {
    const val = (input[f] - stats[f].min) / (stats[f].max - stats[f].min);
    return val || 0;
  });
}

/**
 * API Endpoint for Prediction
 * Scalable to any number of features defined in modelData
 */
app.post('/api/predict', (req, res) => {
  if (!modelData) return res.status(500).json({ error: "Model not loaded" });

  const studentData = req.body;
  const features = modelData.featureOrder;

  // Check for missing fields
  for (const f of features) {
    if (studentData[f] === undefined) {
      return res.status(400).json({ error: `Missing feature: ${f}` });
    }
  }

  try {
    const normalized = normalizeInput(studentData, modelData.stats, features);
    const probability = model.predictProb(normalized);
    const prediction = probability >= 0.5 ? 1 : 0;

    res.json({
      placed: prediction === 1,
      probability: (probability * 100).toFixed(2),
      message: prediction === 1
        ? "Profile matches recruitment standards."
        : "Profile needs further skill enhancement."
    });
  } catch (error) {
    res.status(500).json({ error: "Inference engine error" });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`AI Backend ready on port ${PORT}`);
});
