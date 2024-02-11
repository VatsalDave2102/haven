import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RealTimeEditor, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import toast from "react-hot-toast";
import { Post, PostValues, addPost, updatePost } from "../../store/postSlice";
import { AppwriteException } from "appwrite";

interface Props {
  post?: Post;
}

const PostForm: React.FC<Props> = ({ post }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm<PostValues>({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
        dispatch(updatePost(dbPost as Post));
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
        try {
          const dbPost = await appwriteService.createPost({
            ...data,
            userId: String(userData?.$id),
            userName: String(userData?.name),
          });

          if (dbPost) {
            dispatch(addPost(dbPost as Post));
            toast.success("Article added!");

            navigate(`/post/${dbPost.$id}`);
          }
        } catch (error) {
          const newError = error as AppwriteException;
          toast.error(newError.message);
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
    <div className="bg-secondary rounded-sm p-4 shadow">
      <h1 className="text-2xl font-bold text-primary mb-2">Add details</h1>
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-1">
        <div className="w-full">
          <Input
            label="Title: "
            placeholder="Title"
            className={`mb-4 ${
              errors.title && "focus:ring-2 focus:ring-red-500 ring-inset"
            }`}
            {...register("title", { required: true })}
          />
          <Input
            label="Slug: "
            placeholder="Slug"
            className={`mb-4 ${
              errors.title && "focus:ring-2 focus:ring-red-500 ring-inset"
            }`}
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
        </div>
        <div className="w-full">
          <Input
            label="Featured Image: "
            type="file"
            className={`mb-4 ${
              errors.title && "focus:ring-2 focus:ring-red-500 ring-inset"
            }`}
            accept="image/png , image/jpg, image/jpeg, image/gif"
            {...register("imageFile", {
              required: !post,
            })}
          />
          {post && (
            <div className="w-full h-80  mb-4 mx-auto">
              <img
                src={appwriteService
                  .getFilePreview(post.featuredImage)
                  .toString()}
                alt={post.title}
                className="rounded-sm h-80 w-full object-cover"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status:"
            className="mb-4"
            {...register("status", { required: true })}
          />
        </div>
        <RealTimeEditor
          label="Content: "
          defaultValue={getValues("content")}
          control={control}
        />
        <Button
          type="submit"
          className=" text-white mt-2 hover:bg-primary/90 duration-300"
          bgColor="bg-primary"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
