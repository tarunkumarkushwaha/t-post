import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

export default function ImageViewModal({ onCancelClick, item, open }) {
  const [activeImageNum, setCurrent] = useState(0);
  const length = item?.imageSrc?.length || 0;

  if (!Array.isArray(item?.imageSrc) || length === 0) return null;

  const nextSlide = () => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  return (
    <Dialog open={open} onClose={onCancelClick} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4 smooth-entry">
        <DialogPanel className="w-full max-w-sm rounded-lg bg-white shadow-lg p-6 relative">
    
          <button
            onClick={prevSlide}
            className="absolute left-1 top-1/2 transform -translate-y-1/2 text-3xl text-cyan-700 hover:text-violet-400 z-10 cursor-pointer"
          >
            {"<"}
          </button>


          <div className="flex justify-center">
            <img
              src={item.imageSrc[activeImageNum]}
              alt={`Slide ${activeImageNum + 1}`}
              className="rounded-md w-full h-full max-w-md max-h-80"
            />
          </div>

       
          <button
            onClick={nextSlide}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-3xl text-cyan-700 hover:text-violet-400 z-10 cursor-pointer"
          >
            {">"}
          </button>


          <div className="mt-4 flex justify-end">
            <button
              onClick={onCancelClick}
              className="px-4 cursor-pointer py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}