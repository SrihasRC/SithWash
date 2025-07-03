#!/usr/bin/env python3
"""
Extract model information from PKL files and convert to JSON for TypeScript usage
"""

import joblib
import pandas as pd
import numpy as np
import json

def extract_model_info():
    """Extract model artifacts and convert to JSON format"""
    
    print("Loading model artifacts...")
    
    # Load all artifacts
    try:
        model = joblib.load('models/fraud_detection_model.pkl')
        scaler = joblib.load('models/fraud_detection_scaler.pkl')
        selected_features = joblib.load('models/selected_features.pkl')
        label_encoders = joblib.load('models/label_encoders.pkl')
        
        print(f"✓ Model type: {type(model).__name__}")
        print(f"✓ Selected features: {len(selected_features)}")
        print(f"✓ Label encoders: {len(label_encoders)}")
        
    except Exception as e:
        print(f"Error loading artifacts: {e}")
        return
    
    # Extract model information
    model_info = {
        "model_type": type(model).__name__,
        "selected_features": selected_features,
        "scaler_mean": scaler.mean_.tolist(),
        "scaler_scale": scaler.scale_.tolist(),
        "feature_count": len(selected_features),
        "label_encoders": {}
    }
    
    # Extract label encoders
    for feature, encoder in label_encoders.items():
        model_info["label_encoders"][feature] = {
            "classes": encoder.classes_.tolist()
        }
    
    # If it's a Random Forest, extract tree information (simplified)
    if hasattr(model, 'feature_importances_'):
        feature_importance = {}
        for i, feature in enumerate(selected_features):
            feature_importance[feature] = float(model.feature_importances_[i])
        
        model_info["feature_importances"] = feature_importance
        
        # Sort by importance
        sorted_features = sorted(feature_importance.items(), key=lambda x: x[1], reverse=True)
        print(f"\n📊 Top 10 Most Important Features:")
        for feature, importance in sorted_features[:10]:
            print(f"  {feature}: {importance:.4f}")
    
    # Extract some sample data statistics from the CSV
    print("\n📈 Loading dataset statistics...")
    df = pd.read_csv('data/transaction_dataset.csv')
    
    # Calculate statistics for each feature
    feature_stats = {}
    for feature in selected_features:
        if feature in df.columns:
            col_data = df[feature]
            if pd.api.types.is_numeric_dtype(col_data):
                feature_stats[feature] = {
                    "mean": float(col_data.mean()),
                    "std": float(col_data.std()),
                    "min": float(col_data.min()),
                    "max": float(col_data.max()),
                    "median": float(col_data.median()),
                    "type": "numeric"
                }
            else:
                feature_stats[feature] = {
                    "unique_values": col_data.unique().tolist()[:20],  # First 20 unique values
                    "type": "categorical"
                }
    
    model_info["feature_statistics"] = feature_stats
    
    # Dataset statistics
    model_info["dataset_info"] = {
        "total_samples": len(df),
        "fraud_samples": int(df['FLAG'].sum()),
        "fraud_rate": float(df['FLAG'].mean()),
        "total_features": len(df.columns) - 3  # Exclude Index, Address, FLAG
    }
    
    # Save to JSON
    with open('lib/ml-model-info.json', 'w') as f:
        json.dump(model_info, f, indent=2)
    
    print(f"\n✅ Model information extracted successfully!")
    print(f"📁 Saved to: lib/ml-model-info.json")
    print(f"📊 Dataset: {model_info['dataset_info']['total_samples']} samples, {model_info['dataset_info']['fraud_rate']:.4f} fraud rate")
    
    return model_info

if __name__ == "__main__":
    extract_model_info()
