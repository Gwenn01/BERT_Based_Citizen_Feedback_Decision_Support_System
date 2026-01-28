import React, { useRef, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import { X } from "lucide-react";

const VirtualKeyboard = ({ onChange, onKeyPress, inputValue = "", onClose }) => {
  const keyboard = useRef();

  // Sync keyboard's internal state with the actual input value
  useEffect(() => {
    if (keyboard.current) {
      keyboard.current.setInput(inputValue);
    }
  }, [inputValue]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 shadow-2xl z-50">
      {/* Header with close button */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-300">
        <span className="font-semibold text-gray-700"></span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          type="button"
        >
          <X size={20} className="text-gray-600" />
        </button>
      </div>
      
      {/* Keyboard */}
      <div className="p-2">
        <Keyboard
          keyboardRef={(r) => (keyboard.current = r)}
          onChange={onChange}
          onKeyPress={onKeyPress}
          layoutName="default"
        />
      </div>
    </div>
  );
};

export default VirtualKeyboard;