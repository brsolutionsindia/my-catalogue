'use client';

import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebaseConfig';
import Image from 'next/image';
import styles from './catalog.module.css'; // instead of ../page.module.css
import { useSearchParams } from 'next/navigation';

export default function CatalogPage() {
  type SkuData = {
    grTotalPrice?: number;
  };
  const [products, setProducts] = useState<{ id: string; price: number | string; image: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const typeFilter = searchParams.get('type');

  useEffect(() => {
    const skuRef = ref(db, 'Global SKU/SKU/');
    const imgRef = ref(db, 'Global SKU/Images/');

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
          setProducts(items);
        }

        setLoading(false);
      });
    });
  }, [typeFilter]);

  return (
<main className={styles.catalogMain}>
  <h1 className={styles.catalogTitle}>Our Collection</h1>
  {loading ? (
    <p>Loading...</p>
  ) : (
    <section className={styles.catalogGrid}>
      {products.map((item) => (
        <div key={item.id} className={styles.catalogCard}>
          <Image src={item.image} alt={item.id} width={200} height={200} className={styles.catalogImage} />
          <p className={styles.catalogPrice}>₹{item.price}</p>
          <h3 className={styles.catalogCode}>Code: {item.id}</h3>
        </div>
      ))}
    </section>
  )}
</main>
  );
}
