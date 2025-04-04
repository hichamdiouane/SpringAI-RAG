import { NavLink, Outlet } from "react-router-dom";
import { AppLayout, Icon } from "@vaadin/react-components";
import "../styles/styles.css";
import "@vaadin/icons";

export default function Layout() {
    return (
        <AppLayout>
            <nav slot="navbar" className="main-nav">
                <div className="nav-container">
                    <div className="brand">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <Icon icon="vaadin:brain" className="logo" />
                            <span className="brand-name">AI RAG Demo</span>
                        </NavLink>

                    </div>

                    <div className="nav-links">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <Icon icon="vaadin:home" className="nav-icon" />
                            <span className="nav-text">Home</span>
                        </NavLink>

                        <NavLink
                            to="/chat"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <Icon icon="vaadin:comment" className="nav-icon" />
                            <span className="nav-text">Chat</span>
                        </NavLink>
                    </div>
                </div>
            </nav>

            <main  className="main-content">
                <Outlet />
            </main>
        </AppLayout>
    );
}