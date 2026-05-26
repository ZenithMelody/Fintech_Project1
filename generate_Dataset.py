import numpy as np
import pandas as pd

# 1. Establish a static seed for structural repeatability
np.random.seed(42)
num_samples = 1000

print("Executing Data Pipeline: Generating synthetic institutional lending database...")

# 2. Generate randomized, realistic ranges for our features
debt_to_equity = np.random.uniform(0.1, 5.0, num_samples)
interest_rate = np.random.uniform(2.5, 5.5, num_samples)

# 3. Create the underlying financial rule and inject market noise
market_noise = np.random.normal(0, 2.0, num_samples)
default_risk = 10.0 + (9.5 * debt_to_equity) + (4.0 * interest_rate) + market_noise

# 4. Enforce strict banking boundaries [0.0, 100.0]
default_risk = np.clip(default_risk, 0.0, 100.0)

# 5. Compile into a structured Pandas DataFrame and export to CSV
df = pd.DataFrame({
    'Company_ID': [f"CORP-{i:04d}" for i in range(num_samples)],
    'Debt_To_Equity': debt_to_equity,
    'Interest_Rate_Pct': interest_rate,
    'Default_Risk_Score': default_risk
})

df.to_csv('institutional_loans.csv', index=False)
print("SUCCESS: 'institutional_loans.csv' exported to your directory.")