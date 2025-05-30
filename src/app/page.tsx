
'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebaseConfig';
import Link from 'next/link';
import Image from 'next/image';
import './globals.css';

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
  {
    label: 'Personalized Silver Rakhi',
    image: 'https://img.youtube.com/vi/F57sLhe0M0A/hqdefault.jpg', // YouTube thumbnail
    link: 'https://www.youtube.com/shorts/F57sLhe0M0A',
    isExternal: true, // to open in new tab
  },
];


  return (
    <main className={styles.main} id="home">
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
  <li><a href="#home">Home</a></li>
  <li><a href="#catalogue">Catalogue</a></li>
  <li><a href="#testimonials">Testimonials</a></li>
  <li><a href="#contact">Contact</a></li>
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
      <a href="/catalog" className={styles.ctaBtn}>🛍️ View Catalogue</a>
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
<section className={styles.productGrid} id="catalogue">
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
<section className={styles.testimonials} id="testimonials">
  <h2>What Our Customers Say</h2>

  <div className={styles.googleReview}>
    <img src="/googlereviews-icon.png" alt="Google Reviews" width={28} height={28} />
    <span style={{ marginLeft: '8px' }}>
      <strong>4.7/5</strong> based on customer reviews
    </span>
    <a
      href="https://g.page/r/CRRKnpgHPMkCEB0/review"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        marginLeft: '12px',
        backgroundColor: '#4285F4',
        color: 'white',
        padding: '6px 12px',
        borderRadius: '6px',
        fontSize: '0.9rem',
        textDecoration: 'none'
      }}
    >
      Read & Rate Us ⭐
    </a>
  </div>

  <div className={styles.testimonialCards}>
    <blockquote>“Excellent experience. Fast service. Mr Rawat is very very reliable and he helped me choosing the right gem with right size. Thank you so much Mr Rawat. Will surely bother you again.” - K. Aggarwal</blockquote>
    <blockquote>“Awesome quality.. Rawat Jewellers customized the product beautifully even way better than the given design.. Thanks.. I had an excellent experience.. Highly recommended..” - S.Gill</blockquote>
  </div>
</section>


{/* Footer */}
<footer className={styles.footer} id="contact">
  <p>
    📍 <a 
         href="https://www.google.com/maps/place/Rawat+Jewellers/@30.7388481,76.7457771,17z/data=!3m1!4b1!4m6!3m5!1s0x390fedc27e94fddd:0x2c93c07989e4a14!8m2!3d30.7388435!4d76.748352!16s%2Fg%2F12q4vgb3d?entry=tts" 
         target="_blank" 
         rel="noopener noreferrer"
         style={{ color: 'inherit', textDecoration: 'underline' }}
       >
         Booth No 261, Sector 37-C, Chandigarh
       </a>
  </p>
  
  <p>
    📞 <a 
         href="https://wa.me/919023130944?text=Hello" 
         target="_blank" 
         rel="noopener noreferrer"
         style={{ color: 'inherit', textDecoration: 'underline' }}
       >
         +91-90231-30944
       </a> 
    &nbsp;| 🕒 11:00 AM – 8:00 PM (Sunday Closed)
  </p>

  <div style={{
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    marginTop: '1rem'
  }}>
    <a 
      href="https://www.google.com/maps/place/Rawat+Jewellers/@30.7388481,76.7457771,17z/data=!3m1!4b1!4m6!3m5!1s0x390fedc27e94fddd:0x2c93c07989e4a14!8m2!3d30.7388435!4d76.748352!16s%2Fg%2F12q4vgb3d?entry=tts" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <img src="/gmaps-icon.png" alt="G-Maps" width="30" height="30" />
    </a>
    <a 
      href="https://www.facebook.com/rawatgemsjewellers" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <img src="/facebook-icon.png" alt="Facebook" width="30" height="30" />
    </a>
    <a 
      href="https://www.instagram.com/rawatgemsjewellers/" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <img src="/instagram-icon.png" alt="Instagram" width="30" height="30" />
    </a>
  </div>
</footer>



      {/* WhatsApp Floating */}
<a href="https://wa.me/919023130944?text=Hello" className={styles.whatsappBtn} target="_blank" rel="noopener noreferrer">
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
