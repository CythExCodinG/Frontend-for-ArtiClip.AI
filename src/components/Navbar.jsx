import { useState } from "react";
import { navitems, features } from "../constants/index";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Navbar = () => {

  const [open, setOpen] = useState(false);
  useGSAP(() => {
    if (!open) return;
    gsap.from('.mobile-link', {
      opacity: 0,
      x: 100,
      duration: 0.5,
      ease: 'expo.inOut',
      stagger: 0.1,
      delay: 2
    });

  })
  return (

    <>
      <nav className="fixed bg-[#0b0b0b] text-white border-b border-white/10 top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between">

            <div className="text-2xl font-bold tracking-wide">
              Articlip<span className="text-blue-500">.Ai</span>
            </div>

            <div className="hidden md:flex space-x-8 text-lg">
              {navitems.map((item) => (
                <a
                  key={item.label}
                  href={item.link}
                  className="hover:text-blue-400 transition"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <button
              className="md:hidden"
              onClick={() => setOpen(!open)}
            >

              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden bg-[#0b0b0b] border-t border-white/10 flex w-full">
            <div className="nav-item w-full flex flex-col space-y-4 px-6 py-4 text-xl">
              {navitems.map((item) => (
                <a
                  key={item}
                  href={item.link}
                  className="hover:text-blue-400 transition mobile-link"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
export default Navbar