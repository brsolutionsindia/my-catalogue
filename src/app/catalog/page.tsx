'use client';

import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebaseConfig';
import Image from 'next/image';
import styles from '../page.module.css';
import { useSearchParams } from 'next/navigation';

export default function CatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const typeFilter = searchParams.get('type');

  useEffect(() => {
    const skuRef = ref(db, 'Global SKU/SKU/');
    const imgRef = ref(db, 'Global SKU/Images/');

    onValue(skuRef, (skuSnap) => {
      const skuData = skuSnap.val();

      onValue(imgRef, (imgSnap) => {
        const imgData = imgSnap.val();

        if (skuData) {
          const allItems = Object.entries(skuData);
          const filteredItems = allItems.filter(([key]) => {
            if (!typeFilter) return true;
            return key.includes(typeFilter);
          });

          const items = filteredItems.map(([key, value]: any) => {
            const imageUrl = imgData?.[key]?.Primary || '/product-placeholder.jpg';
            return {
              id: key,
              price: value?.grTotalPrice || 'N/A',
              image: imageUrl,
            };
          });

          setProducts(items);
        }

        setLoading(false);
      });
    });
  }, [typeFilter]);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Our Collection</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <section className={styles.productGrid}>
          {products.map((item) => (
            <div key={item.id} className={styles.productCard}>
              <Image src={item.image} alt={item.id} width={200} height={200} />
              <h3>{item.id}</h3>
              <p>Price: ₹{item.price}</p>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
