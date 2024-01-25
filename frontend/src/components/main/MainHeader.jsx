const MainHeader = () => {
  return (
    <article className="w-[92.5%] bg-homeColor rounded-[25px] shadow-2xl shadow-blue-300">
      <div className=" w-full h-[40vh] ">
        <h1 className="text-secondFontColor text-[4rem] font-bold pl-8 pt-12">
          Covid-19 Gesundheitspflege
        </h1>
        <p className="text-secondFontColor pl-8 text-[2rem] pt-8 w-full">
          Buchen Sie Ihre nächsten Online-Termine
        </p>
      </div>
      <div className="w-full flex justify-center">
        <img src="/images/HomeHeaderImage.png" alt="main intro" />
      </div>
    </article>
  );
};

export default MainHeader;
