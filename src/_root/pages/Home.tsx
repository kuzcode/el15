import { Models } from "appwrite";
import { useState } from 'react';
// import { useToast } from "@/components/ui/use-toast";
import { Loader } from "@/components/shared";
import { Link } from "react-router-dom";
import { useGetRecentPosts } from "@/lib/react-query/queries";

const Home = () => {
  // const { toast } = useToast();
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  const [showPopup, setShowPopup] = useState(false); // Step 1: Create state for popup visibility

  const [cartList] = useState([])

  if (isErrorPosts) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Ошибка</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Ошибка</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-1 z-10"
        onClick={() => {
          if (showPopup == true) {
            setShowPopup(false);
          }
        }}
      >
        <div className="home-container">
          <div className="home-posts">
            <div className="w-full flex flex-row justify-between">
              <h2 className="h3-bold md:h2-bold text-left w-full">EL/15</h2>
              <button
                onClick={() => { setShowPopup(true); }}
              >
                <img
                  src="/assets/icons/cart.svg"
                  className="w-[37px] h-[37px]"
                />
                {(cartList.length !== 0) && (
                  <p>{cartList.length}</p>
                )}
              </button>
            </div>

            <div>
              <h3 className="h3-bold md:h2-bold text-center w-full">Кроссовки. Мода. Заебись.</h3>
              <p className="text-[20px] text-center w-full px-[20%] text-[#808187]">Закупитесь кроссовками на любой вкус, цвет и размер ноги</p>
            </div>

            {showPopup && (
              <div className="popup absolute bg-[#fff] shadow-xl rounded-[16px] z-50"
                onClick={() => { setShowPopup(true) }}
                style={{
                  width: '100%',
                  maxWidth: '600px',
                  minHeight: '120px'
                }}
              >
                <h3 className="font-bold text-left mx-3 mt-2 text-[27px] w-full">Корзина</h3>
                {(cartList.length == 0) ? (
                  <h3 className="mx-3 text-[#6e6e74] text-[17px] text-center mt-2">Корзина пока пуста</h3>
                ) : (
                  <h3>Корзина пока пуста</h3>
                )}
              </div>
            )}

            {isPostLoading && !posts ? (
              <Loader />
            ) : (
              <ul className="flex flex-row flex-wrap justify-center">
                {posts?.documents.map((post: Models.Document) => (
                  <li key={post.$id} className="flex justify-center m-2 h-96">
                    <div className="shadow-xl">
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
                            <button className="bg-black mx-3 text-white font-medium rounded-[6px] mt-1 py-1" onClick={() => { alert(cartList) }}>В корзину +</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div></>
  );
};

export default Home;
