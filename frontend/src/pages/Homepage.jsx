import React from "react";

// Helper for animation classes alternating left/right
const anim = [
  "animate-fadeInLeft",
  "animate-fadeInRight"
];

export default function Homepage() {
  return (
    <div className="space-y-24 bg-gradient-to-b from-slate-50 to-blue-100 min-h-screen text-gray-900">
      {/* Section 1 - Hero Banner */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center animate-fadeInDown">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-blue-900 tracking-tight leading-tight drop-shadow">
          Empower Your Coding Journey
        </h1>
        <p className="max-w-4xl mx-auto text-2xl font-semibold text-blue-700 mb-12">
          Unlock challenges, master skills,<br className="hidden md:block"/>
          and join a thriving developer community.
        </p>
        <img
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
          alt="Laptop with code editor open"
          className="mx-auto rounded-2xl shadow-xl w-full max-w-2xl border-8 border-blue-200"
          style={{ animation: "fadeInUp 1.2s" }}
        />
      </section>

      {/* Section 2 - Diverse Problem Set (Zig) */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
        <div className={`md:w-1/2 ${anim[0]} order-2 md:order-1`}>
          <h2 className="text-4xl font-bold mb-5 text-blue-800">
            Diverse Problem Set
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed font-medium mb-2">
            Explore a curated set of challenges spanning algorithms, data structures, and real-world scenarios.<br/>
            <span className="font-bold text-indigo-700">Practice, learn, repeat.</span>
          </p>
        </div>
        <div className={`md:w-1/2 ${anim[1]} order-1 md:order-2 flex justify-center`}>
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
            alt="List of coding problems"
            className="rounded-xl shadow-lg border-4 border-slate-200 w-full max-w-md"
          />
        </div>
      </section>

      {/* Section 3 - Real-Time Feedback (Zag) */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12 px-6">
        <div className={`md:w-1/2 ${anim[1]}`}>
          <h2 className="text-4xl font-bold mb-5 text-blue-800">
            Real-Time Code Feedback
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed font-medium mb-2">
            Instantly see your code results,<br/>
            get guided solution walkthroughs,<br/>
            and debug with detailed test cases.
          </p>
        </div>
        <div className={`md:w-1/2 ${anim[0]} flex justify-center`}>
          <img
            src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
            alt="Code feedback live"
            className="rounded-xl shadow-lg border-4 border-blue-100 w-full max-w-md"
          />
        </div>
      </section>

      {/* Section 4 - Community (Zig) */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
        <div className={`md:w-1/2 ${anim[0]} order-2 md:order-1`}>
          <h2 className="text-4xl font-bold mb-5 text-blue-800">
            Collaborative Community
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed font-medium mb-2">
            Connect with passionate programmers.<br/>
            Discuss solutions, share insights, or just hang out—a coding family awaits.
          </p>
        </div>
        <div className={`md:w-1/2 ${anim[1]} order-1 md:order-2 flex justify-center`}>
          <img
            src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
            alt="Community of developers"
            className="rounded-xl shadow-lg border-4 border-slate-200 w-full max-w-md"
          />
        </div>
      </section>

      {/* Section 5 - Progress Tracking (Zag) */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12 px-6">
        <div className={`md:w-1/2 ${anim[1]}`}>
          <h2 className="text-4xl font-bold mb-5 text-blue-800">
            Track Your Progress
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed font-medium mb-2">
            Visualize your improvement over time—see solved problems, contest wins, and your coding streak.
          </p>
        </div>
        <div className={`md:w-1/2 ${anim[0]} flex justify-center`}>
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
            alt="Progress dashboard"
            className="rounded-xl shadow-lg border-4 border-blue-100 w-full max-w-md"
          />
        </div>
      </section>

      {/* Section 6 - Call to Action */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-2xl text-center animate-fadeInUp drop-shadow-2xl">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-7 text-white">
          Ready to elevate your coding?
        </h2>
        <p className="text-2xl font-semibold text-blue-100 max-w-2xl mx-auto mb-8">
          Join a community of developers building better, together. <br />
          Practice, compete, and grow — your journey begins here.
        </p>
      </section>
    </div>
  );
}

/* Tailwind CSS required:
  - Add these custom keyframes to your Tailwind config's theme.extend.animation and keyframes if not present:

    theme: {
      extend: {
        animation: {
          fadeInLeft: 'fadeInLeft 1s ease',
          fadeInRight: 'fadeInRight 1s ease',
          fadeInDown: 'fadeInDown 1s ease',
          fadeInUp: 'fadeInUp 1s ease'
        },
        keyframes: {
          fadeInLeft: {
            "0%": { opacity: 0, transform: "translateX(-40px)" },
            "100%": { opacity: 1, transform: "translateX(0)" }
          },
          fadeInRight: {
            "0%": { opacity: 0, transform: "translateX(40px)" },
            "100%": { opacity: 1, transform: "translateX(0)" }
          },
          fadeInDown: {
            "0%": { opacity: 0, transform: "translateY(-40px)" },
            "100%": { opacity: 1, transform: "translateY(0)" }
          },
          fadeInUp: {
            "0%": { opacity: 0, transform: "translateY(40px)" },
            "100%": { opacity: 1, transform: "translateY(0)" }
          }
        }
      }
    }

  - If you don’t want to edit the config, you can add animate.css classes or use Tailwind’s built-in transition/transform utilities, but custom keyframes will give you the smoothest effect.
*/

