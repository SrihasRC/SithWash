# 🚀 SithWash - Audit the Dark Flow

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python)](https://www.python.org/)

> *"Your lack of compliance disturbs me."* - A Sith-themed anti-money laundering simulation platform

## 🌟 Live Demo

🔗 **[Visit SithWash Live](https://sith-wash.vercel.app/)** - Experience the dark side of compliance

🔗 YT - Video : https://www.youtube.com/watch?v=jeju3es6tZg

## 📋 Table of Contents

- [Overview](#overview)
- [Hackathon Track & Problem](#hackathon-track--problem)
- [Business Model](#business-model)
- [Bounties Completed](#bounties-completed)
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

The platform simulates real-world AML scenarios using pre-trained ML models and mock transaction data, providing an interactive way to understand fraud detection patterns and compliance workflows. With its dark, immersive interface and 3D interactive elements, SithWash makes financial compliance education both engaging and memorable.

## 🏆 Hackathon Track & Problem

### **Chosen Track: AI/ML in Finance**
Building innovative AI-powered solutions for financial technology and compliance

### **Problem Statement**
Traditional anti-money laundering (AML) systems are complex, difficult to understand, and often inaccessible to those learning about financial compliance. There's a need for:

- **Educational Tools**: Interactive platforms to learn about AML processes
- **ML Transparency**: Clear visualization of how AI models detect suspicious transactions
- **Engaging Interfaces**: Making complex financial concepts accessible and interesting
- **Practical Demonstration**: Real-world simulation of compliance workflows

### **Solution**
SithWash addresses these challenges by:

- **Gamification**: Using Star Wars Sith theme to make learning engaging
- **Interactive ML**: Visual explanation of fraud detection algorithms
- **3D Visualization**: Immersive network analysis of transaction patterns
- **Educational Simulation**: Safe environment to explore AML concepts

## 💼 Business Model

### **Target Audience**
- **Educational Institutions**: Finance and cybersecurity programs
- **Training Organizations**: Corporate compliance training
- **FinTech Companies**: AML education and awareness
- **Regulatory Bodies**: Public education initiatives

### **Revenue Streams**
1. **Educational Licensing**: Subscription model for academic institutions
2. **Corporate Training**: Custom training modules for financial organizations
3. **Consulting Services**: AML system implementation and optimization
4. **SaaS Platform**: White-label compliance education solutions

### **Value Proposition**
- **Cost Reduction**: Lower training costs compared to traditional methods
- **Engagement**: Higher retention through gamified learning
- **Scalability**: Reach unlimited users with digital platform
- **Compliance**: Meet regulatory training requirements effectively

## 🏅 Bounties Completed

### ✅ **1. Dark Theme Implementation**
- **Achievement**: Full dark theme across the entire website
- **Details**: Consistent dark color scheme with red accents, professional Sith-inspired design
- **Impact**: Enhanced user experience with modern, immersive interface

### ✅ **2. Easter Egg Feature**
- **Achievement**: Hidden interactive easter egg in the /about page
- **Details**: Click on "Gray circle" 3 times to reveal a special Sith quote animation
- **Location**: `/about` page - look for the "Floating Gray Circle" and click it multiple times
- **Impact**: Added fun, discoverable element that encourages exploration

### ✅ **3. Discord Community Participation**
- **Achievement**: Active participation in Star Wars scene replay
- **Details**: Engaged in community activities and Star Wars-themed discussions
- **Impact**: Connected with the hackathon community and embraced the theme

### ✅ **4. 3D Interactive Model**
- **Achievement**: Integrated 3D Darth Vader model on homepage
- **Details**: Interactive Three.js model with smooth loading animation and controls
- **Features**: 
  - Responsive scaling across devices
  - Smooth rotation and interaction
  - Loading state with Sith-themed spinner
  - Prominent placement for immediate visual impact
- **Impact**: Elevated visual experience and demonstrated 3D development skills

## ✨ Features

### 🔍 **Core Functionality**
- **ML-Powered Detection**: Pre-trained RandomForest classifier for transaction risk assessment
- **Interactive Dashboard**: Real-time metrics and analytics visualization
- **Transaction Audit**: Deep transaction analysis with ML-powered risk scoring
- **Network Analysis**: 3D visualization of transaction networks and connections
- **Risk Assessment**: Automated compliance scoring and risk categorization

### 🎨 **User Experience**
- **Sith Theme**: Dark, immersive UI with red accents and Star Wars terminology
- **3D Interactive Model**: Prominent Darth Vader model on homepage with smooth controls
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Interactive Visualizations**: Dynamic charts, graphs, and 3D network displays
- **Smooth Animations**: Enhanced with Framer Motion for fluid user interactions
- **Mock Data Simulation**: Realistic transaction patterns for demonstration
- **Easter Egg**: Hidden interactive feature in the about page for discovery

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
- **3D Graphics**: Three.js with React Three Fiber for interactive Darth Vader model
- **Visualizations**: React Force Graph 3D for network analysis

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
   git clone https://github.com/SrihasRC/SithWash.git
   cd prompt-wars
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

### **Hackathon Submission Details**
- **Event**: Star Wars-themed hackathon focusing on innovative technology solutions
- **Track**: AI/ML in Finance - Building intelligent financial compliance tools
- **Theme Integration**: Full Sith/Dark Side aesthetic with Star Wars terminology
- **Development Time**: Rapid prototyping and full-stack implementation

### **Purpose**
This project was developed as a hackathon submission to demonstrate:
- **Creative Theming**: Unique Star Wars Sith theme in fintech application
- **Technical Excellence**: Full-stack development with ML integration and 3D graphics
- **User Experience**: Engaging and educational interface design with interactive elements
- **Problem Solving**: Innovative approach to making financial compliance accessible
- **Community Engagement**: Active participation in hackathon activities and bounties

### **Hackathon Achievements**
- ✅ **Dark Theme Mastery**: Comprehensive dark UI implementation
- ✅ **3D Model Integration**: Interactive Darth Vader model with smooth animations
- ✅ **Easter Egg Discovery**: Hidden interactive feature for user engagement
- ✅ **Discord Participation**: Active community involvement in Star Wars activities
- 🚀 **Live Deployment**: Fully functional website deployed and accessible

### **Educational Value**
- **AML Awareness**: Interactive understanding of anti-money laundering processes
- **ML in Finance**: Practical application of machine learning in compliance
- **Risk Assessment**: Hands-on learning about financial risk evaluation
- **Compliance Workflow**: Simulated regulatory compliance processes
- **Technology Integration**: Demonstration of modern web technologies in fintech

### **Demo Features**
- **Mock Data**: Realistic but fictional transaction scenarios
- **Interactive Learning**: Hands-on experience with fraud detection
- **Visual Analytics**: Clear presentation of complex financial data
- **Gamified Experience**: Sith theme makes learning engaging

## 📊 Key Components

### **Homepage**
- **3D Darth Vader Model**: Interactive Three.js model with smooth controls and loading animation
- **Hero Section**: Compelling introduction with Sith-themed messaging
- **Feature Overview**: Quick access to main platform capabilities
- **Responsive Layout**: Optimized two-column design for visual impact

### **Dashboard**
- Real-time transaction monitoring with dark theme
- ML-powered fraud detection metrics and analytics
- Risk distribution analytics with interactive charts
- System activity tracking and compliance metrics

### **Audit System**
- Deep transaction analysis with detailed breakdowns
- ML model explanations and feature importance
- Risk factor identification and scoring
- Compliance reporting and documentation

### **Network Analysis**
- 3D transaction network visualization
- Suspicious pattern detection and highlighting
- Connection analysis between entities
- Interactive network exploration with zoom and pan

### **About Page**
- Project information and team details
- **Easter Egg Feature**: Click "Dark Side" text 3 times for hidden animation
- Technology stack overview
- Educational content about AML and fraud detection

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

## 🎯 Hackathon Readiness

### **Submission Completeness**
- ✅ **Live Deployment**: [https://sith-wash.vercel.app/](https://sith-wash.vercel.app/)
- ✅ **Source Code**: Complete TypeScript/Next.js implementation
- ✅ **Documentation**: Comprehensive README with all required details
- ✅ **Bounties**: All 4 bounties successfully completed
- ✅ **Theme Integration**: Full Star Wars Sith aesthetic throughout
- ✅ **Technical Innovation**: ML integration, 3D graphics, and modern web stack

### **Judge Evaluation Points**
1. **Technical Complexity**: Full-stack app with ML, 3D graphics, and responsive design
2. **Theme Adherence**: Comprehensive Sith/Dark Side theming with appropriate terminology
3. **User Experience**: Intuitive interface with smooth animations and interactions
4. **Innovation**: Creative approach to financial compliance education
5. **Completeness**: Fully functional platform with multiple interconnected features
6. **Code Quality**: TypeScript implementation with proper structure and best practices

## 🤝 Contributing

This hackathon project welcomes contributions! Areas for improvement:

- **Enhanced ML Models**: More sophisticated fraud detection algorithms
- **Additional Features**: New analysis tools and visualizations
- **Performance Optimization**: Faster rendering and data processing
- **Accessibility**: Improved screen reader support
- **Testing**: Unit and integration test coverage

## 🙏 Acknowledgments

- **Star Wars Universe** - For the creative inspiration and iconic characters
- **Hackathon Organizers** - For the amazing event and bounty opportunities
- **Next.js Team** - For the incredible React framework and development experience
- **Shadcn/ui** - For the beautiful, accessible UI component library
- **Three.js Community** - For the powerful 3D graphics capabilities
- **Scikit-learn** - For the robust machine learning framework
- **Vercel** - For seamless deployment and hosting
- **Discord Community** - For the engaging Star Wars activities and support

---

**Built with ❤️ and the Dark Side of the Force**

*"Fear leads to anger, anger leads to hate, hate leads to compliance."*

### 🎯 Hackathon Achievement Summary
This project demonstrates comprehensive full-stack development skills, creative problem-solving, innovative use of modern web technologies, and successful completion of all hackathon bounties. SithWash represents a unique approach to making financial compliance education engaging, accessible, and memorable through immersive theming and interactive technology.
