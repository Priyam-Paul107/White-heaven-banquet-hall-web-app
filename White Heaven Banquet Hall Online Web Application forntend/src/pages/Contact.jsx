import React from 'react'
import FAQ from './FAQ'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <div
      className="h-min bg-cover bg-center bg-no-repeat -mt-40 mb-10"
      style={{ backgroundImage: "url('/banquets/cover.png')" }}
    >
    <section className="relative opacity-90 h-full py- bg-gray-50 sm:py-16 lg:py-24 py-12 ">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">Our Investors & Board of Directors</h2>
        </div>

        <div className="flex justify-center mt-20 gap-10 items-center  ">
            <div className='flex items-center flex-col'>
                <img className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter z-1 opacity-100" src="https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-1.png" alt="" />
                <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">Kapil Bell</p>
                <p className="mt-2 text-base font-normal text-gray-600 font-pj">founder, CEO, Creator</p>
            </div>

            <div className='flex items-center flex-col'>
                <img className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter" src="https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-2.png" alt="" />
                <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj"> Priyam Paul</p>
                <p className="mt-2 text-base font-normal text-gray-600 font-pj">Co founder, Chairman, Executive Director</p>
            </div>

            <div className='flex items-center flex-col'>
                <img className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter" src="https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-3.png" alt="" />
                <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">Manish Goswami</p>
                <p className="mt-2 text-base font-normal text-gray-600 font-pj">Co founder, mediator , Executive Director</p>
            </div>

       
        </div>

        <div className="mt-12 sm:mt-16">
            <svg className="w-auto h-4 mx-auto text-gray-300" viewBox="0 0 172 16" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 11 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 46 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 81 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 116 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 151 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 18 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 53 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 88 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 123 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 158 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 25 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 60 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 95 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 130 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 165 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 32 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 67 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 102 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 137 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 172 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 39 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 74 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 109 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 144 1)" />
            </svg>
        </div>

        <div className="max-w-3xl mx-auto mt-12 space-y-8 sm:space-y-0 sm:flex sm:items-center sm:justify-center sm:mt-16 sm:gap-x-16">
             <Link to="/" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#B39C1E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-crown h-16  text-accent transition-smooth group-hover:text-secondary"
          >
            <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path>
            <path d="M5 21h14"></path>
          </svg>
          <div>
            <span className="text-xl">White Heaven </span>
            <br />
            <div className="text-gray-300 text-center -mt-1">Banquet Hall</div>
          </div>
        </Link>

            <div>
                <img className="w-auto mx-auto h-20" src="react.png" alt="react" />
            </div>

        
        </div>
    </div>
</section>
</div>
  )
}

export default Contact