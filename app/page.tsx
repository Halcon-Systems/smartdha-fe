"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full bg-white flex flex-col scroll-smooth">
      {/* Top Info Bar */}
      <div className="w-full bg-green-600 text-white text-center py-2 text-xs">
        Lorem ipsum dolor sit amet consectetur. Sapien feugiat donec viverra libero et non
      </div>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Smart DHA City" width={40} height={40} />
          <span className="font-bold text-lg">Smart DHA City</span>
        </div>
        <nav className="flex gap-8 text-sm font-medium">
          <a href="#" className="text-black font-bold" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a>
          <a href="#about" className="text-gray-700" onClick={e => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>About us</a>
          <a href="#features" className="text-gray-700" onClick={e => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}>Features</a>
          <a href="#smartdha" className="text-gray-700" onClick={e => { e.preventDefault(); document.getElementById('smartdha')?.scrollIntoView({ behavior: 'smooth' }); }}>Smart DHA</a>
          <a href="#contact" className="text-gray-700" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Contact</a>
        </nav>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold"
          onClick={() => router.push('/auth/signup')}
        >
          Register Now
        </button>
      </header>
      {/* Hero Section */}
      <main className="flex flex-1 flex-col lg:flex-row items-center justify-between px-8 py-12 gap-8 max-w-7xl mx-auto w-full">
        {/* Left: Text */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-5xl font-bold text-black leading-tight mb-4">
            Lorem ipsum dolor sit amet <span className="text-green-500">consectetur.</span>
          </h1>
          <p className="text-gray-500 mb-8">
            Lorem ipsum dolor sit amet consectetur. Sapien feugiat donec viverra libero et non. Fames odio nunc quisque amet ac adipiscing.
          </p>
          <div className="flex gap-4 mb-8">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-semibold flex items-center gap-2">
              Start Living Smarter
              <span className="ml-2">→</span>
            </button>
            <button className="border border-green-500 text-green-500 px-6 py-3 rounded-md font-semibold bg-white hover:bg-green-50">
              Get Started
            </button>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="bg-green-50 p-6 rounded-md min-w-[150px]">
              <div className="text-2xl font-bold text-black mb-1">92%</div>
              <div className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur. Sapien feugiat</div>
            </div>
            <div className="min-w-[150px]">
              <div className="text-2xl font-bold text-black mb-1">100K +</div>
              <div className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur. Sapien feugiat</div>
            </div>
            <div className="min-w-[150px]">
              <div className="text-2xl font-bold text-black mb-1">4.5/5</div>
              <div className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur. Sapien feugiat</div>
            </div>
          </div>
        </div>
        {/* Right: Image */}
        <div className="flex-1 flex items-center justify-center">
          <div className="rounded-3xl overflow-hidden shadow-lg w-full max-w-xl">
            <Image src="/images/login-sideimg.png" alt="DHA Karachi" width={700} height={450} className="object-cover w-full h-full" />
          </div>
        </div>
      </main>
      {/* Carousel Dots */}
      <div className="flex justify-center items-center gap-2 pb-8">
        <span className="w-8 h-2 bg-green-500 rounded-full inline-block"></span>
        <span className="w-2 h-2 bg-gray-200 rounded-full inline-block"></span>
        <span className="w-2 h-2 bg-gray-200 rounded-full inline-block"></span>
      </div>
      {/* More content sections as user scrolls */}
      {/* --- New Section: Video & About --- */}
      <section id="about" className="w-full flex flex-col items-center bg-white py-12 px-2">
        {/* Video Banner */}
        <div className="w-full max-w-5xl rounded-3xl bg-green-500 relative flex items-center justify-center h-64 mb-12 overflow-hidden" style={{background: 'radial-gradient(circle at 20% 30%, #43d47733 120px, transparent 200px), radial-gradient(circle at 80% 70%, #43d47733 180px, transparent 300px), #22c55e'}}>
          {/* Grid pattern overlay */}
          <svg className="absolute inset-0 w-full h-full" width="100%" height="100%" viewBox="0 0 900 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#38b44a33" strokeWidth="2" />
              </pattern>
            </defs>
            <rect width="900" height="300" fill="url(#grid)" />
          </svg>
          {/* Play Video Button */}
          <div className="relative z-10 flex flex-col items-center">
            <button className="flex items-center gap-3 bg-white/90 px-8 py-4 rounded-full shadow-lg border-2 border-white hover:scale-105 transition-transform">
              <span className="w-8 h-8 flex items-center justify-center bg-green-500 rounded-full text-white font-bold text-lg">▶</span>
              <span className="flex flex-col items-start">
                <span className="font-semibold text-black">Watch video</span>
                <span className="text-xs text-gray-500">5 mins &nbsp;–&nbsp; Play video</span>
              </span>
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="w-full max-w-5xl flex flex-col gap-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full border border-green-200 font-semibold text-sm shadow-sm">
              <span className="w-5 h-5 flex items-center justify-center bg-white rounded-full border border-green-200">★</span>
              About Us
            </button>
          </div>
          <div className="flex gap-2 mb-4">
            <button className="px-4 py-2 bg-green-500 text-white rounded-md font-semibold shadow">About Smart DHA</button>
            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-md font-semibold shadow">Administrator Message</button>
          </div>
          {/* Content Row */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Left: Text */}
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-black mb-4">Lorem ipsum dolor sit amet <span className="text-green-500">consectetur.</span></h2>
              <p className="text-gray-500 mb-4">Lorem ipsum dolor sit amet consectetur. Nibh vitae mauris a lacus cursus. Proin odio turpis vel sed gravida proin elementum pharetra. Faucibus interdum luctus pulvinar sed maecenas sapien. Vel aliquam amet non cursus sit nec. Quam faucibus enim interdum nisl nam diam. At consequat volutpat phasellus non pellentesque cum ante quam.</p>
              <p className="text-gray-500">Vel aliquam amet non cursus sit nec. Quam faucibus enim interdum nisl nam diam. At consequat volutpat phasellus non pellentesque cum ante quam.</p>
            </div>
            {/* Right: Image */}
            <div className="flex-1 flex flex-col items-center relative">
              <div className="rounded-2xl overflow-hidden shadow-lg w-full max-w-md">
                <Image src="/images/contact.png" alt="DHA Karachi" width={500} height={300} className="object-cover w-full h-full" />
              </div>
              {/* Trophy Card Overlay */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg px-8 py-4 flex items-center gap-3 border border-green-100" style={{minWidth: '120px'}}>
                <span className="text-green-500 text-3xl">🏆</span>
                <span className="font-semibold text-gray-700">Award</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --- End New Section --- */}
      {/* Features Section */}
      <section id="features" className="w-full flex flex-col items-center bg-white py-20 px-2">
        {/* Features Tab */}
        <div className="flex justify-center mb-4">
          <button className="flex items-center gap-2 px-6 py-2 bg-green-50 text-green-600 rounded-full border border-green-200 font-semibold text-sm shadow-sm">
            <span className="w-5 h-5 flex items-center justify-center bg-white rounded-full border border-green-200">★</span>
            Features
          </button>
        </div>
        {/* Heading */}
        <h2 className="text-5xl font-bold text-center text-black mb-4">
          Lorem ipsum dolor sit amet <span className="text-green-500">consectetur.</span>
        </h2>
        <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
          Lorem ipsum dolor sit amet consectetur. Sapien feugiat donec viverra libero et non. Fames odio nunc quisque amet ac adipiscing.
        </p>
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-[0_8px_24px_0_rgba(60,72,88,0.07)] p-10 flex flex-col items-center text-center relative group">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-[0_2px_8px_0_rgba(60,72,88,0.10)] mb-6">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><path d="M8 17V9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v8" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="10" y="13" width="4" height="4" rx="1" fill="#22c55e"/></svg>
            </div>
            <div className="font-bold text-green-500 text-lg mb-2">Smart DHA</div>
            <div className="text-gray-500 text-[15px] mb-6">Lorem ipsum dolor sit amet consectetur. Enim dui et enim cras donec nibh accumsan.</div>
            <div className="absolute left-0 bottom-0 w-full h-1 bg-green-500 rounded-b-2xl"></div>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-[0_8px_24px_0_rgba(60,72,88,0.07)] p-10 flex flex-col items-center text-center relative group">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-[0_2px_8px_0_rgba(60,72,88,0.10)] mb-6">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><rect x="8" y="10" width="8" height="6" rx="1" fill="#22c55e"/><rect x="10" y="8" width="4" height="2" rx="1" fill="#22c55e"/></svg>
            </div>
            <div className="font-bold text-green-500 text-lg mb-2">My Bills</div>
            <div className="text-gray-500 text-[15px] mb-6">Lorem ipsum dolor sit amet consectetur. Enim dui et enim cras donec nibh accumsan.</div>
            <div className="absolute left-0 bottom-0 w-full h-1 bg-green-500 rounded-b-2xl"></div>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-[0_8px_24px_0_rgba(60,72,88,0.07)] p-10 flex flex-col items-center text-center relative group">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-[0_2px_8px_0_rgba(60,72,88,0.10)] mb-6">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><rect x="8" y="8" width="8" height="8" rx="1" fill="#22c55e"/></svg>
            </div>
            <div className="font-bold text-green-500 text-lg mb-2">Property Management</div>
            <div className="text-gray-500 text-[15px] mb-6">Lorem ipsum dolor sit amet consectetur. Enim dui et enim cras donec nibh accumsan.</div>
            <div className="absolute left-0 bottom-0 w-full h-1 bg-green-500 rounded-b-2xl"></div>
          </div>
          {/* Card 4 */}
          <div className="bg-white rounded-2xl shadow-[0_8px_24px_0_rgba(60,72,88,0.07)] p-10 flex flex-col items-center text-center relative group">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-[0_2px_8px_0_rgba(60,72,88,0.10)] mb-6">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><path d="M8 16v-4a4 4 0 0 1 8 0v4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="2" fill="#22c55e"/></svg>
            </div>
            <div className="font-bold text-green-500 text-lg mb-2">DHA Club</div>
            <div className="text-gray-500 text-[15px] mb-6">Lorem ipsum dolor sit amet consectetur. Enim dui et enim cras donec nibh accumsan.</div>
            <div className="absolute left-0 bottom-0 w-full h-1 bg-green-500 rounded-b-2xl"></div>
          </div>
          {/* Card 5 */}
          <div className="bg-white rounded-2xl shadow-[0_8px_24px_0_rgba(60,72,88,0.07)] p-10 flex flex-col items-center text-center relative group">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-[0_2px_8px_0_rgba(60,72,88,0.10)] mb-6">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><path d="M8 12h8M12 8v8" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="font-bold text-green-500 text-lg mb-2">DHA Services</div>
            <div className="text-gray-500 text-[15px] mb-6">Lorem ipsum dolor sit amet consectetur. Enim dui et enim cras donec nibh accumsan.</div>
            <div className="absolute left-0 bottom-0 w-full h-1 bg-green-500 rounded-b-2xl"></div>
          </div>
          {/* Card 6 */}
          <div className="bg-white rounded-2xl shadow-[0_8px_24px_0_rgba(60,72,88,0.07)] p-10 flex flex-col items-center text-center relative group">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-[0_2px_8px_0_rgba(60,72,88,0.10)] mb-6">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><rect x="10" y="8" width="4" height="8" rx="1" fill="#22c55e"/></svg>
            </div>
            <div className="font-bold text-green-500 text-lg mb-2">Emergency Help</div>
            <div className="text-gray-500 text-[15px] mb-6">Lorem ipsum dolor sit amet consectetur. Enim dui et enim cras donec nibh accumsan.</div>
            <div className="absolute left-0 bottom-0 w-full h-1 bg-green-500 rounded-b-2xl"></div>
          </div>
        </div>
      </section>
      {/* Smart DHA Section */}
      <section id="smartdha" className="w-full flex flex-col items-start bg-white py-20 px-2 max-w-7xl mx-auto">
        {/* Tab */}
        <div className="flex mb-4">
          <button className="flex items-center gap-2 px-6 py-2 bg-green-50 text-green-600 rounded-full border border-green-200 font-semibold text-sm shadow-sm">
            <span className="w-5 h-5 flex items-center justify-center bg-white rounded-full border border-green-200">★</span>
            Smart DHA
          </button>
        </div>
        {/* Heading */}
        <h2 className="text-5xl font-bold text-black mb-2">
          Lorem ipsum dolor sit amet <span className="text-green-500">consectetur.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
          {/* Card 1 - Active */}
          <div className="bg-green-500 rounded-xl p-8 flex flex-col justify-between min-h-[140px] transition-all text-white shadow group cursor-pointer">
            <div className="font-semibold text-2xl mb-2">My Family</div>
            <div className="flex items-center justify-between w-full">
              <span className="text-white/90">Lorem ipsum dolor sit amet</span>
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><g stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8.5" cy="10.5" r="1.5"/><circle cx="15.5" cy="10.5" r="1.5"/><path d="M7 16c0-1.657 1.79-3 4-3s4 1.343 4 3"/></g></svg>
              </span>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-xl p-8 flex flex-col justify-between min-h-[140px] border border-gray-200 transition-all shadow group cursor-pointer">
            <div className="font-semibold text-2xl text-black mb-2">My Vehicle</div>
            <div className="flex items-center justify-between w-full">
              <span className="text-gray-500">Lorem ipsum dolor sit amet</span>
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><rect x="7" y="13" width="10" height="4" rx="2" fill="#fff"/><rect x="8" y="9" width="8" height="4" rx="2" fill="#fff"/><rect x="10" y="15" width="2" height="2" rx="1" fill="#22c55e"/><rect x="12" y="15" width="2" height="2" rx="1" fill="#22c55e"/></svg>
              </span>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-xl p-8 flex flex-col justify-between min-h-[140px] border border-gray-200 transition-all shadow group cursor-pointer">
            <div className="font-semibold text-2xl text-black mb-2">My Property</div>
            <div className="flex items-center justify-between w-full">
              <span className="text-gray-500">Lorem ipsum dolor sit amet</span>
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><path d="M12 7l-5 5h2v5h6v-5h2l-5-5z" fill="#fff"/></svg>
              </span>
            </div>
          </div>
          {/* Card 4 */}
          <div className="bg-white rounded-xl p-8 flex flex-col justify-between min-h-[140px] border border-gray-200 transition-all shadow group cursor-pointer">
            <div className="font-semibold text-2xl text-black mb-2">My Worker</div>
            <div className="flex items-center justify-between w-full">
              <span className="text-gray-500">Lorem ipsum dolor sit amet</span>
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><g stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="2"/><path d="M8 16c0-2.21 1.79-4 4-4s4 1.79 4 4"/></g></svg>
              </span>
            </div>
          </div>
          {/* Card 5 */}
          <div className="bg-white rounded-xl p-8 flex flex-col justify-between min-h-[140px] border border-gray-200 transition-all shadow group cursor-pointer">
            <div className="font-semibold text-2xl text-black mb-2">Visitor Pass</div>
            <div className="flex items-center justify-between w-full">
              <span className="text-gray-500">Lorem ipsum dolor sit amet</span>
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><rect x="10" y="8" width="4" height="8" rx="2" fill="#fff"/><rect x="11" y="10" width="2" height="4" rx="1" fill="#22c55e"/></svg>
              </span>
            </div>
          </div>
          {/* Card 6 */}
          <div className="bg-white rounded-xl p-8 flex flex-col justify-between min-h-[140px] border border-gray-200 transition-all shadow group cursor-pointer">
            <div className="font-semibold text-2xl text-black mb-2">Luggage Pass</div>
            <div className="flex items-center justify-between w-full">
              <span className="text-gray-500">Lorem ipsum dolor sit amet</span>
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><rect x="8" y="13" width="8" height="3" rx="1.5" fill="#fff"/><rect x="10" y="8" width="4" height="5" rx="1" fill="#fff"/><rect x="12" y="15" width="2" height="2" rx="1" fill="#22c55e"/></svg>
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* Mobile App Promo Section */}
      <section className="w-full flex justify-center bg-transparent py-12 px-2">
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-stretch rounded-2xl overflow-visible relative" style={{minHeight: '400px'}}>
          {/* Green Background Card (now covers both sides) */}
          <div className="flex-1 md:w-3/5 rounded-2xl bg-[#c7ecc7] flex flex-col justify-center pl-10 pr-0 py-10 min-h-[400px] relative z-10">
            <h2 className="text-5xl font-bold text-black mb-4 leading-tight">
              Lorem ipsum dolor sit amet <span className="text-green-500">consectetur.</span>
            </h2>
            <p className="text-gray-700 mb-6 max-w-lg text-base">
              Lorem ipsum dolor sit amet consectetur. Sapien feugiat donec viverra libero et non. Fames odio nunc quisque amet ac adipiscing.
            </p>
            <div className="flex flex-col gap-2 items-start">
              <a href="#" className="block">
  <Image 
    src="/images/Play.png" 
    alt="Get it on Google Play" 
    width={150} 
    height={40} 
    className="h-10 w-auto"
  />
</a>
              <a href="#" className="block">
  <Image 
    src="/images/app.png" 
    alt="Download on the App Store" 
    width={150} 
    height={40} 
    className="h-10 w-auto"
  />
</a>
            </div>
          </div>
          {/* Phone Image Overlapping Right Side, but same green bg behind */}
          <div className="flex-1 md:w-2/5 flex items-end justify-end pr-8 pt-8 min-h-[400px] relative -ml-16 z-10 bg-[#c7ecc7] rounded-r-2xl">
            <Image 
              src="/images/phone.png" 
              alt="App Preview" 
              width={370} 
              height={400} 
              className="w-[370px] max-w-full object-contain drop-shadow-2xl" 
              style={{marginBottom: '-24px'}} 
            />
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="w-full flex flex-col items-center bg-white py-20 px-2">
        {/* Contact Tab */}
        <div className="flex justify-center mb-4">
          <button className="flex items-center gap-2 px-6 py-2 bg-green-50 text-green-600 rounded-full border border-green-200 font-semibold text-sm shadow-sm">
            <span className="w-5 h-5 flex items-center justify-center bg-white rounded-full border border-green-200">★</span>
            Contact
          </button>
        </div>
        {/* Heading */}
        <h2 className="text-5xl font-bold text-center text-black mb-10">
          Lorem ipsum dolor sit amet <span className="text-green-500">consectetur.</span>
        </h2>
        {/* Contact Card */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-2xl shadow-lg overflow-hidden bg-white">
          {/* Left: Green Panel */}
          <div className="flex-1 bg-green-500 p-10 flex flex-col justify-between min-w-[300px] relative">
            <div>
              <h3 className="text-white text-2xl font-bold mb-8">Get in touch</h3>
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-white/20 rounded-full p-3 flex items-center justify-center">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="none"/><path d="M4 8l8 5 8-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 8v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <div>
                    <div className="text-white text-xs opacity-80">EMAIL US</div>
                    <div className="text-white font-semibold">dha@dhakarachi.org</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-white/20 rounded-full p-3 flex items-center justify-center">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="none"/><path d="M6.5 7.5a2.5 2.5 0 0 1 5 0v1a2.5 2.5 0 0 1-5 0v-1z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 17v-2a2 2 0 0 1 2-2h2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <div>
                    <div className="text-white text-xs opacity-80">PHONE NUMBER</div>
                    <div className="text-white font-semibold">+92 21 111-589-589</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-white/20 rounded-full p-3 flex items-center justify-center">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17c-3.87 0-7-3.13-7-7 0-3.87 3.13-7 7-7s7 3.13 7 7c0 3.87-3.13 7-7 7z" fill="#fff"/><path d="M12 8v4l3 3" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <div>
                    <div className="text-white text-xs opacity-80">PHONE NUMBER</div>
                    <div className="text-white font-semibold">2-B East Street Ph-1 DHA Karachi~75500</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Socials */}
            <div className="mt-8">
              <div className="text-white text-sm mb-2">Connect with us:</div>
              <div className="flex gap-4">
                <a href="#" className="inline-block">
  <Image src="/images/x.png" alt="X" width={28} height={28} className="object-contain" />
</a>

<a href="#" className="inline-block">
  <Image src="/images/fb.png" alt="Facebook" width={28} height={28} className="object-contain" />
</a>

<a href="#" className="inline-block">
  <Image src="/images/insta.png" alt="Instagram" width={28} height={28} className="object-contain" />
</a>

<a href="#" className="inline-block">
  <Image src="/images/linkendin.png" alt="LinkedIn" width={28} height={28} className="object-contain" />
</a>
              </div>
            </div>
          </div>
          {/* Right: Form Panel */}
          <div className="flex-1 bg-white p-10 flex flex-col justify-center">
            <form className="w-full">
              <div className="flex gap-4 mb-4">
                <input type="text" placeholder="Full name" className="flex-1 border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400" />
                <input type="email" placeholder="Email adress" className="flex-1 border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
              <input type="text" placeholder="Subject" className="w-full border border-gray-200 rounded-md px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400" />
              <textarea placeholder="Tell us about your project..." className="w-full border border-gray-200 rounded-md px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-400 min-h-[120px]" />
              <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-md font-semibold flex items-center gap-2 mx-auto">
                Send Message <span className="ml-2">→</span>
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="w-full bg-[#c7eac7] py-20 px-4 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-0 justify-between items-start min-h-[260px]">
          {/* Left: Logo and Description */}
          <div className="flex-1 min-w-[220px] flex flex-col gap-6 justify-center h-full">
            <div className="flex items-center gap-2 mb-4">
              <Image 
  src="/images/logo.png" 
  alt="Smart DHA City" 
  width={40} 
  height={40} 
  className="w-10 h-10"
/>
              <span className="font-bold text-lg text-black">Smart DHA City</span>
            </div>
            <div className="text-gray-700 text-sm mb-4">Lorem ipsum dolor sit amet consectetur. Sapien feugiat donec viverra libero et non.</div>
            <div className="flex gap-6 mt-2">
              <a href="#" className="inline-block">
  <Image src="/images/x.png" alt="X" width={28} height={28} className="object-contain" />
</a>

<a href="#" className="inline-block">
  <Image src="/images/fb.png" alt="Facebook" width={28} height={28} className="object-contain" />
</a>

<a href="#" className="inline-block">
  <Image src="/images/insta.png" alt="Instagram" width={28} height={28} className="object-contain" />
</a>

<a href="#" className="inline-block">
  <Image src="/images/linkendin.png" alt="LinkedIn" width={28} height={28} className="object-contain" />
</a>
            </div>
          </div>
          {/* Center: Quick Links */}
          <div className="flex-1 min-w-[180px] flex flex-col justify-center h-full">
            <div className="font-semibold text-black mb-4">Quick Link</div>
            <ul className="space-y-3 text-gray-700">
              <li><a href="#about" className="hover:underline">About us</a></li>
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#smartdha" className="hover:underline">Smart DHA</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          {/* Right: Get In Touch */}
          <div className="flex-1 min-w-[220px] flex flex-col justify-center h-full">
            <div className="font-semibold text-black mb-4">Get In Touch</div>
            <div className="text-gray-700 text-sm mb-2">2-B East Street Ph-1 DHA Karachi-75500</div>
            <div className="text-gray-700 text-sm mb-2">Phone: +92 21 35886401-5</div>
            <div className="text-gray-700 text-sm mb-2">UAN: +92 21 111-589-589</div>
            <div className="text-gray-700 text-sm mb-2">dha@dhakarachi.org</div>
            <div className="text-gray-700 text-sm">DHA Helpline: 1092</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
