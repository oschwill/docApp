import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../utils/fetchData';
import LoadingElement from '../components/loading/LoadingElement';
import { ArrayToString, buildWorkingTimeString } from '../utils/helperFuntions';
import DisabledLink from '../components/button/DisabledButton';
import AddressBlock from '../components/profile/AddressBlock';

const Profile = () => {
  const { id } = useParams();
  const [docData, setDocData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!docData) {
        const response = await getData(`/api/v1/user/doctor/${id}`);

        setDocData(response.data.doctor);
      }
    };
    fetchData();
  }, [id, docData]);

  return (
    <section className="flex flex-col gap-16 justify-center items-center mb-6 bg-gray-50">
      <article className="w-[92.5%] h-screen">
        {!docData ? (
          <LoadingElement />
        ) : (
          <div className="flex flex-col gap-12 items-center justify-center mt-24">
            <img
              src={`${
                docData.role.profileImage
                  ? docData.role.profileImage.path
                  : '/images/DoctorImageExample.jpg'
              }`}
              alt="Doc image"
              className="h-[100px] rounded-full"
            />
            <p className="text-[2rem]">{docData.fullName}</p>
            <p className="text-[1.5rem]">{ArrayToString(docData.role.expertise)}</p>
            <h2 className="text-left"></h2>
            <p className="text-[2rem]">
              <span className="font-bold">Über Arzt:</span>{' '}
              {docData.role.description ? docData.role.description : 'Keine Angaben'}
            </p>
            <p className="text-[2rem]">
              <span className="font-bold">Arbeitszeiten: </span>
              {/* {docData.role.workingTime} */}
              {buildWorkingTimeString(docData.role.workingTime)}
            </p>
            <p className="text-[2rem]">
              <span className="font-bold">Telefon: </span>
              {docData.phone}
            </p>
            <AddressBlock docData={docData} />
            <DisabledLink isDisabled={true} to={`/doctor/${''}/new-appointment`}>
              <span className="text-white text-[1.5rem] w-full">Termin buchen</span>
            </DisabledLink>
          </div>
        )}
      </article>
    </section>
  );
};

export default Profile;
