import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../firebase';
import { Hotel } from '../types';

type LocationDetailPageParams = {
  hotelId: string;
};

const LocationDetailPage: React.FC = () => {
  const { hotelId } = useParams<LocationDetailPageParams>();
  const [hotel, setHotel] = useState<Hotel>();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    const hotelsRef = collection(firestore, 'hotels');
    const filterHotelsQuery = query(hotelsRef, where('id', '==', hotelId));
    getDocs(filterHotelsQuery).then((data) => {
      const hotelsData = data.docs.map((doc) => doc.data());
      setHotel(hotelsData[0] as any);
      setFetching(false);
    });
  }, [hotelId]);

  if (fetching) {
    return <div>Fetching Hotel Details....</div>;
  }

  return (
    <div>
      <img
        src={hotel?.image}
        alt="detail"
        className="w-full h-96 object-cover"
      />
      <div className="p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-5xl font-bold mr-auto">{hotel?.name}</h2>
          <img src="/images/star.png" className="w-6 h-6" alt="star" />
          <span className="font-bold">{hotel?.rating}</span>
        </div>
        <h3 className="text-3xl font-bold text-blue-700">
          ${hotel?.price}/day
        </h3>
        <h3 className="text-3xl font-semibold text-gray-500">
          {hotel?.location}
        </h3>
        <div className="mt-4">
          <p className="mb-4">{hotel?.description}</p>
        </div>
        <div className="flex justify-end">
          <button className="text-lg border-2 bg-blue-700 text-white rounded-md px-8 py-4">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationDetailPage;
