
'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebaseConfig';
import Link from 'next/link';
import Image from 'next/image';


export default function Home() {
  const [goldRate, setGoldRate] = useState("Loading...");

  useEffect(() => {
    const rateRef = ref(db, 'Global SKU/Rates/Gold 22kt');
    onValue(rateRef, (snapshot) => {
      const rate = snapshot.val();
      setGoldRate(rate);
    });
  }, []);


{/* Product Grid */}
const productItems = [
  {
    label: 'Earrings',
    image: '/earrings.png',
    link: '/catalog?type=ER',
  },
  {
    label: 'Rings',
    image: '/rings.png',
    link: '/catalog?type=RG',
  },
  {
    label: 'Necklace Sets',
    image: '/necklace.png',
    link: '/necklaces',
  },
  {
    label: 'Custom Name Pendants',
    image: '/pendants.png',
    link: '/pendants',
  },
  {
    label: 'Daily Wear',
    image: '/dailywear.png',
    link: '/dailywear',
  },
];


  return (
    <main className={styles.main}>
      {/* Navigation */}
<nav className={styles.navbar}>
  <div className={styles.hamburgerMenu}>
    <span></span>
    <span></span>
    <span></span>
  </div>

  <div className={styles.branding}>
    <Image src="/logo.png" alt="Logo" width={100} height={50} className={styles.logoImg} />
    <div className={styles.logoText}>Rawat Gems & Jewellers</div>
  </div>
        <ul className={styles.navLinks}>
          <li>Home</li>
          <li>Catalogue</li>
          <li>Testimonials</li>
          <li>Contact</li>
        </ul>
      </nav>

      {/* Hero */}
<section className={styles.hero}>
  <Image
  src="/hero-banner.png"
  alt="Jewellery Banner"
  width={1200}
  height={400}
  className={styles.heroImage}
/>
  <div className={styles.heroOverlay}>
    <a href="/catalogue" className={styles.ctaBtn}>🛍️ View Catalogue</a>
  </div>
</section>

      {/* Offer Banner */}
      <section className={styles.offerBanner}>
        Todays Rate: <strong>{goldRate}</strong> | 🏦 <a href="https://api.whatsapp.com/send?phone=919023130944&text=Digital%20Gold" target="_blank">Book 22kt Digital Gold</a>
      </section>

      {/* Product Filters */}
      <section className={styles.filterBar}>
        <label>Filter by: </label>
        <select>
          <option>All</option>
          <option>Gold</option>
          <option>Gemstones</option>
          <option>Bridal</option>
        </select>
      </section>

{/* Product Grid */}
<section className={styles.productGrid}>
  {productItems.map((item, index) => (
    <div key={index} className={styles.productCard}>
      <Link href={item.link}>
        <Image
          src={item.image}
          alt={item.label}
          width={200}
          height={200}
          style={{ cursor: 'pointer' }}
        />
      </Link>
      <h3>{item.label}</h3>
    </div>
  ))}
</section>



      {/* Testimonials */}
      <section className={styles.testimonials}>
        <h2>What Our Customers Say</h2>
        <div className={styles.testimonialCards}>
          <blockquote>“Absolutely loved the custom pendant!” - Priya S.</blockquote>
          <blockquote>“Neelam gemstone was exactly as promised. Highly recommend.” - Rahul G.</blockquote>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>📍 Booth No 261, Sector 37-C, Chandigarh</p>
        <p>📞 +91-90231-30944 | 🕒 11:00 AM – 8:00 PM (Sunday Closed)</p>
      </footer>

      {/* WhatsApp Floating */}
<a href="https://wa.me/919023130944" className={styles.whatsappBtn} target="_blank" rel="noopener noreferrer">
<Image
  src="/whatsapp-icon.png"
  alt="WhatsApp"
  width={100}
  height={60}
  style={{ objectFit: 'contain' }}
/>
</a>
</main>
  );
}
