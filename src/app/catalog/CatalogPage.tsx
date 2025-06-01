'use client';

import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebaseConfig';
import Image from 'next/image';
import styles from '../page.module.css';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function CatalogPage() {
  type SkuData = {
    grTotalPrice?: number;
  };
  const [products, setProducts] = useState<{ id: string; price: number | string; image: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const searchParams = useSearchParams();
  const typeFilter = searchParams.get('type');
  const typeMap: { [key: string]: string } = {
     ER: 'Earrings Collection',
     RG: 'Rings Collection',
     NK: 'Necklace Collection',
  };
  const heading = typeFilter && typeMap[typeFilter] ? typeMap[typeFilter] : 'Our Collection';

const [goldRate, setGoldRate] = useState("Loading...");
const [rateDate, setRateDate] = useState("");

  useEffect(() => {
    const skuRef = ref(db, 'Global SKU/SKU/');
    const imgRef = ref(db, 'Global SKU/Images/');

  const rateRef = ref(db, 'Global SKU/Rates/Gold 22kt');
  const dateRef = ref(db, 'Global SKU/Rates/Date');

  onValue(rateRef, (snapshot) => setGoldRate(snapshot.val()));
  onValue(dateRef, (snapshot) => setRateDate(snapshot.val()));

    onValue(skuRef, (skuSnap) => {
      const skuData = skuSnap.val();

      onValue(imgRef, async (imgSnap) => {
        const imgData = imgSnap.val();

        if (skuData) {
          const allItems = Object.entries(skuData) as [string, SkuData][];
          const filteredItems = allItems.filter(([key]) => {
            if (!typeFilter) return true;
            return key.includes(typeFilter);
          });

          const items = await Promise.all(
            filteredItems.map(async ([key, value]) => {
              const imageUrl = imgData?.[key]?.Primary || '/product-placeholder.jpg';
              return {
                id: key,
                price: value?.grTotalPrice || 'N/A',
                image: imageUrl,
              };
            })
          );

          items.sort((a, b) => {
            const priceA = typeof a.price === 'number' ? a.price : 0;
            const priceB = typeof b.price === 'number' ? b.price : 0;
            return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
          });

          setProducts(items);
        }

        setLoading(false);
      });
    });
  }, [typeFilter]);

  useEffect(() => {
    if (products.length > 0) {
      const sorted = [...products].sort((a, b) => {
        const priceA = typeof a.price === 'number' ? a.price : 0;
        const priceB = typeof b.price === 'number' ? b.price : 0;
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
      });
      setProducts(sorted);
    }
  }, [sortOrder]);

  return (
    <main className={styles.main}>
      <nav className={styles.navbar}>
        <div className={styles.hamburgerMenu}>
          <span></span><span></span><span></span>
        </div>
        <div className={styles.branding}>
          <Image src="/logo.png" alt="Logo" width={100} height={50} className={styles.logoImg} />
          <div className={styles.logoText}>Rawat Gems & Jewellers</div>
        </div>
        <ul className={styles.navLinks}>
          <li><a href="/">Home</a></li>
          <li><a href="/#catalogue">Catalogue</a></li>
          <li><a href="/#testimonials">Testimonials</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
      </nav>

<section className={styles.offerBanner}>
  <p>
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


      <h1 className={styles.catalogTitle}>{heading}</h1>
      <section className={styles.filterBar}>
        <label htmlFor="filterSelect">Filter by: </label>
        <select id="filterSelect" name="filterSelect">
          <option value="all">All</option>
          <option value="gold">Gold</option>
          <option value="gemstones">Gemstones</option>
          <option value="bridal">Bridal</option>
        </select>
        <label htmlFor="sortSelect" style={{ marginLeft: '2rem' }}>Sort by: </label>
        <select
          id="sortSelect"
          name="sortSelect"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </section>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <section className={styles.catalogGrid}>
          {products.map((item) => (
            <div key={item.id} className={styles.catalogCard}>
              <Image src={item.image} alt={item.id} width={200} height={200} className={styles.catalogImage} />
              <p className={styles.catalogPrice}>₹{typeof item.price === 'number' ? item.price.toLocaleString('en-IN') : item.price}</p>
              <h3 className={styles.catalogCode}>Code: {item.id}</h3>
            </div>
          ))}
        </section>
      )}

      <footer className={styles.footer} id="contact">
        <p>📍 <a href="https://www.google.com/maps/place/Rawat+Jewellers/@30.7388481,76.7457771,17z" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Booth No 261, Sector 37-C, Chandigarh</a></p>
        <p>📞 <a href="https://wa.me/919023130944?text=Hello" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>+91-90231-30944</a> &nbsp;| 🕒 11:00 AM – 8:00 PM (Sunday Closed)</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
          <a href="https://www.google.com/maps/place/Rawat+Jewellers" target="_blank" rel="noopener noreferrer">
            <img src="/gmaps-icon.png" alt="G-Maps" width="30" height="30" />
          </a>
          <a href="https://www.facebook.com/rawatgemsjewellers" target="_blank" rel="noopener noreferrer">
            <img src="/facebook-icon.png" alt="Facebook" width="30" height="30" />
          </a>
          <a href="https://www.instagram.com/rawatgemsjewellers/" target="_blank" rel="noopener noreferrer">
            <img src="/instagram-icon.png" alt="Instagram" width="30" height="30" />
          </a>
        </div>
      </footer>
    </main>
  );
}
