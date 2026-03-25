import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "GenAI & AgenticAI Recipe Assistant (Agentic + RAG)",
    category: "GenAI Application(Chatbot)",
    tools:
      "Python, LangChain, CrewAI, OpenAI API, RAG Pipeline, ChromaDB, Streamlit, llama LLM",
    image: "/images/recipe-ai.png",
    link: "https://github.com/GouthumKharvi/GenAI-Agentic-Recipe-Assistant-chatbot-",
  },
  {
  title: "AI Product Defect Detection System",
  category: "Computer Vision (Deep Learning)",
  tools: "Python, TensorFlow, Keras, OpenCV, Streamlit, Grad-CAM, MobileNetV2, EfficientNetB0, CNN",
  image: "/images/aiproductdefect.png",
  link: "https://github.com/GouthumKharvi/AI-Product-Defect",
  },
  {
  title: "Credit Card Fraud Detection System",
  category: "Machine Learning (Anomaly Detection)",
  tools: "Python, Scikit-learn, XGBoost, SMOTE, Pandas, Streamlit",
  image: "/images/credit.png",
  link: "https://github.com/GouthumKharvi/Credit-Card-Capstone-",
  },
  {
  title: "Ecommerce Product Categorization",
  category: "Machine Learning, Deep Learning (NLP)",
  tools: "Python, Scikit-learn, PyTorch, Hugging Face Transformers, BERT, LSTM, NLP",
  image: "/images/ecommerce.png",
  link: "https://github.com/GouthumKharvi/Product-Categorization", 
  },
  {
  title: "Fullstack Task Manager App",
  category: "Full Stack Web Application",
  tools: "Python, Replit, FastAPI, React.js, Vite, Tailwind CSS, REST API, Pydantic",
  image: "/images/fullstack.png",
  link: "https://github.com/GouthumKharvi/TaskMaster-Fullstack",
  },
  {
  title: "AI Global Language Translator",
  category: "AI Application (NLP & Multimodal)",
  tools: "Python, Streamlit, NLP, SpeechRecognition, gTTS, Deep Translator, OCR (Tesseract), PyMuPDF, Pandas",
  image: "/images/aiglobal.png",
  link: "https://github.com/GouthumKharvi/AI-Global-Translator",
  },
  {
  title: "AI Resume Parser & Job Recommendation System",
  category: "AI Application (NLP & Recommendation System)",
  tools: "Python, Streamlit, NLP, Sentence Transformers, Scikit-learn, Cosine Similarity, Pandas, NumPy, PyMuPDF",
  image: "/images/airesume.png",
  link: "https://github.com/GouthumKharvi/AI-Resume-Parser",
  },
  {
  title: "Machine Learning Salary Prediction System",
  category: "Machine Learning (Regression & Analytics)",
  tools: "Python, Streamlit, Scikit-learn, XGBoost, Pandas, NumPy, Matplotlib, Seaborn",
  image: "/images/salary.png",
  link: "https://github.com/GouthumKharvi/Prediction-Of-Salary",
  },
  {
  title: "E-commerce Sales Dashboard",
  category: "Data Analytics (Business Intelligence)",
  tools: "Power BI, Power Query, DAX, Data Modeling, Data Visualization",
  image: "/images/E-commerce.png",
  link: "https://github.com/GouthumKharvi/FUTURE_DS_01",
  },
  {
  title: "Social Media Campaign Performance Dashboard",
  category: "Data Analytics (Marketing & Business Intelligence)",
  tools: "Power BI, Power Query, DAX, Data Modeling, KPI Analysis, Campaign Analytics",
  image: "/images/socialmedia.png",
  link: "https://github.com/GouthumKharvi/FUTURE_DS_02",
  },
  {
  title: "Student Feedback Analysis & Sentiment Dashboard",
  category: "AI & Data Analytics (NLP + Business Intelligence)",
  tools: "Python, NLP, TextBlob, VADER, Scikit-learn, Streamlit, Power BI, DAX, Power Query",
  image: "/images/student.png",
  link: "https://github.com/GouthumKharvi/FUTURE_DS_03",
  },
  {
  title: "Duplicate Question Pair Detection (NLP)",
  category: "Machine Learning & NLP (Text Similarity)",
  tools: "Python, NLP, Bag of Words, TF-IDF, Random Forest, Scikit-learn, Feature Engineering, Streamlit",
  image: "/images/Duplicate.png",
  link: "https://github.com/GouthumKharvi/Duplicate_Question_Pair-NLP-",
  },
  {
  title: "Disaster Risk & Insurance Advisory AI Chatbot",
  category: "GenAI Application (LLM + Real-Time Risk Assessment)",
  tools: "Python, Streamlit, Groq LLM, Open-Meteo API, NLP, Risk Scoring Engine, JSON Processing",
  image: "/images/Disaster.png",
  link: "https://github.com/GouthumKharvi/Disaster-Preparedness-Risk-Assessment-engline-AI-Chatbot",
  },
  {
  title: "Glove vs Bare-Hand Detection System",
  category: "Computer Vision (Object Detection & Safety Compliance)",
  tools: "Python, YOLOv8, PyTorch, OpenCV, NumPy, Roboflow Dataset, Ultralytics",
  image: "/images/glove.png",
  link: "https://github.com/GouthumKharvi/Glove-VS-Bare-Hand-Biz-Tech-",
  },
  {
  title: "Blinkit E-Commerce Sales Analysis Dashboard",
  category: "Data Analytics (Business Intelligence & Retail Analytics)",
  tools: "Power BI, Power Query, DAX, Data Modeling, Data Visualization, KPI Analysis",
  image: "/images/blinkit.png",
  link: "https://github.com/GouthumKharvi/Comprehensive-Sales-Analysis-of-Blinkit-Using-Power-BI",
  },
  {
  title: "HR Insights & Employee Data Dashboard",
  category: "Data Analytics (Business Intelligence & Workforce Analytics)",
  tools: "Tableau, Data Visualization, Data Modeling, Calculated Fields, KPI Analysis, Dashboard Design",
  image: "/images/hr.png",
  link: "https://github.com/GouthumKharvi/HR-Insights-and-Employee-Data-Dashboard",
  },
  {
  title: "Retail Sales ETL Pipeline & Analytics Dashboard",
  category: "Data Engineering & Analytics (ETL + Data Warehouse)",
  tools: "Python, Pandas, ETL Pipeline, MySQL, SQL, Streamlit, Data Warehousing, Data Quality Automation, Hadoop, Spark, Kafka",
  image: "/images/Retail.png",
  link: "https://github.com/GouthumKharvi/Retail-Sales-ETL-Pipeline-with-Automated-Data-Quality",
  },
  {
  title: "Retail Supply Chain Optimization System",
  category: "Optimization & Machine Learning (Operations Research)",
  tools: "Python, PuLP (Linear Programming), Gurobi Optimizer, PySpark, Pandas, Optimization Modeling",
  image: "/images/pulp.png",
  link: "https://github.com/GouthumKharvi/Retail-Store-Allocation-Optimization-using-PuLP",
  },
  {
  title: "TinyTales – GenAI Children's Story Generator",
  category: "Generative AI (LLM & NLP)",
  tools: "Python, GPT-2, Hugging Face Transformers, PyTorch, NLP, Text Generation, ipywidgets",
  image: "/images/tinytales.png",
  link: "https://github.com/GouthumKharvi/TinyTales-GenAI-",
  },
  {
  title: "Indian Used Car Price Prediction System",
  category: "Machine Learning (Regression & Predictive Analytics)",
  tools: "Python, Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, Feature Engineering, Regression Models",
  image: "/images/car.png",
  link: "https://github.com/GouthumKharvi/usedcarprediction",
  },
  {
  title: "Invoice Information Extraction using Machine Learning",
  category: "Machine Learning (NLP & Document Intelligence)",
  tools: "Python, OCR Processing, Scikit-learn, SpaCy NER, Pandas, NumPy, Feature Engineering, Text Processing",
  image: "/images/invoice.png",
  link: "https://github.com/GouthumKharvi/Invoice-Information-Extraction-Using-Python-and-Machine-Learning",
  },
  {
  title: "Car Sales Database Management System",
  category: "Database Management & Data Analytics (SQL)",
  tools: "MySQL, SQL, Database Design, Data Modeling, Joins, Aggregations, Stored Procedures",
  image: "/images/cars.png",
  link: "https://github.com/GouthumKharvi/Car-Sales-Database-Management-System-using-SQL",
  },
  {
  title: "NFT Market Trends Analysis (Cryptopunks SQL)",
  category: "Data Analytics (SQL & Financial Data Analysis)",
  tools: "SQL, MySQL, Data Analysis, Window Functions, Aggregations, Data Exploration, Query Optimization",
  image: "/images/nft.png",
  link: "https://github.com/GouthumKharvi/NFT-Market-Trends-SQL-Analysis-of-Cryptopunks-Transactions",
  },
  {
  title: "AI Finance Assistant (Multi-Agent Voice-Based Market Analyzer)",
  category: "GenAI Application (Agentic AI & Voice Intelligence)",
  tools: "Python, FastAPI, Streamlit, LangChain, FAISS, Whisper, gTTS, Alpha Vantage API, Web Scraping, Multi-Agent Systems",
  image: "/images/finance.png",
  link: "https://github.com/GouthumKharvi/Financeagent2.0",
  },
  {
  title: "Superstore Sales Performance Dashboard (Tableau)",
  category: "Data Analytics (Business Intelligence & Data Visualization)",
  tools: "Tableau, Data Visualization, Dashboard Design, KPI Analysis, Data Filtering, Interactive Analytics",
  image: "/images/superstore.png",
  link: "https://github.com/GouthumKharvi/Superstore-Sales-Performance-Dashboard-Tableu-",
  },
  {
  title: "Healthcare Summary Report Dashboard (Tableau)",
  category: "Data Analytics (Healthcare & Business Intelligence)",
  tools: "Tableau, Data Visualization, Dashboard Design, KPI Analysis, Calculated Fields, Interactive Filters",
  image: "/images/Healthcare.png",
  link: "https://github.com/GouthumKharvi/Healthcare-summary-report-Tableu-",
  },
  {
  title: "Statistical Analysis of Factors Influencing House Prices",
  category: "Data Analytics (Statistical Modeling & Regression Analysis)",
  tools: "Python, Pandas, NumPy, Statistical Analysis, Multiple Linear Regression, Hypothesis Testing, Data Visualization",
  image: "/images/house.png",
  link: "https://github.com/GouthumKharvi/-Statistical-Analysis-of-Factors-Influencing-House-Prices",
  },
  {
  title: "Dental Claims Reimbursement Analysis",
  category: "Statistical Analysis (Inference & Confidence Intervals)",
  tools: "Excel, Statistical Analysis, Probability, Confidence Intervals, t-Distribution, Data Visualization",
  image: "/images/dental.png",
  link: "https://github.com/GouthumKharvi/Counting-Claims-A-Statistical-Deep-Dive-into-Dental-Reimbursements",
  },
  {
  title: "Virat Kohli T20 Performance Analysis (2010–2024)",
  category: "Data Analytics (Sports Analytics & Data Visualization)",
  tools: "Excel, Data Analysis, Data Cleaning, Pivot Tables, Advanced Excel Functions (SUMIF, COUNTIF, AVERAGEIF), Data Visualization, Dashboarding",
  image: "/images/vk.png",
  link: "https://github.com/GouthumKharvi/ViratKohli_T20_Stats_2010-2024",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="Projects">
      <div className="work-container section-container">
        <h2>
          My <span>Projects</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>

                        <div className="carousel-tools">
                          <span className="tools-label">
                            Tools & Features
                          </span>
                          <p>{project.tools}</p>

                          {/* ✅ View Project Button */}
                          {project.link && (
                            <button
                              className="view-project-btn"
                              onClick={() =>
                                window.open(project.link, "_blank")
                              }
                            >
                              View Project →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;