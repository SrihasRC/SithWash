
def predict_fraud(new_data):
    """
    Predict fraud for new transaction data

    Parameters:
    new_data (dict or pd.DataFrame): New transaction data

    Returns:
    dict: Prediction results
    """
    import joblib
    import pandas as pd
    import numpy as np

    # Load model artifacts
    model = joblib.load('fraud_detection_model.pkl')
    scaler = joblib.load('fraud_detection_scaler.pkl')
    selected_features = joblib.load('selected_features.pkl')
    label_encoders = joblib.load('label_encoders.pkl')

    # Convert to DataFrame if needed
    if isinstance(new_data, dict):
        new_data = pd.DataFrame([new_data])

    # Preprocess the data (apply same preprocessing as training)
    processed_data = new_data.copy()

    # Apply label encoding
    for feature, encoder in label_encoders.items():
        if feature in processed_data.columns:
            # Handle unseen labels during prediction
            try:
                processed_data[feature] = encoder.transform(processed_data[feature].astype(str))
            except ValueError:
                # If an unseen label is encountered, treat it as an unknown category (e.g., -1)
                # This depends on how you want to handle unseen data in production
                processed_data[feature] = -1 # Or some other indicator for unknown

    # Ensure all selected features are present, fill missing with a default or median/mean from training
    for feature in selected_features:
        if feature not in processed_data.columns:
            # Add missing feature and fill with a placeholder (e.g., 0 or median from training)
            processed_data[feature] = 0 # Replace 0 with a more appropriate value if needed

    # Reorder columns to match training data
    processed_data = processed_data[selected_features]


    # Scale the features
    scaled_data = scaler.transform(processed_data)

    # Make prediction
    prediction = model.predict(scaled_data)
    probability = model.predict_proba(scaled_data)[:, 1]

    return {
        'prediction': prediction[0],
        'probability': probability[0],
        'is_fraud': bool(prediction[0])
    }

# Example usage:
# new_transaction_data = {'feature1': 123, 'feature2': 'abc', ...} # Replace with actual data
# result = predict_fraud(new_transaction_data)
# print(f"Fraud prediction: {result['is_fraud']}")
# print(f"Fraud probability: {result['probability']:.4f}")
