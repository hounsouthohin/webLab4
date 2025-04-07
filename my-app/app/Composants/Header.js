"use client";
import Link from "next/link";
import Image from "next/image";
import styles from './moduleStyle/Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            {/* Top Navigation */}
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    {/* Logo */}
                    <Link href="/" className={styles.logoLink}>
                        <Image
                            src="/img/CEPI.jpg" 
                            alt="logo du site"
                            width={50}
                            height={50}
                            className={styles.logo}
                        />
                        
                    </Link>

                    {/* Menu */}
                    <ul className={styles.menu}>
                        <li><Link href="#" className={styles.menuLink}>Menu 1</Link></li>
                        <li><Link href="#" className={styles.menuLink}>Menu 2</Link></li>
                        <li><Link href="#" className={styles.menuLink}>Menu 3</Link></li>
                        <li><Link href="#" className={styles.menuLink}>Menu 4</Link></li>
                    </ul>

                    {/* Profile Icon */}
                    <Link href="#" className={styles.profileIcon}>
                        <i className="bi bi-person-circle"></i>
                    </Link>
                </div>
            </nav>

            {/* Search & Filter Section */}
            <div className={styles.searchFilterContainer}>
                <div className={styles.search}>
                    <input type="text" className={styles.searchInput} placeholder="Rechercher..." />
                    <button className={styles.searchButton}>Search</button>
                </div>
                <div className={styles.filter}>
                <span className={styles.filterLabel}>Trier par :</span>
                    <select className={styles.filterSelect}>
                        <option value="date">Date</option>
                        <option value="popularity">Popularité</option>
                        <option value="name">Nom</option>
                    </select>
                </div>
            </div>
        </header>
    );
}
