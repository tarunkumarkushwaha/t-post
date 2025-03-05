import { useState } from "react";
import EmojiModal from "./EmojiModal";
import { useSelector, useDispatch } from 'react-redux'
import { addPost } from "../../redux/postSlice";

export default function AddPost() {
    const [showEmojiModal, setshowEmojiModal] = useState(false);
    const [inputPost, setinputPost] = useState("");
    const [file, setFile] = useState([]);

    const post = useSelector((state) => state.POST)
    const dispatch = useDispatch()

    function handleChange(e) {
        setFile((olditem) => {
            return [...olditem, URL.createObjectURL(e.target.files[0])]
        })
    }

    const addNewPost = () => {
        if (inputPost === "") {
            alert("empty post")
            return
        }
        dispatch(addPost({
            id: new Date().toString(),
            post: inputPost,
            imageSrc: file,
            like: 0,
            dislike: 0,
            comments: []
        }))
        setFile([])
        setinputPost("")
    }

    console.log(post)

    return (
        <>
            <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl w-full">
                <div className="flex flex-col justify-between p-4">
                 
                    <div className="p-3 flex w-full gap-2.5">
                        <textarea
                            value={inputPost}
                            onChange={(e) => setinputPost(e.target.value)}
                            className="flex-1 max-h-96 min-h-40 resize-none focus:outline-none text-sm"
                            placeholder="Create a post..."
                        />
                    </div>

                   
                    {file.length > 0 && (
                        <div className="w-full flex gap-3 overflow-auto py-2">
                            {file.map((item, index) => (
                                <div key={index} className="relative w-28">
                                    <button
                                        className="absolute top-1 left-[90%] bg-white rounded-full p-1 shadow"
                                        onClick={() => setFile(file.filter((_, i) => i !== index))}
                                        aria-label="Remove image"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                                            <path d="M5.2 5.2h9.6v9.6H5.2V5.2Z" fill="white" />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M10 19.6c5.302 0 9.6-4.298 9.6-9.6S15.302.4 10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6Zm-1.552-12.848c-.469-.469-1.228-.469-1.696 0s-.469 1.229 0 1.697l1.552 1.552-1.552 1.552c-.469.469-.469 1.228 0 1.696s1.229.469 1.696 0l1.552-1.552 1.552 1.552c.468.469 1.228.469 1.696 0s.469-1.229 0-1.696L11.697 10l1.552-1.552c.469-.468.469-1.228 0-1.696s-1.229-.469-1.696 0L10 8.303 8.448 6.752Z"
                                                fill="#EF4444"
                                            />
                                        </svg>
                                    </button>
                                    <img src={item} alt="Uploaded preview" className="w-full h-auto rounded-md" />
                                </div>
                            ))}
                        </div>
                    )}

                
                    <div className="w-full">
                        <div className="flex items-center gap-3">
                            <div className="flex flex-1 px-3 gap-4 items-center">
                              
                                <label htmlFor="inputs" className="cursor-pointer">
                                    <input id="inputs" type="file" className="hidden" onChange={handleChange} />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" fill="none">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M2.666 0.778c-.982 0-1.778.796-1.778 1.778v8.889c0 .982.796 1.778 1.778 1.778h10.667c.982 0 1.778-.796 1.778-1.778V2.556c0-.982-.796-1.778-1.778-1.778H2.666ZM13.333 11.445H2.666L6.222 4.333l2.667 5.333 1.778-3.556 2.666 5.334Z"
                                            fill="#6B7280"
                                        />
                                    </svg>
                                </label>

                        
                                <button className="mx-1 cursor-pointer" onClick={() => setshowEmojiModal(true)} aria-label="Add emoji">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M16 23.11c3.927 0 7.111-3.184 7.111-7.111 0-3.927-3.184-7.111-7.111-7.111-3.927 0-7.111 3.184-7.111 7.111 0 3.927 3.184 7.111 7.111 7.111Zm-2.667-8c.49 0 .889-.398.889-.889s-.398-.889-.889-.889-.889.398-.889.889.398.889.889.889Zm6.222-.889c0 .49-.398.889-.889.889s-.889-.398-.889-.889.398-.889.889-.889.889.398.889.889Zm-.413 4.92c.347-.347.347-.91 0-1.258-.347-.347-.91-.347-1.257 0-1.042 1.041-2.73 1.041-3.772 0-.347-.347-.91-.347-1.257 0-.347.347-.347.91 0 1.258 1.736 1.736 4.55 1.736 6.286 0Z"
                                            fill="#6B7280"
                                        />
                                    </svg>
                                </button>



                            
                                <EmojiModal
                                    open={showEmojiModal}
                                    inputPost={inputPost}
                                    setinputPost={setinputPost}
                                    onCancelClick={() => setshowEmojiModal(false)}
                                />
                            </div>

                            <button
                                onClick={addNewPost}
                                className="bg-slate-950 py-2.5 cursor-pointer rounded-md px-4 text-white text-xs font-medium hover:bg-cyan-800 transition"
                            >
                                Create Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}