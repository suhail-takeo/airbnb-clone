import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { Hotel } from '../types';
import LocationCard from './LocationCard';

const popularLocations = [
  {
    id: '1',
    image:
      'https://villasnorthbali.com/wp-content/uploads/2020/01/5777fd4bfa26ea1a0e2250f55526ba19-1.jpg',
    name: 'Moratorium',
    location: 'Bali',
    rating: 4.5,
    price: 40,
  },
  {
    id: '2',
    image:
      'https://media.cntraveler.com/photos/612401b4c9e624849c7a44b1/1:1/w_2580%2Cc_limit/ModernHaus%2520SoHo%2C%2520New%2520York_Lower-Terrace---Veranda.jpg',
    name: 'ModernHaus Soho',
    location: 'New York',
    rating: 4.8,
    price: 50,
  },
  {
    id: '3',
    image:
      'https://robbreport.com/wp-content/uploads/2021/12/BH-Paris-Penthouse-Master-Bedroom-Day.jpg?w=1000',
    name: 'Bulgari Hotel',
    location: 'Paris',
    rating: 4.9,
    price: 45,
  },
  {
    id: '4',
    image:
      'https://media-cdn.tripadvisor.com/media/photo-s/12/d7/ca/34/rooftop-pool.jpg',
    name: 'Akara Hotel',
    location: 'Bangkok',
    rating: 4.4,
    price: 38,
  },
  {
    id: '5',
    image: 'https://i.insider.com/5c1d4f98b3c21d4965261722?width=700',
    name: 'Burj Al Arab',
    location: 'Dubai',
    rating: 4.9,
    price: 46,
  },
];

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
