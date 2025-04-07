"use client"; 
import Link from "next/link"; 
import styles from './moduleStyle/Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.socialLinks}>
                    <Link href="#" className={`${styles.socialLink} ${styles.facebook}`}>
                        <i className="bi bi-facebook"></i>
                    </Link>
                    <Link href="#" className={`${styles.socialLink} ${styles.twitter}`}>
                        <i className="bi bi-twitter"></i>
                    </Link>
                    <Link href="#" className={`${styles.socialLink} ${styles.linkedin}`}>
                        <i className="bi bi-linkedin"></i>
                    </Link>
                </div>
                <p className={styles.footerText}>Centre d'expertise et de perfectionnement en informatique</p>
                <p className={styles.footerYear}>2025</p>
            </div>
        </footer>
    );
}

