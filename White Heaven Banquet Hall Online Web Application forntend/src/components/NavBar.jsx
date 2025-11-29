import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
  
const Navbar = ({customerData,adminData}) => {
 const adminName =localStorage.getItem("adminName")
 const adminEmail =localStorage.getItem("adminEmail")
 const adminId =localStorage.getItem("adminId")
 const adminIsActive =localStorage.getItem("adminIsActive")
 const adminJwtToken =localStorage.getItem("adminJwtToken")
 const adminProfileImage =localStorage.getItem("adminProfileImage");
 const customerName =localStorage.getItem("customerName")
 const customerEmail =localStorage.getItem("customerEmail")
 const customerId =localStorage.getItem("customerId")
 const customerIsActive =localStorage.getItem("customerIsActive")
 const customerJwtToken =localStorage.getItem("customerJwtToken")
 const customerProfileImage =localStorage.getItem("customerProfileImage")
 const {setAdmin,setCustomer,logout}=useContext(AppContext);
  const navigate = useNavigate();
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Our Banquets", path: "/banquets" },
    { name: "Why White Heaven", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];
  const ref = React.useRef(null);

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(ref.current.scrollTop > 10);
    };
    ref.current.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div ref={ref} className="h-88 md:h-64 -mb-20  ">
      <p className="w-10 h-[500px]"></p>
      <nav
        className={`fixed top-0 left-0 bg-white  w-full flex items-center shadow-xl justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
          isScrolled
            ? "bg-white/80 shadow-md text-black backdrop-blur-lg py-3 md:py-4"
            : "py-4 md:py-6"
        }`}
      >
        {/* Logo */}
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

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className={`group flex flex-col gap-0.5 ${
                isScrolled ? "text-[#ccc]" : "text-black"
              }`}
            >
              {link.name}
              <div
                className={`${
                  isScrolled ? "bg-gray-700" : "bg-white"
                } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
              />
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4 ">
          {customerIsActive|| adminIsActive? (
            <div className=" cursor-pointer relative group inline-block">
              <img
                className="rounded-full w-12 h-12 border-2 p-1 "
                src={
                  customerIsActive
                    ? customerProfileImage
                    : adminIsActive
                    ? adminProfileImage
                    : "default.png"
                }
                alt="customer PFP"
              />
              {/* drop down menu */}
              <div className=" absolute right-0 w-40 border-primary shadow-secondary hover:shadow-2xl bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-300 z-50">
                <ul className="py-0">
                  <li>
                    <Link
                      className="block px-6 hover:bg-gray-200 py-4 -mb-2 text-sm text-gray-700"
                      
                      onClick={()=>toast.success(`Welcome Back, ${customerIsActive?customerName.toUpperCase():adminName.toUpperCase()||"Admin"}`)}
                    >
{                    <span> <span className="text-center text-sm -m-2 ">Welcome Back,</span><div className=" text-primary -my-3 text-center"> <br />{ customerIsActive?customerName.toUpperCase():adminName.toUpperCase()}</div></span>
}                    </Link>
                  </li>
                  <li>
                    <Link
                      className=" hover:bg-gray-200 px-2 flex justify-start ml-2 py-2 text-sm text-gray-700"
                      to={
                        adminIsActive
                          ? "/Banquets"
                          : customerIsActive
                          ? "/customer/my-booking"
                          : "Manage"
                      }
                    >
                      {adminIsActive ? "Manage Banquet" : "My Booking"}
                    </Link>
                    </li>
                     <li>
                    <Link
                      className="block px-6 hover:bg-gray-200 py-2 text-sm text-gray-700"
                      to={customerIsActive?"/customer/"+customerId:null || adminIsActive?"/admin/"+adminId:null}
                    >
                      My DashBoard
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block px-6 text-center hover:bg-gray-200 py-2 text-sm text-gray-700"
                      to={"/"}
                      onClick={logout}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <button
                className={`cursor-pointer px-8 mx-2 py-2.5 rounded-full ml-1 transition-all duration-500 border-1 ${
                  isScrolled ? "text-black bg-white" : "bg-white text-black"
                }`}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
              <button
                className={`cursor-pointer pointer-  px-8 py-2.5 rounded-full  transition-all duration-500 ${
                  isScrolled
                    ? "text-white bg-secondary"
                    : "bg-primary text-white"
                }`}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                SignUp
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <svg
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {navLinks.map((link, i) => (
            <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </a>
          ))}

          <button className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
            Login
          </button>
          <button
            className={`pointer-  px-8 py-2.5 rounded-full  transition-all duration-500 ${
              isScrolled ? "text-white bg-secondary" : "bg-primary text-white"
            }`}
            onClick={() => {
              navigate("/signup");
            }}
          >
            SignUp
          </button>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
