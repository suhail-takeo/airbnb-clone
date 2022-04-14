import { collection, getDocs, query, where } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import LocationCard from '../components/LocationCard';
import { firestore } from '../firebase';
import { Hotel } from '../types';

const HotelsPage: FC = () => {
  const [params] = useSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const hotelsRef = collection(firestore, 'hotels');
    const q = query(hotelsRef, where('location', '==', params.get('city')));
    getDocs(q).then((data) => {
      const hotelsData = data.docs.map((doc) => doc.data());
      setHotels(hotelsData as any);
    });
  }, []);

  if (hotels.length < 1) {
    return <h4 className="font-bold text-2xl mb-4">No Hotels Found!!</h4>;
  }

  return (
    <div>
      <div className="p-4">
        <h4 className="font-bold text-2xl mb-4">All Hotels</h4>
        <div className="flex">
          {hotels.map((hotel) => {
            return (
              <LocationCard
                key={hotel.id}
                id={hotel.id}
                image={hotel.image}
                location={hotel.location}
                name={hotel.name}
                price={hotel.price}
                rating={hotel.rating}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;
