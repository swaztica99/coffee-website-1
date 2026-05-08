"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navRange = isMobile ? [0, 0.02, 1] : [0, 0.05, 1];

  const moveLeft = useTransform(scrollYProgress, [0, 0.1], ["0%", "-100%"]);
  const moveRight = useTransform(scrollYProgress, [0, 0.1], ["0%", "100%"]);

  const navOpacity = useTransform(
    scrollYProgress,
    [0, 0.01, 1.0], // Input: Awal, Muncul Penuh, Akhir Halaman
    [0, 1, 1]       // Output: Transparan, Solid, Tetap Solid
  );
  const navYRange = isMobile ? [0, 0.02, 1] : [0, 0.005, 1];
  const navY = useTransform(
    scrollYProgress,
    [0, 0.1, 1.0],  // Input: Awal, Posisi Normal, Akhir Halaman
    [-50, 0, 0]      // Output: Di atas layar, Posisi Tengah, Tetap di Tengah
  );

  const burgerLine1 = { closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 7 } };
  const burgerLine2 = { closed: { opacity: 1 }, open: { opacity: 0 } };
  const burgerLine3 = { closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -7 } };

  const products = [
    {
      id: 1,
      name: "Choco Lava Latte",
      desc: "Perpaduan harmonis antara espresso robusta pilihan dengan cokelat leleh premium dan susu creamy. Memberikan sensasi manis yang mewah di setiap tegukan.",
      price: "IDR 35k",
      img: "/choco-lava.jpg"
    },
    {
      id: 2,
      name: "Oatmilk Espresso",
      desc: "Opsi sehat bagi pecinta kopi. Menggunakan susu gandum (oatmilk) organik yang dipadukan dengan double shot espresso untuk rasa yang nutty dan lembut.",
      price: "IDR 42k",
      img: "/choco-lava.jpg"
    },
    {
      id: 3,
      name: "Caramel Macchiato",
      desc: "Layer klasik yang terdiri dari vanilla syrup, susu segar, dan espresso yang disiram dengan saus karamel homemade yang gurih dan manis.",
      price: "IDR 38k",
      img: "/choco-lava.jpg"
    }
  ];

  const rooms = [
    {
      id: 1,
      name: "The Main Hall",
      img: "/mainhall.jpg",
      desc: "Area utama dengan langit-langit tinggi dan pencahayaan alami yang melimpah. Cocok untuk menikmati suasana riuh kafe yang estetik.",
      facilities: ["High-speed WiFi", "Power Outlets", "AC", "Sofa"]
    },
    {
      id: 2,
      name: "Outdoor Garden",
      img: "/outdoor.jpg",
      desc: "Sudut hijau terbuka untuk menghirup udara segar. Dikelilingi tanaman tropis yang memberikan ketenangan.",
      facilities: ["Smoking Area", "Pet Friendly", "Natural Breeze"]
    },
    {
      id: 3,
      name: "Coffee Lab",
      img: "/cozycorner.jpg",
      desc: "Ruang semi-private di mana Anda bisa melihat langsung proses penyeduhan manual oleh barista kami.",
      facilities: ["Brewing Workshop", "Bar Seating", "Barista Access"]
    },
    {
      id: 4,
      name: "Private Corner",
      img: "/private.jpg",
      desc: "Ruangan kedap suara yang didesain khusus untuk rapat penting atau fokus bekerja.",
      facilities: ["Silent Zone", "Meeting Table", "Dedicated Service"]
    },
    {
      id: 5,
      name: "Smoking Area",
      img: "/rooftop.jpg",
      desc: "Area semi-outdoor yang tetap estetik dan memiliki sirkulasi udara yang sangat baik.",
      facilities: ["Well Ventilated", "Ash Trays", "Stool Seating"]
    },
    {
      id: 6,
      name: "Brewing Station",
      img: "/brewingbar.jpg",
      desc: "Jantung dari Cultura. Tempat di mana mesin-mesin espresso terbaik kami bekerja.",
      facilities: ["Espresso Bar", "Industrial Design", "Aromatic Zone"]
    },
  ];

  const locations = [
    {
      id: 1,
      name: "Cultura - Downtown",
      address: "Jl. Senopati No.12, Kebayoran Baru, Jakarta Selatan",
      mapUrl: "https://maps.google.com/?q=Senopati+Jakarta",
      img: "/location1.jpg"
    },
    {
      id: 2,
      name: "Cultura - Riverside",
      address: "Kawasan Kota Tua, Jl. Kali Besar Timur No.4, Jakarta Barat",
      mapUrl: "https://maps.google.com/?q=Kota+Tua+Jakarta",
      img: "/location2.jpg"
    }
  ];

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  return (
    <main className={styles.main}>
      <motion.nav className={styles.navbar} style={{ opacity: navOpacity, y: navY, x: "-50%" }}>
        <div className={styles.logo}>CULTURA</div>
        {!isMobile && (
          <ul className={styles.navLinks}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/menu">Menu</Link></li>
            <li><a href="#story">About</a></li>
            <li><a href="https://wa.me/6281809811311" target="_blank">Contact</a></li>
          </ul>
        )}

        {isMobile && (
          <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
            <motion.div variants={burgerLine1} animate={isOpen ? "open" : "closed"} className={styles.line} />
            <motion.div variants={burgerLine2} animate={isOpen ? "open" : "closed"} className={styles.line} />
            <motion.div variants={burgerLine3} animate={isOpen ? "open" : "closed"} className={styles.line} />
          </div>
        )}
      </motion.nav>

      <div className={styles.heroSection}>
        <section className={styles.stickyWrapper}>
          <motion.img src="/left-hand-hero1.png" className={styles.hand} style={{ left: 0, x: moveLeft, translateY: "-50%" }} />
          <motion.img src="/right-hand-hero1.png" className={styles.hand} style={{ right: 0, x: moveRight, translateY: "-50%" }} />
        </section>
      </div>

      <section className={styles.contentSection}>
        <div className={styles.storyContainer}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className={styles.intro}>
            <h2>Cultura</h2>
            <p>Membangun koneksi dari seduhan kopi.</p>
          </motion.div>

          {/* OUR STORY */}
          <section id="story" className={styles.ourStorySection}>
            <div className={styles.storyGrid}>
              <motion.div className={styles.storyImage} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}>
                <img src="/location2.jpg" alt="Story" />
              </motion.div>
              <motion.div className={styles.storyText} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}>
                <h2>Our Story</h2>
                <p>Cultura hadir untuk menyatukan kualitas rasa dan kenyamanan ruang. Kami percaya setiap seduhan memiliki cerita uniknya sendiri.</p>
              </motion.div>
            </div>
          </section>

          {/* HIGHLIGHT MENU */}
          <div className={styles.highlightSection}>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className={styles.highlightTitle}>
              <span>Best Menu</span>Our Highlight
            </motion.h2>
            <div className={styles.highlightGrid}>
              {products.map((product, index) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className={styles.highlightCard} onClick={() => setSelectedProduct(product)}>
                  <div className={styles.productImage}><img src={product.img} alt={product.name} /></div>
                  <h3 className={styles.productName}>{product.name}</h3>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={styles.moreMenuWrapper}
            >
              <Link href="/menu" className={styles.moreMenuBtn}>
                More Menu <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </motion.div>
          </div>

          {/* GALLERY SECTION */}
          <section id="gallery" className={styles.gallerySection}>
            <div className={styles.galleryHeader}><span>Spaces</span><h2>Our Gallery</h2></div>
            <div className={styles.galleryGrid}>
              {rooms.map((room, index) => (
                <motion.div key={room.id} className={styles.galleryItem} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} onClick={() => setSelectedRoom(room)}>
                  <div className={styles.imageContainer}>
                    <img src={room.img} alt={room.name} />
                    <div className={styles.galleryOverlay}><p>Explore Space</p></div>
                  </div>
                  <h3 className={styles.roomName}>{room.name}</h3>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className={styles.locationSection}>
        <motion.div
          className={styles.locationHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span>Find Us</span>
          <h2>Our Branches</h2>
        </motion.div>

        <div className={styles.locationGrid}>
          {locations.map((loc, index) => (
            <motion.div
              key={loc.id}
              className={styles.locationCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              onClick={() => window.open(loc.mapUrl, "_blank")} // Direct ke Google Maps
            >
              <div className={styles.locationImage}>
                <img src={loc.img} alt={loc.name} />
                <div className={styles.mapOverlay}>
                  <p>Open in Google Maps</p>
                </div>
              </div>
              <div className={styles.locationInfo}>
                <h3>{loc.name}</h3>
                <p>{loc.address}</p>
                <div className={styles.viewMapBtn}>
                  Get Direction
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /></svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className={styles.footerSection}>
        <div className={styles.footerContainer}>
          {/* Garis Pembatas Atas - Tidak Full (Sejajar Konten) */}
          <div className={styles.footerLine}></div>

          <div className={styles.footerGrid}>
            {/* Kolom 1: Brand/Logo */}
            <div className={styles.footerBrand}>
              <h2 className={styles.footerLogo}>CULTURA</h2>
              <p className={styles.footerDesc}>
                Menyatukan seni seduhan kopi dengan ruang yang menghidupkan koneksi.
                Nikmati setiap detik jeda di Cultura.
              </p>
            </div>

            {/* Kolom 2: Navigasi Cepat */}
            <div className={styles.footerLinks}>
              <h4>Explore</h4>
              <ul>
                <li><Link href="/">Beranda</Link></li>
                <li><a href="#story">Our Story</a></li>
                <li><Link href="/menu">Menu</Link></li>
                <li><a href="#gallery">Gallery</a></li>
              </ul>
            </div>

            {/* Kolom 3: Media Sosial */}
            <div className={styles.footerLinks}>
              <h4>Social</h4>
              <ul>
                <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
                <li><a href="https://x.com" target="_blank">Twitter (X)</a></li>
                <li><a href="https://www.facebook.com" target="_blank">Facebook</a></li>
                <li><a href="https://www.tiktok.com" target="_blank">TikTok</a></li>
              </ul>
            </div>

            {/* Kolom 4: Alamat Singkat */}
            <div className={styles.footerLinks}>
              <h4>Contact</h4>
              <p className={styles.footerContactInfo}>hello@cultura.co</p>
              <p className={styles.footerContactInfo}>+62 21 1234 5678</p>
              <p className={styles.footerContactInfo}>Jakarta, Indonesia</p>
            </div>
          </div>

          {/* Copyright */}
          <div className={styles.copyrightArea}>
            <p>© 2026 CULTURA COFFEE ROASTERS. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ul className={styles.mobileNavLinks}>
              <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
              <li><Link href="/menu" onClick={() => setIsOpen(false)}>Menu</Link></li>
              <li><a href="#story" onClick={() => setIsOpen(false)}>About</a></li>
              <li><a href="https://wa.me/628123456789" target="_blank">Contact</a></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL MENU */}
      <AnimatePresence>
        {selectedProduct && (
          <div className={styles.modalOverlay} onClick={() => setSelectedProduct(null)}>
            <motion.div className={styles.modalContent} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeBtn} onClick={() => setSelectedProduct(null)}>✕</button>
              <div className={styles.modalGrid}>
                <div className={styles.modalImage}><img src={selectedProduct.img} alt={selectedProduct.name} /></div>
                <div className={styles.modalText}>
                  <span>Special Brew</span><h2>{selectedProduct.name}</h2><p>{selectedProduct.desc}</p>
                  <div className={styles.modalPrice}>{selectedProduct.price}</div><button className={styles.orderBtn}>Add to Order</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL GALLERY */}
      <AnimatePresence>
        {selectedRoom && (
          <div className={styles.modalOverlay} onClick={() => setSelectedRoom(null)}>
            <motion.div className={styles.modalContent} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeBtn} onClick={() => setSelectedRoom(null)}>✕</button>
              <div className={styles.modalGrid}>
                <div className={styles.modalImage}><img src={selectedRoom.img} alt={selectedRoom.name} /></div>
                <div className={styles.modalText}>
                  <span>Room Detail</span><h2>{selectedRoom.name}</h2><p>{selectedRoom.desc}</p>
                  <div className={styles.facilitiesTitle}>Facilities:</div>
                  <div className={styles.facilitiesGrid}>
                    {selectedRoom?.facilities?.map((f: string, i: number) => (
                      <div key={i} className={styles.facilityTag}>
                        <div className={styles.dot}></div>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}