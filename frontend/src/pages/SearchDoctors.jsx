import { useEffect, useRef, useState } from 'react';
import { ArrayToString, getQueryParam, queryBuilder } from '../utils/helperFuntions';
import { getData } from '../utils/fetchData';
import LoadingElement from '../components/loading/LoadingElement';
import { Link } from 'react-router-dom';

const SearchDoctors = () => {
  const [docData, setDocData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef();

  useEffect(() => {
    async function fetchData() {
      const qParam = getQueryParam('area');
      setIsLoading(true);

      if (qParam) {
        const response = await getData(`/api/v1/user/doctors?area=${qParam}`);

        setDocData(response.data.doctors);
        setIsLoading(false);
        return;
      }

      const response = await getData('/api/v1/user/all-doctors');
      setDocData(response.data.doctors);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const searchDocs = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const area = getQueryParam('area');
    const name = nameRef.current && nameRef.current.value;

    if (!name && !area) {
      const response = await getData('/api/v1/user/all-doctors');
      setDocData(response.data.doctors);
      setIsLoading(false);
      return;
    }

    if (!name) {
      const response = await getData(`/api/v1/user/doctors?area=${area}`);

      setDocData(response.data.doctors);
      setIsLoading(false);
      return;
    }

    const params = queryBuilder({ area, name });

    const response = await getData(`/api/v1/user/doctors${params}`);

    setDocData(response.data.doctors);
    setIsLoading(false);
    return;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchDocs(e);
    }
  };

  return (
    <section className="flex flex-col gap-16 justify-center items-center mb-6 bg-gray-50">
      <article className="w-[92.5%]">
        <form>
          <div>
            <label htmlFor="name"></label>
            <div className="relative">
              <input
                ref={nameRef}
                type="text"
                name="name"
                id="name"
                className="border-2 w-full p-4 rounded-2xl bg-mainBGButtonColor text-[1.5rem] pl-[10%]"
                onKeyDown={handleKeyDown}
              />
              <img
                src="/images/search_icon.jpg"
                alt="search"
                className="h-[40px] absolute top-1 left-[1%]"
                onClick={searchDocs}
              />
            </div>
          </div>
        </form>
      </article>
      <article className="w-[92.5%] grid grid-cols-two gap-8 mb-24">
        {!isLoading ? (
          docData && docData.length > 0 ? (
            docData.map((item) => (
              <Link to={`/doctor/${item._id}`} key={item._id} className="hover:opacity-75">
                <div className="flex flex-col items-center justify-center bg-white rounded-2xl p-8 gap-2 text-center">
                  <div className="flex justify-center">
                    <img
                      src={
                        item.doctorData !== undefined && item.doctorData[0].profileImage?.path
                          ? item.doctorData[0].profileImage.path
                          : item.role.profileImage !== undefined && item.role?.profileImage.path
                          ? item.role.profileImage.path
                          : '/images/DoctorImageExample.jpg'
                      }
                      alt="profileImage"
                      className="h-[100px] rounded-full object-cover"
                    />
                  </div>
                  <h2 className="text-[2rem]">{item.fullName}</h2>

                  <p className="text-[1.5rem]">
                    {ArrayToString(item.expertiseData ? item.expertiseData : item.role.expertise)}
                  </p>
                  <p className="text-[1.5rem]">Bewertung folgt</p>
                </div>
              </Link>
            ))
          ) : (
            <p>Keine Ärzte gefunden, bitte nutzen Sie die Suche!</p>
          )
        ) : (
          <LoadingElement />
        )}
      </article>
    </section>
  );
};

export default SearchDoctors;
