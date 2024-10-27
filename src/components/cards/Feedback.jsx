import React from 'react'
import { Link } from 'react-router-dom'

function Feedback() {
  return (
    <article className="flex flex-col max-w-xl bg-white shadow-lg rounded-lg overflow-hidden h-[200px]">
      <div>
        <p className="p-8 text-gray-700 h-[60%]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum,
          quibusdam.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Illum, 6
        </p>
      </div>
      <hr className="custom-line w-[90%] h-[1px] rounded-lg mx-auto mt-2 bg-button" />
      <div className="flex flex-row items-center justify-between py-2 px-8">
        <div className="flex items-center gap-3">
            <img className="h-8 rounded-md" src="https://th.bing.com/th/id/OIP.Tv3oG-Is7dcMNcysxIVwLAHaHa?w=199&h=199&c=7&r=0&o=5&pid=1.7" alt="" />
            Some
        </div>
        <div className="px-3 py-2 bg-secondarybtn rounded-md text-sm">
            <Link>Read Full Story</Link>
        </div>
      </div>
    </article>
  )
}

export default Feedback