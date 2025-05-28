export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <img src="/logo.png" alt="Rawat Jewellers Logo" width="180" />
        <h1>Rawat Gems & Jewellers</h1>
        <p>Legacy of Purity and Trust</p>
      </header>

      <section style={{ marginBottom: '30px' }}>
        <h2>About Us</h2>
        <p>
          With decades of experience, Rawat Gems & Jewellers offers fine gold,
          diamond, kundan and polki jewellery. Our legacy is rooted in
          traditional craftsmanship and contemporary designs.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Our Collection</h2>
        <p>
          Explore our exclusive range of bridal jewellery, gemstones, and
          customized gold pieces. Visit our store or browse our catalogue.
        </p>
      </section>

      <footer style={{ textAlign: 'center', marginTop: '40px' }}>
        <p>📍 Booth No 261, Sector 37-C, Chandigarh</p>
        <p>📞 +91-90231-30944</p>
      </footer>
    </main>
  );
}
