import { useEffect, useState } from 'react';
import { ArrayToString, getQueryParam } from '../utils/helperFuntions';
import { getData } from '../utils/fetchData';

const SearchDoctors = () => {
  const [docData, setDocData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const qParam = getQueryParam('area');

      if (qParam) {
        const response = await getData(`/api/v1/user/doctors?area=${qParam}`);

        setDocData(response.data.doctors);
        return;
      }

      const response = await getData('/api/v1/user/all-doctors');

      console.log(response.data);

      setDocData(response.data.doctors);
    }

    fetchData();
  }, []);
  const searchDocs = () => {
    //
  };

  return (
    <section className="flex flex-col gap-16 justify-center items-center mb-6 bg-gray-50">
      <article className="w-[92.5%]">
        <form onSubmit={searchDocs}>
          <div>
            <label htmlFor="name"></label>
            <div className="relative">
              <input
                type="text"
                name="name"
                id="name"
                className="border-2 w-full p-4 rounded-2xl bg-mainBGButtonColor text-[1.5rem]"
              />
            </div>
          </div>
        </form>
      </article>
      <article className="w-[92.5%] grid grid-cols-two gap-8 mb-24">
        {docData && docData.length > 0 ? (
          docData.map((item) => {
            return (
              <div
                className="flex flex-col items-center justify-center bg-white rounded-2xl p-8 gap-2 text-center"
                key={item._id}
              >
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
            );
          })
        ) : (
          <p>Keine Ärzte gefunden, bitte nutzen Sie die Suche!</p>
        )}
      </article>
    </section>
  );
};

export default SearchDoctors;
