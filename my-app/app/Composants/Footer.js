"use client";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="text-light text-center py-4">
            <div className="container">
                <div className="mb-3">
                    <Link href="#" className="text-info me-3 fs-3 p-2 rounded-circle border border-2 border-dark hover-effect">
                        <i className="bi bi-facebook"></i>
                    </Link>
                    <Link href="#" className="text-info me-3 fs-3 p-2 rounded-circle border border-2 border-info hover-effect">
                        <i className="bi bi-twitter"></i>
                    </Link>
                    <Link href="#" className="text-info fs-3 p-2 rounded-circle border border-2 border-success hover-effect">
                        <i className="bi bi-linkedin"></i>
                    </Link>
                </div>
                <p className="fw-light">Centre d'expertise et de perfectionnement en informatique</p>
                <p className="align-items-center">2025</p>
            </div>
        </footer>
    );
}
