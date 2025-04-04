"use client";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-sm">
                <div className="container-fluid">
                    {/* Logo */}
                    <div>
                        <Link className="navbar-brand d-flex align-items-center" href="/">
                            <Image 
                                src="/img/CEPI.jpg" 
                                alt="logoApp" 
                                width={60} 
                                height={60}
                                className="img-fluid rounded-circle border border-light shadow-lg"
                                style={{ objectFit: "cover", transition: "transform 0.3s ease, box-shadow 0.3s ease" }} 
                            />
                        </Link>
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse w-50" id="collapsibleNavbar">
                        <ul className="navbar-nav w-100 d-flex justify-content-around">
                            <li className="nav-item"><Link className="nav-link" href="#">Menu1</Link></li>
                            <li className="nav-item"><Link className="nav-link" href="#">Menu2</Link></li>
                            <li className="nav-item"><Link className="nav-link" href="#">Menu3</Link></li>
                            <li className="nav-item"><Link className="nav-link" href="#">Menu4</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="d-flex align-items-center px-3 d-none d-md-block">
                    <Link href="#" className="profile-icon text-white d-flex justify-content-center align-items-center">
                        <i className="bi bi-person-circle"></i>
                    </Link>
                </div>
            </nav>

            <form className="d-flex flex-column flex-md-row align-items-center justify-content-center m-auto w-75">
                <div className="input-group mt-3 w-100 w-md-50">
                    <span className="input-group-text"><i className="bi bi-search"></i></span>
                    <input type="text" className="form-control barre" placeholder="Rechercher..."/>
                </div>         

                <div className="d-flex flex-md-row align-items-center w-100 w-md-50 mt-3 mx-md-3">
                    <div className="w-25 w-md-auto text-center text-md-start me-md-2">
                        <label htmlFor="sortOptions" className="form-label fw-bold text-light">Trier par :</label>
                    </div>        
                    <select id="sortOptions" className="form-select w-75 w-md-auto trie">
                        <option selected>Choisir...</option>
                        <option value="date">Date</option>
                        <option value="popularite">Popularité</option>
                        <option value="nom">Nom</option>
                    </select>
                </div>
            </form>
        </header>
    );
}
