'use client'

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebaseConfig";
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

  return (
    <main style={{ fontFamily: 'Georgia, serif', padding: '30px', backgroundColor: '#fdfaf6' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
	<Image src="/logo.png" alt="Rawat Jewellers Logo" width={150} height={100} />
        <h1 style={{ fontSize: '2.5rem', marginTop: '10px' }}>Rawat Gems & Jewellers</h1>
        <p style={{ fontSize: '1.2rem', color: '#555' }}>Legacy of Purity and Trust</p>
      </header>

      <section style={{ maxWidth: '800px', margin: 'auto', textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>About Us</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#444' }}>
          With decades of experience, Rawat Gems & Jewellers offers a timeless collection of gold,
          diamond, kundan and polki jewellery. Known for authenticity and customer satisfaction,
          we bring you the finest in traditional craftsmanship and modern design.
        </p>
      </section>

      <section style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p style={{ fontSize: '1.2rem' }}>💰 <strong>Todays Rate:</strong> {goldRate}</p>
        <a href="https://api.whatsapp.com/send?phone=919023130944&text=Digital%20Gold" target="_blank" style={{ margin: '10px', display: 'inline-block', padding: '10px 20px', backgroundColor: '#ffcc80', color: '#000', borderRadius: '5px', textDecoration: 'none' }}>
          🏦 Book 22kt Digital Gold
        </a>
      </section>

      <section style={{ backgroundColor: '#fff5e6', padding: '30px', borderRadius: '10px', maxWidth: '800px', margin: 'auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Explore Our Collection</h2>
        <ul style={{ listStyle: 'none', padding: 0, fontSize: '1rem', lineHeight: '2' }}>
          <li>✨ Bridal Gold Sets</li>
          <li>💎 Certified Gemstones (Neelam, Pukhraj, Moonga, and more)</li>
          <li>🪔 Light-Weight Daily Wear</li>
          <li>🔶 Customized Name Pendants & Bracelets</li>
        </ul>
        <a href="/catalogue" style={{ marginTop: '20px', display: 'inline-block', padding: '10px 20px', backgroundColor: '#4caf50', color: '#fff', borderRadius: '5px', textDecoration: 'none' }}>
          🛍️ View Catalogue
        </a>
      </section>

      <section style={{ marginTop: '40px', textAlign: 'center' }}>
        <h2>🎥 Featured Videos</h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
          <iframe width="360" height="215" src="https://www.youtube.com/embed/l9BPespAnZA" title="Craft your Dream Jewellery with our Expert Craftmen" frameBorder="0" allowFullScreen></iframe>
          <iframe width="360" height="215" src="https://www.youtube.com/embed/9c8AfNQazzg" title="Personalized Name Pendants" frameBorder="0" allowFullScreen></iframe>
        </div>
      </section>

      <footer style={{ textAlign: 'center', marginTop: '60px', color: '#666' }}>
        <p>📍 Booth No 261, Sector 37-C, Chandigarh</p>
        <p>📞 +91-90231-30944</p>
        <p>🕒 Open 10:30 AM – 7:30 PM (Tuesday Closed)</p>
      </footer>

      <a
        href="https://wa.me/919023130944"
        target="_blank"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#25d366',
          color: 'white',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          textAlign: 'center',
          fontSize: '30px',
          lineHeight: '60px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          textDecoration: 'none',
          zIndex: 1000
        }}>
        💬
      </a>
    </main>
  );
}
