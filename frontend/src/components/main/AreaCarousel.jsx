import { Link, useLoaderData } from 'react-router-dom';
import { getRandomPicture } from '../../utils/helperFuntions';

const AreaCarousel = () => {
  const data = useLoaderData();
  const { allAreas } = { ...data.data };

  return (
    <article className="w-[92.5%]">
      <h2 className="text-[3rem] mb-6">Spezialgebiete 😷</h2>
      {/* CAROUSEL ??! neeee... zu viel Arbeit */}
      <div className="grid grid-cols-two gap-6 w-full">
        {allAreas &&
          allAreas.map((area) => {
            return (
              <Link to={`/search-doctors?area=${area._id}`} key={area._id}>
                {' '}
                <div className="flex flex-col items-center bg-mainBGButtonColor p-8 rounded-3xl text-center ">
                  <img
                    src={getRandomPicture()}
                    alt="brain"
                    className="h-[50px] w-[50px] object-fill"
                  />
                  <h2 className="text-[1.75rem] pt-8">{area.areaName}</h2>
                  <p className="text-[1rem]">2000 Doktoren</p>
                </div>
              </Link>
            );
          })}
      </div>
    </article>
  );
};

export default AreaCarousel;
