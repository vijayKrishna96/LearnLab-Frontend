import React from "react";

function Footer() {
  return (
    <footer className="mt-12  p-6 bg-primary" id="Tags">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-3" id="Text">
          <div className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40"
              alt="Logo"
              className="w-10"
            />
            <p className="text-sm">hello@skillbridge.com</p>
          </div>
          <p className="text-sm mt-2">+91 91813 23 2309</p>
          <p className="text-sm mt-2">Somewhere in the World</p>
        </div>
        <div className="col-span-3" id="Text">
          <h4 className="font-semibold">Home</h4>
          <ul className="text-sm space-y-1 mt-2">
            <li>Benefits</li>
            <li>Our Courses</li>
            <li>Our Testimonials</li>
            <li>Our FAQ</li>
          </ul>
        </div>
        <div className="col-span-3" id="Text">
          <h4 className="font-semibold">About Us</h4>
          <ul className="text-sm space-y-1 mt-2">
            <li>Company</li>
            <li>Achievements</li>
            <li>Our Goals</li>
          </ul>
        </div>
        <div className="col-span-3" id="Text">
          <h4 className="font-semibold">Social Profiles</h4>
          <div className="flex space-x-3 mt-2">
            <img src="https://via.placeholder.com/20" alt="Facebook" />
            <img src="https://via.placeholder.com/20" alt="Twitter" />
            <img src="https://via.placeholder.com/20" alt="LinkedIn" />
          </div>
        </div>
      </div>
      <div className="mt-6 text-center text-sm text-gray-500" id="Text">
        © 2023 Skillbridge. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
