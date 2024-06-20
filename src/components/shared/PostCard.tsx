import { Models } from "appwrite";
import { Link } from "react-router-dom";
type PostCardProps = {
  post: Models.Document;
  setCart: any;
  cartList: any;
};

const PostCard = ({ post, setCart, cartList }: PostCardProps) => {
  return (
    <div className="post-card shadow-xl">
      <Link to={`/posts/${post.$id}`}>
        <img
          src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="post image"
          className="post-card_img w-full"
        />
      </Link>

      <div className="flex-between mb-0 p-0">
        <div className="flex items-center mb-0 p-0 w-full">
          <div className="flex flex-col w-full">
            <p className="base-medium lg:body-bold text-dark-1 mx-3 mb-0 p-0">
              {post.caption} · {post.price}BYN
            </p>
            <button className="bg-black mx-3 text-white font-medium rounded-[6px] mt-1 py-1" onClick={() => {setCart(...cartList, post.$id); alert(cartList)}}>В корзину +</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
