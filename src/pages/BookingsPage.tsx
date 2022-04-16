import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase';

const BookingsPage = () => {
  const auth = getAuth();
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    if (auth.currentUser?.email) {
      console.log(auth.currentUser);
      const bookingsRef = collection(firestore, 'bookings');
      const bookingsQuery = query(
        bookingsRef,
        where('user.id', '==', auth.currentUser?.uid),
      );
      getDocs(bookingsQuery).then((res) => {
        console.log(res);
        const bookingsData = res.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setBookings(bookingsData as any);
      });
    }
  }, [auth.currentUser]);

  return (
    <div className="px-16 py-4">
      <h2 className="text-4xl font-bold">My Bookings</h2>

      <div>
        {bookings.map((booking, index) => (
          <div
            key={booking.id}
            className="flex mt-4 bg-white shadow-md rounded-md border border-gray-200"
          >
            <img
              alt="Hotel"
              src={booking.hotel.image}
              className="w-2/5 rounded-tl-md rounded-bl-md"
            />

            <div className="ml-4">
              <h3 className="font-bold text-blue-500">#{index + 1}</h3>
              <h3 className="font-bold text-xl">{booking.hotel.name}</h3>
              <p className="text-blue-500">
                {new Date(booking.bookedOn.seconds * 1000).toDateString()}
              </p>
              <p className="font-semibold">{booking.days} days</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
