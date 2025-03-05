import AddPost from './components/AddPost';
import Post from "./components/Post";
import { useSelector} from 'react-redux'

const PostPage = () => {

  const post = useSelector((state) => state.POST)

  return (

    <>
      <div className={`bg-gradient-to-b from-green-50 to-green-200 min-h-[87vh] flex justify-center items-center p-10 flex-col`}>
        <div className='mx-2 flex items-center w-full gap-4 flex-col'>
          <div className='w-full max-w-xl xl:mx-0 mx-auto'>
            <AddPost />

            {post.map((item) =>
              <Post item={item} key={item.id} />
            )}
          </div>
        </div>
      </div>

    </>
  )
}

export default PostPage