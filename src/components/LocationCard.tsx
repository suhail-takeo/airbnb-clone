import { FC } from 'react';

const LocationCard: FC<any> = (props) => {
  return (
    <div className="w-1/4 bg-white shadow-md rounded-md mr-4">
      <a href="#">
        <img
          src="https://villasnorthbali.com/wp-content/uploads/2020/01/5777fd4bfa26ea1a0e2250f55526ba19-1.jpg"
          className=""
          alt="hotel"
        />
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl mr-auto font-bold">Moratorium</h3>
            <img src="/images/star.png" className="w-6 h-6" alt="star" />
            <span>4.5</span>
          </div>
          <span className="font-semibold text-blue-700">
            ${props.price}/day
          </span>
          <h4 className="text-lg text-gray-500 font-semibold">Bali</h4>
        </div>
      </a>
    </div>
  );
};

export default LocationCard;
