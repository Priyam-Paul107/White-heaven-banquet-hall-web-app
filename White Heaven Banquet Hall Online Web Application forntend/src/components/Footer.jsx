import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

      <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-slate-500 bg-white pt-10 -mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
          <div className="sm:col-span-2 lg:col-span-1">
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
                <div className="text-gray-300 text-center -mt-1">
                  Banquet Hall
                </div>
              </div>
            </Link>

            <p className="text-sm/7 mt-6">
              White Heven Banquet hall is a free no chargable banquent hall
              booking app, to bind with your love one .
            </p>
          </div>
          <div className="flex flex-col lg:items-center lg:justify-center">
            <div className="flex flex-col text-sm space-y-2.5">
              <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
              <Link className="hover:text-slate-600 transition" to="/faq">
                FAQ us
              </Link>
              <Link className="hover:text-slate-600 transition" to="/contact">
                Contact us
              </Link>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-gray-800 mb-5">
              Subscribe to our newsletter
            </h2>
            <div className="text-sm space-y-6 max-w-sm">
              <p>
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <form action="#" method="post" className="relative ">
                <div className="absolute transitiona-all duration-1000 opacity-30 inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
                <div className="relative space-y-4 sm:flex sm:space-y-0 sm:items-end">
                  <div className="flex-1">
                    <label htmlFor="" className="sr-only">
                      Email address
                    </label>
                    <div>
                      <input
                        required
                        type="email"
                        name=""
                        id=""
                        className="block w-full px-4 py-3 sm:py-3.5 text-base font-medium text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none sm:text-sm focus:ring-gray-900 focus:border-gray-900"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      toast.success("Your Response will be recorded")
                    }
                    type="button"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 sm:text-sm text-base sm:py-3.5 font-semibold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  >
                    Join Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <p className="py-4 text-center border-t mt-6 border-slate-200">
          Copyright 2025 © <Link to="#">White Heaven</Link> All Right Reserved.
        </p>
      </footer>
    </>
  );
}
