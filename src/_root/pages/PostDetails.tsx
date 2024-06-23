import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui";
import { Loader } from "@/components/shared";
import {
  useGetPostById,
} from "@/lib/react-query/queries";
import { useState } from "react";
const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: post, isLoading } = useGetPostById(id);

  const [form, setForm] = useState({
    size: 39,
    color: post?.colors[0],
  });
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
        <div className="pb-[100px]">
          <img
            src={post.imageUrl}
            className="w-[100%] rounded-[12px]"
          />

          <h1 className="text-[32px] font-bold mx-3">{post.caption} - <span className="text-[#505050] text-[28px] font-regular">{post.price}BYN</span></h1>
          <h1 className="text-[28px] font-regular mx-3 text-[#616161]">{post.description}</h1>

          <h1 className="text-[32px] font-bold mx-3">Цвета</h1>

          <div className="px-[10px] mt-[4px] flex flex-row">
            {post.colors.map((color: any) => (
              <div
              onClick={() => {
                setForm({...form, color: color})
              }}
              style={{
                backgroundColor: `#${color}`,
                borderColor: form.color === color ? `#${color}` : '#fff'
              }}
                className="w-[36px] h-[36px] mx-[2px] border-[4px] rounded-full"
              ></div>
            ))}
          </div>

          <h1 className="text-[32px] font-bold mx-3">Размеры</h1>

            <div className="px-[10px] mt-[4px] flex flex-row">
            {post.sizes.map((size: any) => (
              <div className="mr-[4px] px-5 py-2 border-[2px] border-[#000] rounded-[14px]"
              onClick={() => {
                setForm({...form, size: size})
              }}
              style={{
                backgroundColor: form.size === size ? '#000' : '#fff'
              }}
              >
              <p className="text-[24px]"
              style={{
                color: form.size === size ? '#fff' : '#000'
              }}
              >{size}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
