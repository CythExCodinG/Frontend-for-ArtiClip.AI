import React from 'react'
import Navbar from '../components/Navbar'
import { useGSAP } from '@gsap/react'
import { SplitText } from "gsap/SplitText";
import { features, landingNavItems } from '../constants/index'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scale } from 'motion';
gsap.registerPlugin(SplitText, ScrollTrigger)
const Landing = () => {
  useGSAP(() => {

    const split = new SplitText(".hero-text", { type: "chars" });

    split.chars.forEach(char => {
      char.classList.add("gradient-text");
      char.style.fontFamily = '"Spicy Rice", sans-serif';
    });

    gsap.from(split.chars, {
      yPercent: 100,
      opacity: 0,
      stagger: 0.05,
      ease: "power3.out",
    })
    gsap.to('.hero-title', {
      scrollTrigger: {
        trigger: '.hero-title',
        start: 'top 10%',
        end: 'bottom 20%',
        scrub: true,
        pin: true
      },
      opacity: 0,
      scale: 0.5,

    })
    gsap.fromTo('.hero-img', {
      scrollTrigger: {
        trigger: '.hero-img',
        start: 'top 80%',
        end: 'bottom 80%',
        once: true,
        toggleActions: 'play none none reverse'
      },
      scale: 0,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: 'expo.inOut',
      delay: 1
    });


    gsap.from(".feature-sec", {
      scrollTrigger: {
        trigger: ".feature-sec",
        start: "top 60%",
        toggleActions: "play reset play reset"
      },
      x: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",

    });
    gsap.to('.why-grid', {
      scrollTrigger: {
        trigger: '.why-grid',
        toggleActions: 'play none none reverse',
        start: 'top 10%',
        end: 'bottom 10%',
        scrub: true
      },
      stagger: 0.5,
      yPercent: 100,
      opacity: 0
    })

    gsap.from(".use-cases", {
      scrollTrigger: {
        trigger: ".use-cases",
        start: "top 80%",
        toggleActions: "play reset play reset"
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(".use-cards", {
      scrollTrigger: {
        trigger: ".use-cases",
        start: "top 70%",
        toggleActions: "play reset play reset"
      },
      stagger: 0.2,
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });



    gsap.fromTo(".how-it-works-card", {
      y: 50,
      opacity: 0
    }, {
      scrollTrigger: {
        trigger: ".how-it-works",
        start: "top 85%",
        toggleActions: "play none none none"
      },
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out"
    });

    // Parallax Reveal for Creators
    gsap.fromTo(".creator-card", {
      y: 100,
      opacity: 0
    }, {
      scrollTrigger: {
        trigger: ".creators-sec",
        start: "top 60%",
        end: "top 40%",
        scrub: 1,
      },
      y: 0,
      opacity: 1,
      stagger: 0.1
    });

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);


  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const navItems = token
    ? [
      ...landingNavItems,
      {
        label: "Logout",
        onClick: handleLogout,
        className: "px-4 py-1.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 text-sm font-semibold ml-4"
      }
    ]
    : [...landingNavItems, { label: "Login", link: "/login" }];

  return (
    <>
      <section className="hero-bg h-screen md:mt-10 flex items-center justify-center text-center">
        <Navbar navItems={navItems} />
        <div className="hero-title section-padding mt-20">
          <h1 className="hero-text text-5xl md:text-[8rem] lg:text-[10rem] font-bold leading-tight gradient-text">
            Too Long? <br /> We Summarize It
          </h1>

          <p className="mt-6 text-gray-400 text-lg">
            Paste articles or links and get clean AI-powered summaries in seconds.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition" onClick={() => window.location.href = '/postgenerator'}>
              Try Free
            </button>
            <button
              onClick={() => document.getElementById('feature').scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/5 transition"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
      <section id='feature' className="feature-sec section-padding py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Why Articlip?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="why-grid p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition"
            >
              <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="use-cases section-padding py-24">
        <div className=" max-w-6xl mx-auto">
          {/* Heading */}
          <div className="use-cards text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Summarize Anything, Anywhere
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Built for students, professionals, and curious minds who value time.
            </p>
          </div>

          <div className="use-cards grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/10 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3">
                Research & Articles
              </h3>
              <p className="text-gray-300 max-w-lg">
                Convert long research papers and articles into clean summaries
                without missing key insights.
              </p>
            </div>

            <div className="use-cards p-8 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-semibold mb-3">
                Blogs & News
              </h3>
              <p className="text-gray-400">
                Stay updated without reading lengthy posts.
              </p>
            </div>

            <div className="use-cards p-8 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-semibold mb-3">
                Students
              </h3>
              <p className="text-gray-400">
                Perfect for exam prep, notes, and fast revision.
              </p>
            </div>

            <div className="use-cards md:col-span-2 p-8 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3">
                Professionals
              </h3>
              <p className="text-gray-400 max-w-lg">
                Save hours summarizing reports, documents, and emails.
              </p>
            </div>
            <div className="hero-img md:col-span-3 p-8 rounded-3xl bg-white/5 border border-white/10">
              <img src="/Images/bento4.jpg" alt="" className="w-full h-[300px] md:h-[400px] object-cover rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
      <section className="how-it-works section-padding py-24 bg-gradient-to-t from-slate-950 to-slate-900 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "1. Paste Link", desc: "Copy any article or PDF URL you want to summarize.", icon: "🔗" },
              { title: "2. AI Analysis", desc: "Our advanced AI reads and understands the context instantly.", icon: "🧠" },
              { title: "3. Get Summary", desc: "Read the key points in seconds and save your time.", icon: "✨" }
            ].map((step, i) => (
              <div key={i} className="how-it-works-card p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/10 cursor-default">
                <div className="text-5xl mb-6 bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-inner border border-white/10">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-white">{step.title}</h3>
                <p className="text-gray-400 text-center leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="creators" className="creators-sec section-padding py-24 mb-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-20 gradient-text">
            Meet the Creators
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                name: "Atharva",
                role: "Backend Architect",
                desc: "Built the robust backend infrastructure.",
                link: "https://github.com/Atharvadotenv",
                color: "from-purple-500/20 via-blue-500/20 to-purple-500/20",
                img: "/Images/atharva_logo.jpeg"
              },
              {
                name: "Rohit",
                role: "Frontend & Integration Lead",
                desc: "Handled frontend, backend connection, and backend contributions.",
                link: "https://github.com/CythExCodinG",
                color: "from-blue-500/20 via-cyan-500/20 to-blue-500/20",
                img: "/Images/rohit_logo.jpeg"
              }
            ].map((creator, i) => (
              <div
                key={i}
                className={`creator-card p-1 bg-gradient-to-br ${creator.color} rounded-3xl hover:scale-[1.02] transition-transform duration-500 animate-gradient`}
                onClick={() => window.open(creator.link, "_blank")}
              >
                <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-[22px] h-full border border-white/10 flex flex-col items-center text-center cursor-pointer group">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-white/10 to-white/5 mb-6 overflow-hidden border-2 border-white/20 group-hover:border-blue-500/50 transition-colors">
                    <div className="w-full h-full flex items-center justify-center text-3xl">
                      <img src={creator.img} alt="" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{creator.name}</h3>
                  <p className="text-blue-400 font-medium mb-4">{creator.role}</p>
                  <p className="text-gray-400">{creator.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-sec section-padding py-24 border-t border-white/5 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Get in Touch</h2>
          <p className="text-gray-400 text-lg mb-12">
            Have questions, feedback, or want to collaborate? Reach out to us!
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a
              href="mailto:cytherohit01@gmail.com"
              className="px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition flex items-center justify-center gap-2"
            >
              <span>📩</span> Email Us
            </a>
            <a
              href="https://github.com/CythExCodinG/Frontend-for-ArtiClip.AI"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition border border-white/10 flex items-center justify-center gap-2"
            >
              <span>🐙</span> GitHub Repo
            </a>
          </div>

          <div className="mt-20 pt-8 border-t border-white/5 text-gray-600 text-sm">
            © {new Date().getFullYear()} Articlip.Ai. All rights reserved.
          </div>
        </div>
      </section>

    </>
  )
}

export default Landing
