/**
 * Simple Logistic Regression implementation for binary classification.
 * This demonstrates fundamental understanding of ML algorithms.
 */
class StudentPlacementModel {
  constructor() {
    this.weights = null;
    this.bias = 0;
    this.learningRate = 0.01;
    this.epochs = 1000;
  }

  // Sigmoid activation function
  sigmoid(z) {
    return 1 / (1 + Math.exp(-z));
  }

  // Train the model using gradient descent
  train(X, y) {
    const numSamples = X.length;
    const numFeatures = X[0].length;
    this.weights = new Array(numFeatures).fill(0);
    this.bias = 0;

    for (let epoch = 0; epoch < this.epochs; epoch++) {
      let dw = new Array(numFeatures).fill(0);
      let db = 0;

      for (let i = 0; i < numSamples; i++) {
        // Prediction: z = w.x + b
        let z = this.bias;
        for (let j = 0; j < numFeatures; j++) {
          z += this.weights[j] * X[i][j];
        }

        const yPred = this.sigmoid(z);
        const error = yPred - y[i];

        // Accumulate gradients
        for (let j = 0; j < numFeatures; j++) {
          dw[j] += error * X[i][j];
        }
        db += error;
      }

      // Update parameters
      for (let j = 0; j < numFeatures; j++) {
        this.weights[j] -= (this.learningRate * dw[j]) / numSamples;
      }
      this.bias -= (this.learningRate * db) / numSamples;

      // Optional: Print progress every 100 epochs
      if (epoch % 100 === 0) {
        // Loss calculation could go here
      }
    }
    console.log("Model training complete.");
  }

  // Predict probability
  predictProb(x) {
    let z = this.bias;
    for (let i = 0; i < x.length; i++) {
      z += this.weights[i] * x[i];
    }
    return this.sigmoid(z);
  }

  // Predict class (0 or 1)
  predict(x) {
    return this.predictProb(x) >= 0.5 ? 1 : 0;
  }

  // Save model state
  toJSON() {
    return {
      weights: this.weights,
      bias: this.bias
    };
  }

  // Load model state
  fromJSON(data) {
    this.weights = data.weights;
    this.bias = data.bias;
  }
}

module.exports = StudentPlacementModel;
