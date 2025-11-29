import React, { useState } from "react";
import toast from "react-hot-toast";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How to create an account?",
      answer:
        "To create an account, go to the Signup page and fill in your name, email, mobile number, and password to register instantly.",
    },
    {
      question: "How can I make payment using Paypal?",
      answer:
        "You can pay easily through PayPal by selecting the PayPal option during checkout and completing the secure payment process.",
    },
    {
      question: "Can I cancel my plan?",
      answer:
        "Yes, you can cancel your plan anytime through your dashboard or by contacting support.",
    },
    {
      question: "How can I reach support?",
      answer:
        "You can reach our support team via email, phone, or the contact form available on the website.",
    },
  ];

  return (
    <div
      className="h-min bg-cover bg-center bg-no-repeat -mt-40 mb-10"
      style={{ backgroundImage: "url('/banquets/cover.png')" }}
    >
      <section className="relative opacity-90 h-full py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
              Find quick answers to the most common questions.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50"
              >
                {/* FAQ Header */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                >
                  <span className="flex text-lg font-semibold text-black">
                    {faq.question}
                  </span>

                  {/* Arrow icon rotates */}
                  <svg
                    className={`w-6 h-6 text-gray-400 transform transition-transform ${
                      openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* FAQ Content */}
                {openIndex === index && (
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 text-base mt-9">
            Didn’t find the answer you are looking for?{" "}
            <a onClick={()=>toast.success("Your Response will be recorded")}

              href="#"
              className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline"
            >
              Contact our support
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
