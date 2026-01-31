import React, { useRef, useEffect, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { X } from "lucide-react";

const VirtualKeyboard = ({ onChange, onKeyPress, inputValue = "", onClose }) => {
  const keyboard = useRef();
  const [layoutName, setLayoutName] = useState("default");

  // Sync keyboard with active input value
  useEffect(() => {
    if (keyboard.current) {
      keyboard.current.setInput(inputValue);
    }
  }, [inputValue]);

  const handleKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName((prev) => (prev === "default" ? "shift" : "default"));
    }

    if (onKeyPress) {
      onKeyPress(button);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 shadow-2xl z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-300">
        <span className="font-semibold text-gray-700">Keyboard</span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          type="button"
        >
          <X size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Keyboard */}
      <div className="p-4">
        <Keyboard
          keyboardRef={(r) => (keyboard.current = r)}
          layoutName={layoutName}
          onChange={onChange}
          onKeyPress={handleKeyPress}
          layout={{
            default: [
              "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "{tab} q w e r t y u i o p [ ] \\",
              "{lock} a s d f g h j k l ; ' {enter}",
              "{shift} z x c v b n m , . / {shift}",
              "{space}"
            ],
            shift: [
              "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
              "{tab} Q W E R T Y U I O P { } |",
              "{lock} A S D F G H J K L : \" {enter}",
              "{shift} Z X C V B N M < > ? {shift}",
              "{space}"
            ]
          }}
        />
      </div>
    </div>
  );
};

export default VirtualKeyboard;
