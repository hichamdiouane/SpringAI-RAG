import { HorizontalLayout, VerticalLayout } from "@vaadin/react-components";
import "../styles/styles.css";

export default function Index() {
    return (
        <VerticalLayout className="home-container" theme="padding spacing">
            <h3  className="main-heading">Spring AI RAG Demo</h3>

            <HorizontalLayout theme="spacing" className="feature-cards">
                <VerticalLayout className="feature-card">
                    <h3 className="feature-title">Document Analysis</h3>
                    <p className="feature-text">
                        Upload and analyze PDF documents using advanced AI techniques
                    </p>
                </VerticalLayout>

                <VerticalLayout className="feature-card">
                    <h3 className="feature-title">Smart Chat</h3>
                    <p className="feature-text">
                        Get contextual answers from your documents using natural language
                    </p>
                </VerticalLayout>

                <VerticalLayout className="feature-card">
                    <h3 className="feature-title">Vector Search</h3>
                    <p className="feature-text">
                        Powered by PostgreSQL pgvector for efficient similarity searches
                    </p>
                </VerticalLayout>
            </HorizontalLayout>

            <VerticalLayout className="getting-started">
                <h3 className="section-title">Getting Started</h3>
                <ol className="instructions">
                    <li>Upload PDF documents through the admin interface</li>
                    <li>Ask questions about the document content in the chat</li>
                    <li>View and manage your conversation history</li>
                </ol>
            </VerticalLayout>
        </VerticalLayout>
    );
}