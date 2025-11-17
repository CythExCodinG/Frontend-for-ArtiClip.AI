import React from 'react'
import PillNav from './PillNav/PillNav';
import logo from '../assets/main-logo.png';

const Navbar = () => {
  return (
    <>
      <PillNav
        logo={logo}
        logoAlt="Company Logo"
        items={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Services', href: '/services' },
          { label: 'Contact', href: '/contact' }
        ]}
        activeHref="/"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000ff"
        pillColor="#e6e0e0ff"
        hoveredPillTextColor="#f1ededff"
        pillTextColor="#000000ff"
      />
    </>
  )
}

export default Navbar