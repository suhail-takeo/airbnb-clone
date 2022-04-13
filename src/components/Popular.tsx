import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { Hotel } from '../types';
import LocationCard from './LocationCard';

const Popular: FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const hotelsRef = collection(firestore, 'hotels');
    const sortedHotelsQuery = query(hotelsRef, orderBy('rating', 'desc'));
    getDocs(sortedHotelsQuery).then((data) => {
      const hotelsData = data.docs.map((doc) => doc.data());
      setHotels(hotelsData as any);
    });
  }, []);

  return (
    <div>
      <div className="p-4">
        <h4 className="font-bold text-2xl mb-4">Popular Locations</h4>
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

export default Popular;
