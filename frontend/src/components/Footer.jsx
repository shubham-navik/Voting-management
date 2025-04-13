import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full h-[15vh] flex flex-col md:flex-row items-center justify-between px-6 py-4 text-sm md:text-base">
    <div className="mb-2 md:mb-0 font-semibold">© 2025 VoteRight. All rights reserved.</div>
    <div className="flex space-x-4">
      <a href="#privacy" className="hover:text-red-400 transition-colors">Privacy Policy</a>
      <a href="#terms" className="hover:text-red-400 transition-colors">Terms of Service</a>
      <a href="#contact" className="hover:text-red-400 transition-colors">Contact Us</a>
    </div>
  </footer>
  
  )
}

export default Footer