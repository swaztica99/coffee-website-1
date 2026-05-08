"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import styles from "./menu.module.css";

// Data Menu Lengkap dengan Gambar & Deskripsi
const menuData = [
    {
        category: "Coffee Based",
        items: [
            { id: 101, name: "Espresso", price: "IDR 25k", img: "/espresso.jpg", desc: "Ekstraksi kopi murni dengan aroma kuat dan krema tebal." },
            { id: 102, name: "Latte", price: "IDR 35k", img: "/latte.jpg", desc: "Perpaduan espresso dengan susu steam lembut dan foam tipis." },
            { id: 103, name: "Cappuccino", price: "IDR 35k", img: "/capuccino-classic.jpg", desc: "Keseimbangan sempurna antara espresso, susu, dan foam tebal." },
            { id: 104, name: "Americano", price: "IDR 30k", img: "/americano.jpg", desc: "Espresso shot yang diencerkan dengan air panas untuk rasa yang lebih ringan." },
        ]
    },
    {
        category: "Non-Coffee",
        items: [
            { id: 201, name: "Matcha Latte", price: "IDR 38k", img: "/matcha-zen.jpg", desc: "Teh hijau Jepang kualitas premium dengan susu segar yang creamy." },
            { id: 202, name: "Artisan Chocolate", price: "IDR 35k", img: "/choco-lava.jpg", desc: "Cokelat hitam pilihan yang dilelehkan bersama susu hangat." },
        ]
    },
    {
        category: "Pastry",
        items: [
            { id: 301, name: "Butter Croissant", price: "IDR 28k", img: "/buttercroissant.jpg", desc: "Roti khas Perancis dengan lapisan mentega yang renyah di luar dan lembut di dalam." },
            { id: 302, name: "Almond Croissant", price: "IDR 35k", img: "/croissant.jpg", desc: "Croissant dengan isian krim almond manis dan taburan almond panggang." },
        ]
    }
];

export default function MenuPage() {
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    return (
        <main className={styles.menuPage}>
            {/* Navigasi Sederhana */}
            <nav className={styles.simpleNav}>
                <Link href="/" className={styles.backBtn}>← Back to Home</Link>
                <h1 className={styles.menuLogo}>CULTURA</h1>
            </nav>

            <section className={styles.menuContainer}>
                <header className={styles.menuHeader}>
                    <span>Selected Selection</span>
                    <h2>The Full Menu</h2>
                </header>

                {/* List Kategori */}
                {menuData.map((section, idx) => (
                    <div key={idx} className={styles.categorySection}>
                        <h3 className={styles.categoryTitle}>{section.category}</h3>

                        <div className={styles.productGrid}>
                            {section.items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    className={styles.productCard}
                                    whileHover={{ y: -10 }}
                                    onClick={() => setSelectedProduct(item)} // Trigger Modal
                                >
                                    <div className={styles.imageBox}>
                                        <img src={item.img} alt={item.name} />
                                        <div className={styles.overlay}><p>Quick View</p></div>
                                    </div>
                                    <div className={styles.info}>
                                        <h4>{item.name}</h4>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {/* POP-UP MODAL (Sama seperti Our Highlight) */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className={styles.modalOverlay} onClick={() => setSelectedProduct(null)}>
                        <motion.div
                            className={styles.modalContent}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className={styles.closeBtn} onClick={() => setSelectedProduct(null)}>✕</button>

                            <div className={styles.modalGrid}>
                                <div className={styles.modalImage}>
                                    <img src={selectedProduct.img} alt={selectedProduct.name} />
                                </div>
                                <div className={styles.modalText}>
                                    <span>Special Selection</span>
                                    <h2>{selectedProduct.name}</h2>
                                    <p>{selectedProduct.desc}</p>
                                    <div className={styles.modalPrice}>{selectedProduct.price}</div>
                                    <button className={styles.orderBtn}>Add to Order</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <footer className={styles.menuFooter}>
                <p>© 2026 CULTURA COFFEE ROASTERS</p>
            </footer>
        </main>
    );
}