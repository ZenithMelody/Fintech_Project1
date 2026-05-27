// scikit-learn model numbers
const beta0 = 10.0685; // Statistical Intercept
const beta1 = 9.4862;  // Debt-to-Equity Multiplier
const beta2 = 3.9979;  // Interest Rate Multiplier

// DOM Nodes
const debtSlider = document.getElementById('debt-equity');
const rateSlider = document.getElementById('interest-rate');

const debtDisplay = document.getElementById('debt-val');
const rateDisplay = document.getElementById('interest-val');

const scoreDisplay = document.getElementById('risk-score-display');
const statusFlag = document.getElementById('status-flag');
const statusText = document.getElementById('status-text');

// Main Calculation
function evaluateDefaultRisk() {
    // Get DOM inputs
    const x1 = parseFloat(debtSlider.value);
    const x2 = parseFloat(rateSlider.value);

    // Update text change
    debtDisplay.textContent = x1.toFixed(1);
    rateDisplay.textContent = x2.toFixed(2) + '%';

    // Predictive linear formula
    let predictedScore = beta0 + (beta1 * x1) + (beta2 * x2);

    // Limits to protect banking data integrity
    predictedScore = Math.min(Math.max(predictedScore, 0.0), 100.0);

    scoreDisplay.textContent = predictedScore.toFixed(2);

    updateSystemState(predictedScore);
}

// Output of Calculation
function updateSystemState(score) {

    statusFlag.className = 'status-indicator';

    if (score < 40.0) {
        statusFlag.classList.add('state-safe');
        statusText.textContent = "Portfolio Standard: Safe";
    } else if (score >= 40.0 && score <= 65.0) {
        statusFlag.classList.add('state-review');
        statusText.textContent = "Risk Warning: Manual Review";
    } else {
        statusFlag.classList.add('state-danger');
        statusText.textContent = "Credit Alert: High Risk";
    }
}

debtSlider.addEventListener('input', evaluateDefaultRisk);
rateSlider.addEventListener('input', evaluateDefaultRisk);

evaluateDefaultRisk();