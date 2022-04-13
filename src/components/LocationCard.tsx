import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Hotel } from '../types';

const LocationCard: FC<Hotel> = (props) => {
  return (
    <div className="w-1/4 bg-white shadow-md rounded-md mr-4">
      <Link to={`/hotel-detail/${props.id}`}>
        <img
          src={props.image}
          className="w-full h-52 object-cover"
          alt="hotel"
        />
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl mr-auto font-bold">{props.name}</h3>
            <img src="/images/star.png" className="w-6 h-6" alt="star" />
            <span>{props.rating}</span>
          </div>
          <span className="font-semibold text-blue-700">
            ${props.price}/day
          </span>
          <h4 className="text-lg text-gray-500 font-semibold">
            {props.location}
          </h4>
        </div>
      </Link>
    </div>
  );
};

export default LocationCard;
