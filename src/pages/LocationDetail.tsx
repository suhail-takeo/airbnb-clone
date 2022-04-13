import Header from '../components/Header';

const detail = {
  id: '1',
  image:
    'https://villasnorthbali.com/wp-content/uploads/2020/01/5777fd4bfa26ea1a0e2250f55526ba19-1.jpg',
  name: 'Moratorium',
  location: 'Bali',
  rating: 4.5,
  price: 40,
};

const LocationDetail: React.FC = () => {
  return (
    <div>
      <Header />
      <img
        src={detail.image}
        alt="detail"
        className="w-full h-96 object-cover"
      />
      <div className="p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-5xl font-bold mr-auto">{detail.name}</h2>
          <img src="/images/star.png" className="w-6 h-6" alt="star" />
          <span className="font-bold">{detail.rating}</span>
        </div>
        <h3 className="text-3xl font-bold text-blue-700">
          ${detail.price}/day
        </h3>
        <h3 className="text-3xl font-semibold text-gray-500">
          {detail.location}
        </h3>
        <div className="mt-4">
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut
            fermentum turpis. Aenean in ex sem. Curabitur sit amet pretium
            lectus. Mauris pellentesque id quam mollis tempor. Quisque lobortis
            ornare neque, id ultrices mauris posuere quis. Nunc hendrerit eget
            magna sed mattis. Ut sit amet faucibus leo. Curabitur consequat leo
            et lacinia congue. Morbi non sem elit. Cras vel diam in nunc commodo
            hendrerit. Nam ut mi nunc. Aliquam erat volutpat. Fusce tincidunt
            molestie velit, iaculis interdum ante facilisis a.
          </p>
          <p className="mb-4">
            Proin tincidunt eu sem at lobortis. Curabitur at massa eu nibh
            ullamcorper hendrerit accumsan eu orci. Aliquam feugiat diam odio,
            id volutpat nunc bibendum vitae. Suspendisse lacinia eros at turpis
            vestibulum, ac aliquet enim condimentum. Nulla facilisi. Quisque
            mattis metus eget mi scelerisque accumsan. Donec sit amet ligula
            eros. Etiam nunc libero, rutrum a massa vitae, tempor tempus est. In
            hac habitasse platea dictumst.
          </p>
          <p className="mb-4">
            Proin tincidunt eu sem at lobortis. Curabitur at massa eu nibh
            ullamcorper hendrerit accumsan eu orci. Aliquam feugiat diam odio,
            id volutpat nunc bibendum vitae. Suspendisse lacinia eros at turpis
            vestibulum, ac aliquet enim condimentum. Nulla facilisi. Quisque
            mattis metus eget mi scelerisque accumsan. Donec sit amet ligula
            eros. Etiam nunc libero, rutrum a massa vitae, tempor tempus est. In
            hac habitasse platea dictumst.
          </p>
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

export default LocationDetail;
