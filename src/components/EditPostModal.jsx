import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { modPost } from "../../redux/postSlice";

const EditPostModal = ({ open, onClose, postData }) => {
  const [inputPost, setInputPost] = useState(postData.post);
  const [file, setFile] = useState(postData.imageSrc);
  const dispatch = useDispatch();

  function handleChange(e) {
    setFile([...file, URL.createObjectURL(e.target.files[0])]);
  }

  const updatePost = () => {
    if (inputPost.trim() === "") {
      alert("Post cannot be empty");
      return;
    }

    dispatch(modPost({
      id: postData.id,
      post: inputPost,
      imageSrc: file,
      like: postData.like,
      dislike: postData.dislike,
      comments: postData.comments,
    }));

    onClose(); 
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full smooth-entry max-w-md rounded-lg bg-white shadow-lg p-6">
          <DialogTitle className="text-lg font-semibold text-gray-900">Edit Post</DialogTitle>

          <textarea
            value={inputPost}
            onChange={(e) => setInputPost(e.target.value)}
            className="w-full min-h-24 p-2 border rounded-md focus:outline-none"
            placeholder="Edit your post..."
          />

          {file.length > 0 && (
            <div className="flex gap-3 py-2 overflow-auto">
              {file.map((item, index) => (
                <div key={index} className="relative w-20">
                  <button
                    className="absolute top-1 left-[80%] bg-red-600 rounded-full p-1 shadow"
                    onClick={() => setFile(file.filter((_, i) => i !== index))}
                  >
                    <p className="p-1 font-bold text-white">X</p>
                  </button>
                  <img src={item} alt="Preview" className="w-full rounded-md" />
                </div>
              ))}
            </div>
          )}

          <label htmlFor="edit-file" className="block mt-2 cursor-pointer text-blue-600">
            <input id="edit-file" type="file" className="hidden" onChange={handleChange} />
            Add Image
          </label>

          <div className="mt-4 flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 text-gray-700 cursor-pointer bg-gray-200 rounded-md">Cancel</button>
            <button onClick={updatePost} className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-md">Update</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default EditPostModal;
