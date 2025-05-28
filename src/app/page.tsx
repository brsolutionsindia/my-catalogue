export default function Home() {
  return (
    <main style={{ fontFamily: 'Georgia, serif', padding: '30px', backgroundColor: '#fdfaf6' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <img src="/logo.png" alt="Rawat Jewellers Logo" width="150" />
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

      <section style={{ backgroundColor: '#fff5e6', padding: '30px', borderRadius: '10px', maxWidth: '800px', margin: 'auto' }}>
        <h2 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '20px' }}>Explore Our Collection</h2>
        <ul style={{ listStyle: 'none', padding: 0, fontSize: '1rem', lineHeight: '2' }}>
          <li>✨ Bridal Gold Sets</li>
          <li>💎 Certified Gemstones (Neelam, Pukhraj, Moonga, and more)</li>
          <li>🪔 Light-Weight Daily Wear</li>
          <li>🔶 Customized Name Pendants & Bracelets</li>
        </ul>
      </section>

      <footer style={{ textAlign: 'center', marginTop: '60px', color: '#666' }}>
        <p>📍 Booth No 261, Sector 37-C, Chandigarh</p>
        <p>📞 +91-90231-30944</p>
        <p>🕒 Open 10:30 AM – 7:30 PM (Tuesday Closed)</p>
      </footer>
    </main>
  );
}
