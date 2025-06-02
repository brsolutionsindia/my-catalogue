import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ref, get } from 'firebase/database';
import { db } from '../../firebaseConfig';

type Props = {
  skuId: string;
  onClose: () => void;
};

type SkuData = {
  gross: number;
  net: number;
  goldPurety: number;
  grTotalPrice: number;
};

const SkuSummaryModal: React.FC<Props> = ({ skuId, onClose }) => {
  const [skuData, setSkuData] = useState<SkuData | null>(null);
  const [imageUrl, setImageUrl] = useState('/product-placeholder.jpg');

  useEffect(() => {
    if (skuId) {
      const fetchData = async () => {
        try {
          // Fetch SKU data
          const skuRef = ref(db, `Global SKU/SKU/${skuId}`);
          const skuSnap = await get(skuRef);
          if (skuSnap.exists()) {
            setSkuData(skuSnap.val());
          } else {
            setSkuData(null);
          }

          // Fetch image path
          const imgRef = ref(db, `Global SKU/Images/${skuId}/Primary`);
          const imgSnap = await get(imgRef);
          const url = imgSnap.val();
          if (url && typeof url === 'string' && url.startsWith('http')) {
            setImageUrl(url);
          }
        } catch (error) {
          console.error("Error fetching SKU summary:", error);
        }
      };

      fetchData();
    }
  }, [skuId]);

  if (!skuData) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative">
        <button className="absolute top-2 right-4 text-gray-600" onClick={onClose}>✕</button>
        <h2 className="text-xl font-bold mb-4">{skuId}</h2>

  <div className="mb-4 text-center">
    <Image
      src={imageUrl}
      alt="SKU"
      width={300}
      height={300}
      className="rounded border inline-block"
    />
  </div>

        <div className="space-y-2 text-sm">
          <div><strong>Gross Wt:</strong> {skuData.gross} gm</div>
          <div><strong>Net Wt:</strong> {skuData.net} gm ({skuData.goldPurety}kt)</div>
          <div><strong>Gross Price:</strong> ₹{skuData.grTotalPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default SkuSummaryModal;
