'use client'

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebaseConfig";

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

<main style={{ fontFamily: 'Georgia, serif', backgroundColor: '#fdfaf6' }}>
  {/* Hero Banner */}
  <section
    style={{
      position: 'relative',
      height: '70vh',
      background: `url('/hero-banner.png') 0 0 / 100% 100% no-repeat`,
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    />

        <div style={{ position: 'relative', zIndex: 1, color: '#fff', textAlign: 'left', top: '75%', transform: 'translateY(-50%)' }}>
          <a href="/catalogue" style={{ marginTop: '20px', marginLeft: '90px', padding: '18px 80px', fontSize: '2.0rem', backgroundColor: '#cc8c23', color: '##fffdff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', display: 'inline-block', textDecoration: 'none' }}>SHOP NOW</a>
        </div>
      </section>

      {/* Gold Rate Bar */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: '#fff8e1', borderTop: '1px solid #ccc', padding: '8px 0', textAlign: 'center', fontWeight: 'bold', zIndex: 999 }}>
        💰 Today’s 22kt Gold Rate: {goldRate} /gm
      </div>

      {/* Collections Grid */}
      <section style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', margin: '40px auto', maxWidth: '1200px', textAlign: 'center' }}>
        {[{ title: 'Bridal Sets', image: '/bridal.jpg' }, { title: 'Gemstones', image: '/gemstone.jpg' }, { title: 'Daily Wear', image: '/daily.jpg' }, { title: 'Name Pendants', image: '/name.jpg' }].map((item, index) => (
          <div key={index} style={{ width: '240px' }}>
            <img src={item.image} alt={item.title} style={{ width: '100%', borderRadius: '10px' }} />
            <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{item.title}</p>
          </div>
        ))}
      </section>

      {/* Videos */}
      <section style={{ marginTop: '40px', textAlign: 'center' }}>
        <h2>🎥 Featured Videos</h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
          <iframe width="360" height="215" src="https://www.youtube.com/embed/l9BPespAnZA" title="Craft your Dream Jewellery with our Expert Craftmen" frameBorder="0" allowFullScreen></iframe>
          <iframe width="360" height="215" src="https://www.youtube.com/embed/9c8AfNQazzg" title="Personalized Name Pendants" frameBorder="0" allowFullScreen></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', marginTop: '60px', paddingBottom: '80px', color: '#666' }}>
        <p>📍 Booth No 261, Sector 37-C, Chandigarh</p>
        <p>📞 +91-90231-30944</p>
        <p>🕒 Open 10:30 AM – 7:30 PM (Tuesday Closed)</p>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919023130944"
        target="_blank"
        style={{
          position: 'fixed',
          bottom: '90px',
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
