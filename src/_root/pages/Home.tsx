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

  const [isExpanded, setIsExpanded] = useState(false);

  const handleBlockClick = () => {
    setIsExpanded(!isExpanded);
  };
  

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
      <div className="flex flex-1 z-10 bg-[#f6f6f8]"
        onClick={() => {
          if (showPopup == true) {
            setShowPopup(false);
          }
        }}
      >
        <div className="pt-[10px]">
          <div className="">
            <div className="w-full flex flex-row justify-between px-3">
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
              <h3 className="font-bold text-[20px] mt-[48px] text-center w-full px-3">Кроссовки. Мода. Заебись.</h3>
                <div className="flex w-full justify-center">
              <p className="text-[16px] leading-[20px] text-center px-[12px] w-full px-auto max-w-[310px] text-[#808187] pb-[48px]">Закупитесь кроссовками на любой вкус, цвет и размер ноги</p>
                </div>
            </div>

            {showPopup && (
              <div className="popup absolute bg-[#fff] rounded-[16px] z-50"
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
              <><div
              className={`bg-[#fff] py-[2px] my-[4px] cursor-pointer ${isExpanded ? 'expanded' : ''}`}
              onClick={handleBlockClick}
            >
              <div className="flex flex-row justify-between px-2">
              <p className="text-[17px]">Фильтры</p>
              <img src="/assets/icons/filter.png" alt="" className="w-[24px] h-[24px]" />
              </div>
              {isExpanded && (
                <div className="px-3">
                  <p className="text-[15px] text-[#626466]">Тут будут фильтры</p>
                </div>
              )}
            </div>
                <ul className="flex flex-row w-full flex-wrap justify-between bg-[#f6f6f8] pb-[20px]">
                    {posts?.documents.map((post: Models.Document) => (
                      <li key={post.$id} className="flex justify-center w-[49%] my-[1%]">
                        <div className="rounded-[0px] bg-[#ffffff]">
                          <Link to={`/posts/${post.$id}`}>
                            <img
                              src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
                              alt="post image"
                              className="w-full rounded-[0px] mb-[8px]" />
                          </Link>

                          <div className="flex-between mb-0 p-0">
                            <div className="flex items-center mb-0 p-0 w-full">
                              <div className="flex flex-col w-full">
                                <p className="text-[15px] text-dark-1 mx-2 mb-0 p-0">
                                  {post.caption}
                                </p>
                                <p className="text-[14px] mx-2 text-[#191920af]">{post.colors.length} цвет</p>
                                <p className="text-[15px] mb-[3px] mx-2 text-[#000000]">{post.price} BYN</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul></>
            )}
          </div>
        </div>
      </div></>
  );
};

export default Home;
