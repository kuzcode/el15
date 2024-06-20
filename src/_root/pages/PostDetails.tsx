import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui";
import { Loader } from "@/components/shared";
import {
  useGetPostById,
} from "@/lib/react-query/queries";
const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: post, isLoading } = useGetPostById(id);
  return (
    <div className="">
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost absolute">
          <img
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>

      {isLoading || !post ? (
        <Loader />
      ) : (
        <div className="">
          <img
            src={post.imageUrl}
            className="w-[100%] rounded-[12px]"
          />

          <h1 className="text-[32px] font-bold mx-3">{post.caption} - {post.price}BYN</h1>
          <h1 className="text-[32px] font-bold">{post.description}</h1>

          <div className="px-[10px] mt-[4px] flex flex-row">
            {post.colors.map((color: any) => (
              <div style={{
                backgroundColor: `#${color}`,
              }}
                className="w-[28px] h-[28px] mx-[2px] border-[2px] border-[#00000008] rounded-full"
              ></div>
            ))}

            <p className="text-[17px] text-[#191920af]">{post.colors.length} цвет</p>

            <div className="px-[10px] mt-[4px] flex flex-row">
            {post.sizes.map((size: any) => (
              <div className="bg-white px-5 py-2 border-[2px] border-[#000] rounded-[10px]">
              <p className="text-[24px]">{size}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
