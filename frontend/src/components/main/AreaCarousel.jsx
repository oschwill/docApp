const AreaCarousel = () => {
  return (
    <article className="w-[92.5%]">
      <h2 className="text-[3rem] mb-6">Spezialgebiet 😷</h2>
      {/* CAROUSEL ??! */}
      <div className="grid grid-cols-three gap-6 w-full">
        <div className="flex flex-col bg-mainBGButtonColor p-8 rounded-3xl text-center ">
          <img src="/images/brainIcon.svg" alt="brain" className="h-[50px]" />
          <h2 className="text-[1.75rem] pt-8">Neurologie</h2>
          <p className="text-[1rem]">2000 Doktoren</p>
        </div>
        <div className="flex flex-col bg-mainBGButtonColor p-8 rounded-3xl text-center ">
          <img src="/images/genetics.svg" alt="brain" className="h-[50px]" />
          <h2 className="text-[1.75rem] pt-8">Genetik</h2>
          <p className="text-[1rem]">1500 Doktoren</p>
        </div>
        <div className="flex flex-col bg-mainBGButtonColor p-8 rounded-3xl text-center ">
          <img src="/images/dentist.svg" alt="brain" className="h-[50px]" />
          <h2 className="text-[1.75rem] pt-8">Zahnärzte</h2>
          <p className="text-[1rem]">500 Doktoren</p>
        </div>
      </div>
    </article>
  );
};

export default AreaCarousel;
