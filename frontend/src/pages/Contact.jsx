import React from 'react';

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-6">
        Have questions or need support? Reach out to our team anytime!
      </p>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold text-gray-700">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-semibold text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-1 font-semibold text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            className="w-full border border-gray-300 p-2 rounded resize-none"
            placeholder="Your message here..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
