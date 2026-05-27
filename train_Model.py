import os
import pandas as pd
from sklearn.linear_model import LinearRegression

csv_filename = 'institutional_loans.csv'

df = pd.read_csv(csv_filename)

# Split features (X) from target metric (y)
X = df[['Debt_To_Equity', 'Interest_Rate_Pct']]
y = df['Default_Risk_Score']

# Start and fit for Linear Regression
model = LinearRegression()
model.fit(X, y)

# Weights for our JS later
print(f"const beta0 = {model.intercept_:.4f}; // Statistical Intercept")
print(f"const beta1 = {model.coef_[0]:.4f};    // Debt-to-Equity Multiplier")
print(f"const beta2 = {model.coef_[1]:.4f};    // Interest Rate Multiplier")