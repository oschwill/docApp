import { Link } from 'react-router-dom';
import AreaCarousel from '../components/main/AreaCarousel';
import MainHeader from '../components/main/MainHeader';

const Home = () => {
  return (
    <section className="flex flex-col gap-16 justify-center items-center mb-6">
      <MainHeader />
      <article className="w-[92.5%]">
        <div className="flex bg-mainBGButtonColor p-6 rounded-xl w-full ">
          <div className="w-full">
            <h2 className="text-[2.5rem] font-bold">STI Probleme?</h2>
            <p className="text-[1.5rem]">Finden Sie hier geeignete Spezialisten</p>
          </div>
          <div className="relative">
            <div className="absolute top-[5px] z-10 right-[5px] bg-secondFontColor h-20 w-20 flex justify-center items-center rounded-3xl">
              <Link to="search-doctors">
                <img src="/images/arrowRight.png" alt="right Arrow" className="h-9" />
              </Link>
            </div>
          </div>
        </div>
      </article>
      <AreaCarousel />
    </section>
  );
};

export default Home;
