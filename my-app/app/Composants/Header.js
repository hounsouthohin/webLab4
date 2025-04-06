"use client";
import Link from "next/link";
import Image from "next/image";
import styles from './moduleStyle/Header.module.css'; // Import des styles CSS Module

export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
                <div className="container-fluid">
                    {/* Logo */}
                    <div>
                        <Link className={`navbar-brand ${styles.navbarBrand}`} href="/">
                            <Image 
                                src="/img/CEPI.jpg" 
                                alt="logoApp" 
                                width={60} 
                                height={60}
                                className="img-fluid rounded-circle"
                            />
                        </Link>
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Menu de navigation */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className={`nav-link  ${styles.navLink}`} href="#">Menu1</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${styles.navLink}`} href="#">Menu2</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${styles.navLink}`} href="#">Menu3</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Profil */}
                    <div className={`d-flex align-items-center ${styles.profileContainer}`}>
                        <Link href="#" className={`profile-icon text-white ${styles.profileIcon}`}>
                            <i className="bi bi-person-circle"></i>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Recherche et Trier par */}
            <form className="d-flex flex-column flex-md-row align-items-center justify-content-center m-auto w-75">
                <div className={`input-group mt-3 w-100 w-md-50 ${styles.formGroup}`}>
                    <span className="input-group-text"><i className="bi bi-search"></i></span>
                    <input type="text" className={`form-control ${styles.formControl}`} placeholder="Rechercher..." />
                </div>

                <div className={`d-flex flex-md-row align-items-center w-100 w-md-50 mt-3 mx-md-3 ${styles.sortGroup}`}>
                    <div className="w-25 w-md-auto text-center text-md-start me-md-2">
                        <label htmlFor="sortOptions" className={`form-label fw-bold text-light ${styles.formLabel}`}>Trier par :</label>
                    </div>
                    <select id="sortOptions" className={`form-select w-75 w-md-auto ${styles.formSelect}`}>
                        <option value=" ">Choisir...</option>
                        <option value="date">Date</option>
                        <option value="popularite">Popularité</option>
                        <option value="nom">Nom</option>
                    </select>
                </div>
            </form>
        </header>
    );
}

