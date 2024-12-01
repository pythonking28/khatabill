import React from 'react';

const About = () => {
  return (
    <div className="py-20 px-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      
      {/* Info Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg shadow-xl max-w-5xl mx-auto p-12 mb-20">
        
        {/* Name and Bio */}
        <div className="text-center md:text-left md:mr-8 flex-1">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-4">Niraj Kumar Thakur</h2> {/* Replace with actual name */}
          <p className="text-lg text-gray-600 mt-4">
            Hi, I'm Niraj, a passionate web developer focused on creating user-centric, impactful applications. I bring innovative ideas to life with modern technologies and strive to deliver seamless digital experiences.
          </p>
        </div>

        <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-r from-indigo-400 to-purple-600 p-1">
          <div className="w-full h-full rounded-full overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
            <img
              src="https://lh3.googleusercontent.com/a/ACg8ocKaiG9_ARBf8S67lKUnVm13e-VxzO1jx31DKNzA88e9QWqU9OTX=s360-c-no" // Replace with the developer's image URL
              alt="Developer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-8">About Us</h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Our goal is to deliver innovative digital experiences that empower users and drive business success. From web applications to intuitive designs, we transform ideas into impactful digital solutions.
        </p>
      </div>

      {/* Values Section */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-20">
        {/* Mission */}
        <div className="bg-gradient-to-br from-indigo-200 to-indigo-400 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
          <p className="text-white">
            To deliver impactful digital solutions that empower businesses and delight users, pushing the boundaries of what’s possible in technology.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-gradient-to-br from-purple-200 to-purple-400 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-semibold text-white mb-4">Our Vision</h3>
          <p className="text-white">
            To be a trusted leader in tech solutions, continuously innovating and transforming ideas into powerful tools that inspire and engage.
          </p>
        </div>

        {/* Values */}
        <div className="bg-gradient-to-br from-pink-200 to-pink-400 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-semibold text-white mb-4">Our Values</h3>
          <p className="text-white">
            Integrity, collaboration, and a commitment to excellence define every project, driving us to exceed expectations in everything we do.
          </p>
        </div>
      </div>

      {/* Contact Us Form */}
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-lg shadow-xl">
        <h3 className="text-4xl font-semibold text-gray-800 mb-8 text-center">Contact Us</h3>
        
        <form className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Your Name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Your Email"
            />
          </div>

          {/* Message Input */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Your Message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-md shadow-md hover:from-indigo-600 hover:to-purple-700 transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default About;
