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
    }
  ];
  const videoItems = [
    {
      label: 'Personalised Pendants',
      image: 'https://img.youtube.com/vi/9c8AfNQazzg/hqdefault.jpg',
      link: 'https://youtu.be/9c8AfNQazzg',
      isExternal: true,
    },
    {
      label: 'Customized Jewellery',
      image: 'https://img.youtube.com/vi/l9BPespAnZA/hqdefault.jpg',
      link: 'https://youtu.be/l9BPespAnZA?si=ngBlVQglC_T2d7V4',
      isExternal: true,
    },
    {
      label: 'Personalized Silver Rakhi',
      image: 'https://img.youtube.com/vi/F57sLhe0M0A/hqdefault.jpg',
      link: 'https://www.youtube.com/shorts/F57sLhe0M0A',
      isExternal: true,
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

      {/* Offer Banner */}
      <section className={styles.offerBanner}>
        <p className={styles.offerBanner}>
	  22kt Gold Rate ({rateDate}): <span className={styles.goldRateText}>₹{goldRate}</span>/10gm{' '}
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

      {/* Hero */}
      <section className={styles.hero}>
        <Image
          src="/hero-banner.png"
          alt="Jewellery Banner"
          width={1200}
          height={400}
          className={styles.heroImage}
        />
      </section>

<section id="catalogue" className={styles.catalogSection}>
  <div className={styles.catalogContainer}>
    {/* Left Block - Bar Heading */}
    <div className={styles.catalogBanner}>
      <Image src="/products-banner.png" alt="Product Banner" width={500} height={350} className={styles.bannerImage} />
    </div>

    {/* Right Block - Horizontal Scrollable Grid */}
    <div className={styles.catalogSlider}>
      <div className={styles.horizontalScroll}>
        {productItems.map((item, index) => (
          <div key={index} className={styles.productCardHorizontal}>
            <Link href={item.link}>
              <Image
                src={item.image}
                alt={item.label}
                width={160}
                height={160}
                className={styles.productImg}
              />
            </Link>
            <h3 className={styles.productLabel}>{item.label}</h3>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* Testimonials */}
      <section className={styles.testimonials} id="testimonials">
	<h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '1rem' }}>What Our Customers Say</h2>
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
              backgroundColor: '#cc8c23',
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



{/* Video Grid - YouTube Section */}
<section className={styles.videoSection}>
  <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '1rem', color: '#cc8c23' }}>Videos</h2>
  <div className={styles.videoGrid}>
    {videoItems.map((item, index) => (
      <div key={index} className={styles.productCard}>
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          <div className={styles.thumbnailWrapper}>
            <Image
              src={item.image}
              alt={item.label}
              width={200}
              height={200}
              style={{ objectFit: 'cover', borderRadius: '10px' }}
            />
            <span className={styles.playIcon}>▶️</span>
          </div>
        </a>
        <h3>{item.label}</h3>
      </div>
    ))}
  </div>
</section>

      {/* Footer */}
      <footer className={styles.footer} id="contact">
        <p>
          📍 <a 
               href="https://www.google.com/maps/place/Rawat+Jewellers/@30.7388481,76.7457771,17z/data=!3m1!4b1!4m6!3m5!1s0x390fedc27e94fddd:0x2c93c07989e4a14!8m2!3d30.7388435!4d76.748352!16s%2Fg%2F12q4vgb3d?entry=tts" 
               target="_blank" 
               rel="noopener noreferrer"
               style={{ color: 'inherit' }}
             >
               Booth No 261, Sector 37-C, Chandigarh
             </a>
        </p>
        
        <p>
          📞 <a 
               href="https://wa.me/919023130944?text=Hello" 
               target="_blank" 
               rel="noopener noreferrer"
               style={{ color: 'inherit' }}
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
