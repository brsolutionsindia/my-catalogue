'use client';

import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebaseConfig';
import Image from 'next/image';
import styles from '../page.module.css';
import { useSearchParams, useRouter } from 'next/navigation';
import SkuSummaryModal from '../components/SkuSummaryModal';
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
  const heading = typeFilter && typeMap[typeFilter] ? typeMap[typeFilter] : 'All Collection';

  const [goldRate, setGoldRate] = useState('Loading...');
  const [rateDate, setRateDate] = useState('');
  const [selectedSku, setSelectedSku] = useState<string | null>(null);
  const router = useRouter();

  const handleFilterClick = (type: string) => {
    router.push(`/catalog?type=${type}`);
  };

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
  }, [typeFilter, sortOrder]);

  return (
    <main
      className={styles.main}
      id="home"
      style={{ backgroundColor: '#fff', padding: '1rem', overflowX: 'hidden' }}
    >
      <nav
        className={`${styles.navbar} flex flex-wrap items-center justify-between gap-4`}
        style={{ borderRadius: '12px', padding: '1rem', backgroundColor: '#f9f9f9' }}
      >
        <div className={styles.branding}>
          <Image src="/logo.png" alt="Logo" width={100} height={50} className={styles.logoImg} />
        </div>

<ul className="flex flex-wrap gap-4 justify-center w-full sm:w-auto text-sm font-medium">
  <li><Link href="/#home" className="hover:underline">Home</Link></li>
  <li><Link href="/#catalogue" className="hover:underline">Catalog</Link></li>
  <li><Link href="/#testimonials" className="hover:underline">Testimonials</Link></li>
  <li><Link href="/#contact" className="hover:underline">Contact</Link></li>
</ul>

      </nav>

      {/* Offer Banner */}
      <section className={styles.offerBanner} style={{ borderRadius: '12px', backgroundColor: '#f3f3f3' }}>
<div className={styles.offerContent}>
    <span className={styles.goldLabel}>
	22kt Gold Rate ({rateDate}):
    </span>
    <span className={styles.goldRateText}>₹{goldRate}</span>
    <span className={styles.unitText}>/10gm</span>
    <a
      href="https://api.whatsapp.com/send?phone=919023130944&text=Hello%2C%20I%20am%20interested%20in%20learning%20more%20about%20your%20Digital%20Gold%20services.%20Please%20share%20the%20details."
      target="_blank"
      rel="noopener noreferrer"
      className={styles.bookGoldBtn}
    >
      Book
    </a>
  </div>
</section>





      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <aside style={{ width: '100%', maxWidth: '200px' }}>
          <div className={styles.sidebarSection}><strong>Filters</strong></div>
          <ul className={styles.sidebarList}>
            <li><button onClick={() => handleFilterClick('')}>All</button></li>
            <li><button onClick={() => handleFilterClick('ER')}>Earrings</button></li>
            <li><button onClick={() => handleFilterClick('RG')}>Rings</button></li>
            <li><button onClick={() => handleFilterClick('NK')}>Necklaces</button></li>
          </ul>
          <div className={styles.sidebarSection}><strong>Sort by</strong></div>
          <select
            id="sortSelect"
            name="sortSelect"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className={styles.sortDropdown}
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </aside>

        <section style={{ flexGrow: 1 }}>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">{heading}</h1>
          </div>

          <p className={styles.itemCount}>Showing {products.length} item(s)</p>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <section className={styles.catalogGrid}>
              {products.map((item) => (
                <div key={item.id} className={styles.catalogCard} onClick={() => setSelectedSku(item.id)}>
                  <Image src={item.image} alt={item.id} width={200} height={200} className={styles.catalogImage} />
                  <p className={styles.catalogPrice}>₹{typeof item.price === 'number' ? item.price.toLocaleString('en-IN') : item.price}</p>
                  <h3 className={styles.catalogCode}>Code: {item.id}</h3>
                </div>
              ))}
            </section>
          )}
        </section>
      </div>

      {selectedSku && <SkuSummaryModal skuId={selectedSku} onClose={() => setSelectedSku(null)} />}

      <footer className={styles.footer} id="contact">
        <p>📍 <a href="https://www.google.com/maps/place/Rawat+Jewellers/@30.7388481,76.7457771,17z" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Booth No 261, Sector 37-C, Chandigarh</a></p>
        <p>📞 <a href="https://api.whatsapp.com/send?phone=919023130944&text=Hi%2C%20I%20was%20checking%20out%20your%20website%20and%20would%20like%20to%20know%20more%20details." target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>+91-90231-30944</a> &nbsp;| 🕒 11:00 AM – 8:00 PM (Sunday Closed)</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
          <a href="https://maps.app.goo.gl/kPp2ZNTVFte1LHt66" target="_blank" rel="noopener noreferrer">
            <Image src="/gmaps-icon.png" alt="G-Maps" width={30} height={30} />
          </a>
          <a href="https://www.facebook.com/rawatgemsjewellers" target="_blank" rel="noopener noreferrer">
            <Image src="/facebook-icon.png" alt="Facebook" width={30} height={30} />
          </a>
          <a href="https://www.instagram.com/rawatgemsjewellers/" target="_blank" rel="noopener noreferrer">
            <Image src="/instagram-icon.png" alt="Instagram" width={30} height={30} />
          </a>
        </div>
      </footer>
    </main>
  );
}
