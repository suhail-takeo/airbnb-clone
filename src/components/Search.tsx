import { Fragment, useState, useEffect, FC } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

// const locations = [ // locations -> collection
//   { id: 1, name: 'Paris' }, // row -> document
//   { id: 2, name: 'New York' }, // row -> document
//   { id: 3, name: 'London' }, // row -> document
//   { id: 4, name: 'Bangkok' },
//   { id: 5, name: 'Dubai' },
//   { id: 6, name: 'Hong kong' },
//   { id: 7, name: 'Kathmandu' },
// ];

interface Location {
  id: number;
  name: string;
}

const Search: FC = () => {
  const [selected, setSelected] = useState<Location>({
    id: 0,
    name: 'Select Location',
  });
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // from the `locations` collection of the firestore database get me the ref.
    const locationsRef = collection(firestore, 'locations'); // we need locations data
    // get all the docs from `locationsRef`
    getDocs(locationsRef).then((data) => {
      // getting the data
      /*
        [{
          meta: ....,
          otherProps ....,
          data() {
            return actualData;
          }
        }, {
          meta: ...,
          otherProps: .....,
          data() {
            return actualData
          }
        }]

      */
      const locationsData = data.docs.map((doc) => doc.data());
      setLocations(locationsData as any);
    });
  }, []);

  const search = () => {
    navigate(`/hotels?city=${selected.name}`);
  };

  const filteredLocations =
    query === ''
      ? locations
      : locations.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        );

  return (
    <div className="w-72 flex items-center">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
            <Combobox.Input
              className="w-full border-none focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
              displayValue={(location: any) => location.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredLocations.length === 0 && query !== '' ? (
                <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredLocations.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${
                        active ? 'text-white bg-teal-600' : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>

      <button
        onClick={search}
        className="text-xs border-2 ml-2 text-white bg-blue-500 border-blue-500 rounded-md px-4 py-1.5"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
