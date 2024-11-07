import React from "react";

function AboutUs() {
  return (
   
    <div className=" font-sans" id="AboutContact">
      {/* About Us Section */}
      <div className=" py-16 px-4 sm:px-6 lg:px-8" id="AboutContact2">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-left">OUR MISSION</h2>
          <p className="mt-6 text-lg text-gray-700" id="Text">
            At [Learn Lab], we’re passionate about empowering learners of all
            backgrounds and skill levels. Our mission is simple: to provide
            accessible, high-quality education that fosters growth, curiosity,
            and lifelong learning. Whether you’re a student, professional, or
            hobbyist, we’re here to support your journey.
          </p>
          <p className="mt-6 text-lg font-semibold text-gray-800" id="Text">
            What Sets Us Apart
          </p>
          <p className="mt-4 text-lg text-gray-700" id="Text">
            1. Personalized Learning Paths: We understand that everyone learns
            differently. That’s why our dashboard adapts to your needs. Whether
            you’re diving into coding, exploring art history, or mastering a new
            language, our platform tailors content to match your interests and
            pace. <br/><br/>
            2.Expert-Driven Content: Our courses are created by industry
            experts, educators, and practitioners. You’ll learn from the best,
            gaining practical skills and knowledge that directly apply to
            real-world scenarios. <br/><br/>
            3.Community and Collaboration: Learning is more
            fun when you’re not alone! Connect with fellow learners, join study
            groups, and participate in discussions. Our community is vibrant,
            supportive, and ready to cheer you on.<br/><br/>
            4.Continuous Improvement: We’recommitted to enhancing your learning experience. 
            Expect regularupdates, new features, and fresh content. Your feedback matters, 
            and we’re always listening. Join us on this exciting learning journey!
            🚀
          </p>
        </div>
      </div>

      {/* Industries Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-left" id="Text">Industries</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 text-lg text-gray-800" id="Text">
            <div className="space-y-2">
              <p>Health</p>
              <p>Insurance</p>
              <p>Senior housing</p>
              <p>Manufacturing</p>
              <p>Cloud/SaaS</p>
              <p>Higher education</p>
              <p>Commercial real estate</p>
            </div>
            <div className="space-y-2">
              <p>Wellness</p>
              <p>Student housing</p>
              <p>Financial</p>
              <p>High-tech</p>
              <p>Non-profit</p>
              <p>Resort</p>
              <p>Online gaming</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
