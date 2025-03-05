import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import EmojiPicker from "emoji-picker-react";

const EmojiModal = ({ onCancelClick, setinputPost, inputPost, open }) => {
  const onEmojiClick = (emojiObject) => {
    setinputPost(inputPost + emojiObject.emoji);
    onCancelClick();
  };

  return (
    <Dialog open={open} onClose={onCancelClick} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-sm rounded-lg bg-white shadow-lg p-6">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Select an Emoji
          </DialogTitle>
          <div className="mt-4">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onCancelClick}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default EmojiModal;








