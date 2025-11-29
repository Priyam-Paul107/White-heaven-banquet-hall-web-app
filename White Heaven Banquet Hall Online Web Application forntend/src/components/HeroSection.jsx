import React from "react";
import { Link} from "react-router-dom";
const HeroSection = () => {
  return (
<div
  className="h-screen bg-cover bg-center bg-no-repeat -mt-40"
  style={{ backgroundImage: "url('/banquets/cover.png')" }}
>
      <section className="relative bg-gray-50 opacity-90 h-full ">
        <div className="relative z-10 px-4 py-12 sm:py-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:py-20 xl:py-28 lg:grid lg:grid-cols-2">
          <div className="lg:pr-8">
            <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
              <h1 className="text-3xl text-primary font-bold sm:text-4xl lg:text-5xl">
                Create Unforgettable Moments
              </h1>
              <p className="mt-10 text-2xl  font-normal leading-7 text-gray-900">
                Experience luxury and elegance at White Heaven Banquet Hall
              </p>
              <svg
                className="w-auto h-4 mt-8 text-gray-300"
                viewBox="0 0 172 16"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                </svg>
              <div className="w-full mt-6 flex justify-center ">
        <div className="">
          <div className="w-10 flex ml-10 ">
            <img src="user.png" />
          </div>
          <div className="text-gray-300 m-3 ">User 2000+</div>
        </div>
          <div>
          <div className="w-10 ml-10">
            <img src="location.png" />
          </div>
          <div className="text-gray-300 m-3 p-3">Banquet 200+</div>
        </div>
          <div>
          <div className="w-10 ml-8 mt-2">
            <img src="cities.png" />
          </div>
          <div className="text-gray-300 m-2 p-3">Cities 50+</div>
        </div>
      </div>
              <div className="flex justify-center">
                <button
                  
                  className="m-5 my-12 border-1 border-primary rounded-xl py-3 opacity-100 px-4 bg-primary text-white cursor-pointer backdrop-blur-md "
                >
                    <Link to="/banquets">Explore Halls</Link>
                  
                </button>
              </div>
              </div>
              
          </div>
        </div>
        
        <div className="pb-8 lg:absolute lg:inset-0 lg:pb-0">
          <div className="flex flex-col items-center justify-center overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="flex justify-start w-full gap-6 pb-8 overflow-x-auto snap-x ">
              <div className="relative snap-start scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
                <div className="relative flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow w-60 md:w-80 group rounded-xl hover:shadow-lg hover:-translate-y-1">
                  <Link
                    to={""}
                    title=""
                    className="flex shrink-0 aspect-w-4 aspect-h-3 cursor-pointer"
                  >
                    <img
                      className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                      src="banquets/banquet.jpg"
                      alt="thumbnail-1"
                    />
                  </Link>
                  <div className="flex-1 px-4 py-5 sm:p-6">
                    <Link to={""} title="" className="cursor-pointer">
                      <p className="text-lg font-bold text-gray-900">
                        How to write content about your photographs
                      </p>
                      <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">
                        Step into a stunning space built for love, joy, and
                        togetherness. Your big day deserves a setting as special
                        as your story
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative snap-start scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
                <div className="relative flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow w-60 md:w-80 group rounded-xl hover:shadow-lg hover:-translate-y-1">
                  <Link
                    to={""}
                    title=""
                    className="cursor-pointer flex shrink-0 aspect-w-4 aspect-h-3"
                  >
                    <img
                      className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                      src="banquets/banquet2.png"
                      alt="thumbnail-2"
                    />
                  </Link>
                  <div className="flex-1 px-4 py-5 sm:p-6">
                    <Link to={""} title="" className="">
                      <p className="text-lg font-bold text-gray-900">
                        Celebrate your dream wedding in elegance and luxury at
                        our premium marriage hall
                      </p>
                      <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">
                        A perfect blend of luxury and comfort awaits your
                        celebrations. Create timeless memories in a hall made
                        for dream weddings
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative snap-start  shrink-0 first:pl-6 last:pr-6">
                <div className="relative flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow w-60 md:w-80 group rounded-xl hover:shadow-lg hover:-translate-y-1">
                  <Link
                    to={""}
                    title=""
                    className="flex shrink-0 aspect-w-4 aspect-h-3"
                  >
                    <img
                      className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                      src="banquets/banquet3.png"
                      alt="thumbnail-3"
                    />
                  </Link>
                  <div className="flex-1 px-4 py-5 sm:p-6">
                    <Link to={""} title="" className="">
                      <p className="text-lg font-bold text-gray-900">
                        The perfect venue for your perfect wedding
                      </p>
                      <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">
                        Celebrate your special day in a grand, beautifully
                        designed venue. Where every detail is crafted to make
                        your wedding truly unforgettable
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
