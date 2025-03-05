import { useEffect, useState } from 'react';
import ImageViewModal from './ImageViewModal';
import { useSelector, useDispatch } from 'react-redux'
import { deletePost, modPost } from "../../redux/postSlice";
import EditPostModal from "./EditPostModal";

const Post = ({ item }) => {
    const [showMore, setShowMore] = useState(false);
    const [showImageViewModal, setShowImageViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [comment, setComment] = useState("");
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [commentBox, setCommentBox] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [animateLike, setAnimateLike] = useState(false);
    const [animateDislike, setAnimateDislike] = useState(false);
    const [animateComment, setAnimateComment] = useState(false);

    const post = useSelector((state) => state.POST)
    const dispatch = useDispatch()

    const toggleLike = () => {
        let newLike = liked ? item.like - 1 : item.like + 1;
        let newDislike = disliked ? item.dislike - 1 : item.dislike;

        setAnimateLike(true);
        setTimeout(() => setAnimateLike(false), 300);

        dispatch(modPost({
            id: item.id,
            post: item.post,
            imageSrc: item.imageSrc,
            like: newLike,
            dislike: newDislike,
            comments: item.comments
        }));

        setLiked(!liked);
        if (disliked) setDisliked(false);
    };

    const toggleDislike = () => {
        let newDislike = disliked ? item.dislike - 1 : item.dislike + 1;
        let newLike = liked ? item.like - 1 : item.like;

        setAnimateDislike(true);
        setTimeout(() => setAnimateDislike(false), 300);

        dispatch(modPost({
            id: item.id,
            post: item.post,
            imageSrc: item.imageSrc,
            like: newLike,
            dislike: newDislike,
            comments: item.comments
        }));

        setDisliked(!disliked);
        if (liked) setLiked(false);
    };


    const addComment = () => {
        if (comment.trim()) {
            dispatch(modPost({
                id: item.id,
                post: item.post,
                imageSrc: item.imageSrc,
                like: item.like,
                dislike: item.dislike,
                comments: [...item.comments, comment]
            }));
            setComment("")
        }
    };

    const toggleCommentBox = () => {
        setCommentBox(!commentBox);
        setAnimateComment(true);
        setTimeout(() => setAnimateComment(false), 300);
    };

    const handleDelete = () => {
        dispatch(deletePost(item))
        // alert("post deleted")
    };

    const createdTime = item.id;

    const getTimeElapsed = (createdTime) => {
        const createdDate = new Date(createdTime).getTime();
        const currentTime = new Date().getTime();
        const seconds = (currentTime - createdDate) / 1000;

        if (seconds < 0) return "Just now";

        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        return days > 0 ? `${days}d` : hours > 0 ? `${hours}h` : `${Math.max(0, minutes)}m`;
    };

    return (
        <div className="pt-4 m-4 side-entry text-[15px] w-full max-w-xl rounded-lg shadow border bg-white border-gray-300 mx-auto">
            <div className="flex justify-between px-2 items-center">
                <div className="text-tiny"> {getTimeElapsed(createdTime)} ago </div>
                <div className="relative">
                    <button className='mx-3 cursor-pointer font-extrabold text-xl' onClick={() => setShowEdit(!showEdit)}>⋮</button>
                    {showEdit && (
                        <div className="absolute bg-white rounded border side-entry border-amber-300 shadow-2xl text-left min-w-[150px] top-6 right-5">
                            <button onClick={handleDelete} className="px-2.5 w-full py-1 text-left hover:bg-gray-200">Delete</button>
                            <button onClick={() => setShowEditModal(true)} className="px-2.5 w-full py-1 text-left hover:bg-gray-200">Edit</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="px-2 py-2">
                <p>
                    {showMore ? item.post : `${item.post.substring(0, 250)}`}
                    {item.post.length > 200 && (
                        <button className='text-blue-600 underline ml-2 smooth-entry cursor-pointer' onClick={() => setShowMore(!showMore)}>
                            {showMore ? "Show less" : "Show more"}
                        </button>
                    )}
                </p>
            </div>

            {item.imageSrc.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center">
                    {item.imageSrc.slice(0, 3).map((src, index) => (
                        <img key={index} className="cursor-pointer h-32 w-32 mb-5" src={src} alt={`post-${index}`} onClick={() => setShowImageViewModal(true)} />
                    ))}
                    {item.imageSrc.length > 3 && (
                        <div className="relative flex items-center justify-center w-32 h-32 bg-gray-800 text-white cursor-pointer" onClick={() => setShowImageViewModal(true)}>
                            +{item.imageSrc.length - 3}
                        </div>
                    )}
                </div>
            )}

            <div className="flex justify-between p-3 border-t border-gray-200 text-xs text-gray-600">
                <button className="flex items-center gap-2 cursor-pointer" onClick={toggleLike}>
                    {!liked ? (
                        <>
                            <img
                                className={animateLike ? "button-clicked" : ""}
                                width="20"
                                height="20"
                                src="https://img.icons8.com/ios/50/facebook-like--v1.png"
                                alt="like"
                            />
                            <p className="font-bold">Like ({item.like})</p>
                        </>
                    ) : (
                        <>
                            <img
                                className={animateLike ? "button-clicked" : ""}
                                width="20"
                                height="20"
                                src="https://img.icons8.com/ios-filled/50/facebook-like.png"
                                alt="liked"
                            />
                            <p className="text-blue-700 font-bold">Like ({item.like})</p>
                        </>
                    )}
                </button>

                <button className="flex items-center gap-2 cursor-pointer" onClick={toggleDislike}>
                    {!disliked ? (
                        <>
                            <img
                                className={animateDislike ? "button-clicked" : ""}
                                width="20"
                                height="20"
                                src="https://img.icons8.com/ios/50/thumbs-down.png"
                                alt="dislike"
                            />
                            <p className="font-bold">Dislike ({item.dislike})</p>
                        </>
                    ) : (
                        <>
                            <img
                                className={animateDislike ? "button-clicked" : ""}
                                width="20"
                                height="20"
                                src="https://img.icons8.com/ios-filled/50/thumbs-down.png"
                                alt="disliked"
                            />
                            <p className="text-blue-700 font-bold">Dislike ({item.dislike})</p>
                        </>
                    )}
                </button>

                <button className="flex items-center gap-2 cursor-pointer" onClick={toggleCommentBox}>
                    <>
                        <img
                            className={animateComment ? "button-clicked" : ""}
                            width="18"
                            height="18"
                            src="https://img.icons8.com/ios/50/comments--v1.png"
                            alt="comments"
                        />
                        <p className="font-bold">Comments ({item.comments.length})</p>
                    </>
                </button>
            </div>

            {commentBox && (
                <div className="p-3 side-entry">
                    {item.comments.length === 0 ? (
                        <p className="text-gray-500 text-center">No comments yet. Be the first to comment here!</p>
                    ) : (
                        item.comments.map((comment, index) => (
                            <p key={index} className="p-2 side-entry bg-slate-100 border border-cyan-200 rounded my-1">{comment}</p>
                        ))
                    )}
                    <textarea
                        className="w-full p-2 border rounded mt-2"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment..."
                    />
                    <button onClick={addComment} className="bg-blue-500 text-white px-3 py-1 rounded mt-2">Post</button>
                </div>
            )}

            {showEditModal && <EditPostModal open={showEditModal} onClose={() => {
                setShowEditModal(false)
                setShowEdit(false)
            }}
                postData={item} />}
            <ImageViewModal open={showImageViewModal} item={item} onCancelClick={() => setShowImageViewModal(false)} />
        </div>
    );
};

export default Post;
