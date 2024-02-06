import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { PostValues } from "./PostForm/PostForm";
Controller;

interface Props {
  control: Control<PostValues, unknown, PostValues>;
  label: string;
  defaultValue: string;
}
const RealTimeEditor: React.FC<Props> = ({
  control,
  label,
  defaultValue = "",
}) => {
  return (
    <div className="w-full">
      {label && <label className="inlince-block mb-1 pl-1">{label}</label>}
      <Controller
        name="content"
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default RealTimeEditor;
