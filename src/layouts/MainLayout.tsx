import Header from "../components/layout/Header.tsx";
import {Outlet} from "react-router-dom";
import Footer from "../components/layout/Footer.tsx";

export default function MainLayout() {
    return (
        <div className="main-layout">

            <Header />
            <main className="main-content">
                <Outlet/>
            </main>
            <Footer />
        </div>
    )
}