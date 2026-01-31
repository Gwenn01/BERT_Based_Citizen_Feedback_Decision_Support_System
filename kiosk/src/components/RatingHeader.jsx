import React from 'react'

const RatingHeader = ({ emoji, score, label, color }) => (
  <div className="flex flex-col items-center justify-end h-full p-2">
    
    {/* 1. Label Container 
        We give this a fixed height (h-10) and use items-end.
        This ensures that even if the text wraps to 2 lines, 
        the emojis below will all start at the exact same vertical line. 
    */}
    <div className="h-10 w-full flex items-end justify-center mb-2">
      <span className="text-[10px] md:text-xs font-bold text-center leading-tight">
        {label}
      </span>
    </div>

    {/* 2. Image and Score Container */}
    <div className="flex flex-col items-center justify-center gap-2">
      {/* <img 
          src={emoji} 
          alt={label} 
          className="w-10 h-10 md:w-14 md:h-14 object-contain" 
      /> */}
      {/* Applied the color prop here if you want the number colored */}
      <span className={`font-bold text-base `}>
        {score}
      </span>
    </div>

  </div>
);

export default RatingHeader