# 🚀 SithWash - Audit the Dark Flow

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python)](https://www.python.org/)

> *"Your lack of compliance disturbs me."* - A Sith-themed anti-money laundering simulation platform

## 🌟 Live Demo

🔗 **[Deployed Website]** - *Link will be added soon*

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [ML Model](#ml-model)
- [Hackathon Context](#hackathon-context)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

**SithWash** is a hackathon project that demonstrates an advanced anti-money laundering (AML) simulation platform with a unique Star Wars Sith theme. Built for educational and demonstration purposes, it showcases how machine learning can be integrated into financial compliance systems with an engaging, thematic user interface.

The platform simulates real-world AML scenarios using pre-trained ML models and mock transaction data, providing an interactive way to understand fraud detection patterns and compliance workflows.

## ✨ Features

### 🔍 **Core Functionality**
- **ML-Powered Detection**: Pre-trained RandomForest classifier for transaction risk assessment
- **Interactive Dashboard**: Real-time metrics and analytics visualization
- **Transaction Audit**: Deep transaction analysis with ML-powered risk scoring
- **Network Analysis**: 3D visualization of transaction networks and connections
- **Risk Assessment**: Automated compliance scoring and risk categorization

### 🎨 **User Experience**
- **Sith Theme**: Dark, immersive UI with red accents and Star Wars terminology
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Interactive Visualizations**: Dynamic charts, graphs, and 3D network displays
- **Smooth Animations**: Enhanced with Framer Motion for fluid user interactions
- **Mock Data Simulation**: Realistic transaction patterns for demonstration

### 🛡️ **Simulation Features**
- **Transaction Generation**: Smart generation of realistic financial transaction patterns
- **Risk Scoring**: Multi-factor risk assessment using ML algorithms
- **Compliance Workflow**: Simulated AML compliance processes
- **Educational Content**: Learn about fraud detection through interactive demos

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript 5.0
- **UI Library**: ShadCN
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion 12.23.0 for smooth interactions
- **Icons**: Lucide React icon library
- **3D Graphics**: Three.js & React Force Graph 3D

### **Machine Learning**
- **Model**: Pre-trained RandomForest classifier (Python/scikit-learn)
- **Features**: 20 engineered features from transaction data
- **Data**: Mock transaction dataset with realistic patterns
- **Processing**: Feature engineering and data preprocessing utilities

### **Development Tools**
- **Build System**: Next.js with Turbopack
- **Type Checking**: TypeScript
- **Linting**: ESLint with Next.js configuration
- **Styling**: PostCSS with Tailwind CSS
- **Package Manager**: npm/yarn/pnpm

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18.x or higher
- npm/yarn/pnpm package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/SrihasRC/SithWash
   cd SithWash
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Build for Production**
```bash
npm run build
npm run start
```

## 📁 Project Structure

```
prompt-wars/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with navbar/footer
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # Analytics dashboard
│   ├── audit/             # Transaction audit tools
│   ├── network/           # Network visualization
│   └── about/             # About page
├── components/             # React components
│   ├── ui/                # Shadcn/ui base components
│   ├── navbar.tsx         # Navigation component
│   └── footer.tsx         # Footer component
├── lib/                   # Utility libraries
│   ├── utils.ts           # Common utilities
│   ├── sith-ml-engine.ts  # ML model interface
│   ├── transaction-ml-utils.ts # Transaction utilities
│   └── ml-model-info.json # Pre-trained model metadata
├── data/                  # Mock data
│   └── transactions.ts    # Transaction data and types
├── models/                # ML model files
│   ├── *.pkl             # Pre-trained model files
│   └── *.py              # Model training scripts
└── public/                # Static assets
    └── models/           # 3D model files
```

## 🤖 ML Model

### **Model Architecture**
- **Algorithm**: RandomForestClassifier (pre-trained)
- **Features**: 20 engineered features from transaction patterns
- **Training Data**: Realistic transaction dataset
- **Performance**: Optimized for fraud detection scenarios

### **Key Features**
- **ERC20 Analysis**: Token transaction pattern analysis
- **Temporal Patterns**: Time-based transaction behavior
- **Network Features**: Address relationship analysis
- **Value Patterns**: Transaction amount and frequency analysis
- **Risk Indicators**: Multi-factor risk assessment

### **Model Integration**
- **Client-Side**: TypeScript interface for ML model interaction
- **Feature Engineering**: Automated feature extraction from transactions
- **Real-time Scoring**: Live risk assessment of transactions
- **Explainable AI**: Feature importance and reasoning display

## 🏆 Hackathon Context

### **Purpose**
This project was developed as a hackathon submission to demonstrate:
- **Creative Theming**: Unique Star Wars Sith theme in fintech
- **Technical Skills**: Full-stack development with ML integration
- **User Experience**: Engaging and educational interface design
- **Problem Solving**: Innovative approach to financial compliance

### **Educational Value**
- **AML Awareness**: Understanding anti-money laundering processes
- **ML in Finance**: Practical application of machine learning
- **Risk Assessment**: Learning about financial risk evaluation
- **Compliance Workflow**: Simulated regulatory compliance processes

### **Demo Features**
- **Mock Data**: Realistic but fictional transaction scenarios
- **Interactive Learning**: Hands-on experience with fraud detection
- **Visual Analytics**: Clear presentation of complex financial data
- **Gamified Experience**: Sith theme makes learning engaging

## 📊 Key Components

### **Dashboard**
- Real-time transaction monitoring
- ML-powered fraud detection metrics
- Risk distribution analytics
- System activity tracking

### **Audit System**
- Deep transaction analysis
- ML model explanations
- Risk factor identification
- Compliance reporting

### **Network Analysis**
- 3D transaction network visualization
- Suspicious pattern detection
- Connection analysis
- Interactive network exploration

## 🎨 UI/UX Design

### **Sith Theme Elements**
- **Color Scheme**: Dark backgrounds with red accents
- **Typography**: Geist font family for modern readability
- **Animations**: Smooth transitions and hover effects
- **Iconography**: Star Wars-inspired terminology and symbols

### **Responsive Design**
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Intuitive mobile interactions
- **Progressive Enhancement**: Works without JavaScript
- **Accessibility**: ARIA labels and keyboard navigation

## 🔧 Development

### **Code Quality**
- **TypeScript**: Full type safety throughout the application
- **ESLint**: Consistent code style and error prevention
- **Component Architecture**: Reusable and maintainable components
- **Performance**: Optimized for fast loading and smooth interactions

### **Data Management**
- **Mock Data**: Realistic transaction patterns for demonstration
- **State Management**: React hooks for component state
- **Type Safety**: Strict TypeScript interfaces for data structures
- **Error Handling**: Graceful error states and user feedback

## 🤝 Contributing

This hackathon project welcomes contributions! Areas for improvement:

- **Enhanced ML Models**: More sophisticated fraud detection algorithms
- **Additional Features**: New analysis tools and visualizations
- **Performance Optimization**: Faster rendering and data processing
- **Accessibility**: Improved screen reader support
- **Testing**: Unit and integration test coverage

## 🙏 Acknowledgments

- **Star Wars Universe** - For the creative inspiration
- **Next.js Team** - For the amazing React framework
- **Shadcn/ui** - For the beautiful UI components
- **Scikit-learn** - For the machine learning capabilities
- **Hackathon Community** - For the motivation and creativity

---

**Built with ❤️ and the Dark Side of the Force**

*"Fear leads to anger, anger leads to hate, hate leads to compliance."*

### 🎯 Hackathon Achievement
This project demonstrates full-stack development skills, creative problem-solving, and innovative use of technology to make financial compliance education engaging and accessible.
