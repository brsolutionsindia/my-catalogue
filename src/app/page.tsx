
'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebaseConfig';
import Link from 'next/link';
import Image from 'next/image';


export default function Home() {
  const [goldRate, setGoldRate] = useState("Loading...");
  const [rateDate, setRateDate] = useState("");

  useEffect(() => {
    const rateRef = ref(db, 'Global SKU/Rates/Gold 22kt');
    const dateRef = ref(db, 'Global SKU/Rates/Date');

    onValue(rateRef, (snapshot) => {
      const rate = snapshot.val();
      setGoldRate(rate);
    });

    onValue(dateRef, (snapshot) => {
      const date = snapshot.val();
      setRateDate(date);
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
    link: '/catalog?type=NK',
  },
  {
    label: 'Personalised Pendants',
    image: 'https://img.youtube.com/vi/9c8AfNQazzg/hqdefault.jpg', // YouTube thumbnail
    link: 'https://youtu.be/9c8AfNQazzg', // Link to video
    isExternal: true, // to open in new tab
  },
  {
    label: 'Customized Jewellery',
    image: 'https://img.youtube.com/vi/l9BPespAnZA/hqdefault.jpg', // YouTube thumbnail
    link: 'https://youtu.be/l9BPespAnZA?si=ngBlVQglC_T2d7V4',
    isExternal: true, // to open in new tab
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
<div className={styles.heroText}>
      <h1 className={styles.heroHeading}>UNWRAP ELEGANCE</h1>
      <p className={styles.heroSubheading}>
        Discover Gold, Diamond and<br />Custom Jewellery
      </p>
      <a href="/catalogue" className={styles.ctaBtn}>🛍️ View Catalogue</a>
    </div>
  </div>
</section>

      {/* Offer Banner */}
      <section className={styles.offerBanner}>
<p className={styles.offerBanner}>
  22kt Gold Rate ({rateDate}): <strong>₹{goldRate}/10gm</strong> {' '}
  <a
    href="https://api.whatsapp.com/send?phone=919023130944&text=Digital%20Gold"
    target="_blank"
    rel="noopener noreferrer"
    className={styles.bookGoldBtn}
  >
    🏦Book 22kt Digital Gold
  </a>
</p>
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
  <Link href={item.link} target="_blank">
    <div className={styles.thumbnailWrapper}>
      <Image
        src={item.image}
        alt={item.label}
        width={200}
        height={200}
        style={{ objectFit: 'cover', borderRadius: '10px' }}
      />
      {item.link.includes('youtu') && (
        <span className={styles.playIcon}>▶️</span>
      )}
    </div>
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
