import {NavLink, Outlet} from "react-router";

export default function Layout() {
    return (
        <div>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/chat">Chat</NavLink>
            </nav>
            <main>
                <Outlet></Outlet>
            </main>
        </div>
);
}