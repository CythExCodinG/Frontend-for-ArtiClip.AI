import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Navbar = ({ navItems }) => {

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

            <div className="hidden md:flex space-x-8 text-lg items-center">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  onClick={item.onClick}
                  className={`hover:text-blue-400 transition cursor-pointer ${item.className || ""}`}
                >
                  {item.label}
                </a>
              ))}
              {/* User Display */}
              {(() => {
                const user = JSON.parse(localStorage.getItem("user"));
                return user ? (
                  <div className="px-4 py-1 rounded-full bg-blue-600/20 border border-blue-500/50 text-blue-400 text-sm font-semibold">
                    👋 Hi, {user.firstname || user.username}
                  </div>
                ) : null;
              })()}
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
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className={`hover:text-blue-400 transition mobile-link cursor-pointer ${item.className || ""}`}
                  onClick={() => {
                    setOpen(false);
                    if (item.onClick) item.onClick();
                  }}
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