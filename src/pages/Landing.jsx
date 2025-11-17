import React from 'react'
import Navbar from '../components/Navbar'
import GradientText from '../components/GradientText/GradientText'
const Landing = () => {
  const isMobile = window.innerWidth < 768;
  return (
    <>
      <div className='w-full min-h-screen bg-zinc-900 flex justify-center relative'>
        <div className='wrapper w-[96%] bg-zinc-800 md:m-10 m-5 z-0 rounded-xl '>
          <div className={isMobile ? 'top-0 z-10' : 'sticky top-0 z-10 w-full md:flex md:justify-center'}>
            {isMobile ? "" : <Navbar />}
          </div>
          <div className='w-full flex flex-col lg:flex lg:flex-row lg:justify-center items-center relative h-[60vh] mt-15 overflow-hidden'>
            <div className='heroimg hidden md:block md:absolute left-[10%] z-20 '>
              <img src="../src/assets/robot_hero.webp" alt="" className='h-full w-[60%]' />
            </div>
            <div className='lg:w-1/2 lg:text-[6rem] text-center md:tracking-tight tracking-normal w-full md:text-[3em] text-[2.2em] z-10 relative z-10'><GradientText
              colors={["#8b40eeff", "#ffb340ff", "#8b40eeff", "#4079ff", "#8b40eeff"]}
              animationSpeed={6}
              showBorder={false}
              className="custom-class"
            >
              AI that Condenses Knowledge within Seconds
            </GradientText>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing