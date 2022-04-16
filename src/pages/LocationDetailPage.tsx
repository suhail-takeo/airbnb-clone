import { Fragment } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { Dialog, Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../firebase';
import { Hotel } from '../types';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

type LocationDetailPageParams = {
  hotelId: string;
};

/*
  - Booking Model
    id: auto generated
    user: {
      id
      name
    }
    days: 3
    hotel: {
      id
      name
      image
    }
    bookedOn
*/

const noOfDays = [1, 2, 3, 4, 5];

const LocationDetailPage: React.FC = () => {
  const { hotelId } = useParams<LocationDetailPageParams>();
  const [hotel, setHotel] = useState<Hotel>();
  const [isOpen, setIsOpen] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [selectedNoOfDays, setSelectedNoOfDays] = useState<number>();

  const navigate = useNavigate();

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

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const confirmBooking = async () => {
    try {
      const auth = getAuth();
      if (auth.currentUser?.email) {
        // process with the booking
        // bookings model will be generated on the fly
        const bookingsRef = collection(firestore, 'bookings');
        await addDoc(bookingsRef, {
          user: {
            id: auth.currentUser.uid,
            name: auth.currentUser.displayName,
          },
          days: selectedNoOfDays,
          hotel: {
            id: hotel?.id,
            name: hotel?.name,
            image: hotel?.image,
          },
          bookedOn: new Date(),
        });

        toast.success('Hotel booked successfully!');
        closeModal();
        setSelectedNoOfDays(undefined);
      } else {
        // redirect them to the login screen
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (fetching) {
    return <div>Fetching Hotel Details....</div>;
  }

  return (
    <div>
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-70" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900"
                  >
                    Booking Details
                  </Dialog.Title>
                  <div className="mt-2">
                    <h3 className="text-md font-medium text-blue-500">
                      Please Select No. of days
                    </h3>
                    <div className="flex justify-between mt-2">
                      {noOfDays.map((day) => (
                        <div
                          style={{
                            borderWidth: day === selectedNoOfDays ? 2 : 1,
                            borderColor:
                              day === selectedNoOfDays ? 'rgb(59 130 246)' : '',
                          }}
                          onClick={() => {
                            setSelectedNoOfDays(day);
                          }}
                          className="flex items-center justify-center font-bold bg-white shadow-lg rounded-lg border cursor-pointer h-16 w-16 hover:bg-gray-100"
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    {selectedNoOfDays !== undefined ? (
                      <div>
                        <h3 className="text-xl mt-4">
                          Total Amount:{' '}
                          <span className="text-blue-500 font-bold">
                            ${selectedNoOfDays! * hotel?.price!}
                          </span>
                        </h3>

                        <h3 className="text-xl mt-4">
                          Total Amount With VAT:{' '}
                          <span className="text-blue-500 font-bold">
                            $
                            {(selectedNoOfDays! * hotel?.price! * 1.15).toFixed(
                              2,
                            )}
                          </span>
                        </h3>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={confirmBooking}
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>

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
          <button
            onClick={openModal}
            className="text-lg border-2 bg-blue-700 text-white rounded-md px-8 py-4"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationDetailPage;
