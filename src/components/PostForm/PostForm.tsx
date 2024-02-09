import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RealTimeEditor, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { Models } from "appwrite";
import toast from "react-hot-toast";

export interface PostValues {
  title: string;
  slug: string;
  content: string;
  imageFile: FileList;
  featuredImage: string;
  status: string;
  userId: string;
}

interface Props {
  post?: PostValues & Models.Document;
}
const PostForm: React.FC<Props> = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm<PostValues>({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.auth.userData);

  const submit = async (data: PostValues) => {
    if (post) {
      const file = data.imageFile[0]
        ? await appwriteService.uploadFile(data.imageFile[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        toast.success("Article updated!");
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.imageFile[0]
        ? await appwriteService.uploadFile(data.imageFile[0])
        : null;

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: String(userData?.$id),
          userName: String(userData?.name),
        });

        if (dbPost) {
          toast.success("Article added!");

          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value: string) => {
    if (value) {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title!), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title: "
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug: "
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RealTimeEditor
          label="Content: "
          defaultValue={getValues("content")}
          control={control}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image: "
          type="file"
          className="mb-4"
          accept="image/png , image/jpg, image/jpeg, image/gif"
          {...register("imageFile", {
            required: !post,
          })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={String(appwriteService.getFilePreview(post.featuredImage))}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
