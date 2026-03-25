import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h7>AI/ML Engineer Intern</h7>
                <h5>InLighnX Global Pvt Ltd</h5>
              </div>
              <h6>Aug 2025 - Nov 2025</h6>
            </div>
            <p>
              Built an end-to-end salary prediction system using ML and DL models with a Streamlit dashboard. Developed a GenAI + Agentic AI recipe assistant using LangChain, CrewAI, and RAG pipelines with multi-agent orchestration and contextual memory.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h7>AI/ML Intern</h7>
                <h5>Pinnacle Labs</h5>
              </div>
              <h6>Sep 2025 - Oct 2025</h6>
            </div>
            <p>
              Developed a resume parser using Sentence-BERT for semantic matching and built ML pipelines for preprocessing, embeddings, and similarity scoring. Also created an AI translator with OCR, speech recognition, and multilingual support using Streamlit.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h7>Data Science & Analytics Intern</h7>
                <h5>Future Interns</h5>
              </div>
              <h6>Jun 2025 - Aug 2025</h6>
            </div>
            <p>
              Worked on data analysis projects including social media tracking and e-commerce dashboards using Power BI. Applied NLP for sentiment analysis and built ML models with Streamlit-based interactive dashboards.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h7>Technical Support Engineer</h7>
                <h5>GlowTouch Technologies</h5>
              </div>
              <h6>Sep2021 - Nov2023</h6>
            </div>
            <p>
              Provided technical support for websites, hosting, DNS, and email systems. Resolved 7000+ issues with high customer satisfaction and ensured system performance and uptime.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h7>EPUB Operator</h7>
                <h5>Bit9 Business Solutions Pvt Ltd</h5>
              </div>
              <h6>Jan 2020 - Mar 2021</h6>
            </div>
            <p>
              Converted and formatted 550+ documents into EPUB format with proper structure, metadata, and quality validation to improve accessibility and indexing.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h7>Claims Adjudicator</h7>
                <h5>HGS - Hinduja Global Solutions</h5>
              </div>
              <h6>Jun 2019 - Dec 2019</h6>
            </div>
            <p>
              Processed insurance claims, verified documents, and ensured compliance with policies. Maintained high accuracy and handled claim evaluations efficiently.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Career;