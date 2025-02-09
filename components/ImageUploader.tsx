"use client";
import { uploadToCloudinary } from "@/actions/uploadImage";
import { toast } from "sonner";

const ImageUploader = ({
  setFunction,
}: {
  setFunction: React.Dispatch<React.SetStateAction<string[]>> | any;
}) => {
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const formData = new FormData();
    formData.append("file", files[0]);
    console.log("Uploaded files:", files);
    
    files.forEach((file) => formData.append("files", file));
    const toastId = toast.loading("Uploading...");

    try {
        const response = await uploadToCloudinary(formData);
        toast.dismiss(toastId); 
      if (response.success) {
        setFunction((prevImages : any) => [...prevImages, ...response.results]);
        toast.success("Uploaded Successfully",{id: toastId});
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      toast.error("Upload error");
      console.error(error);
    }
  }

  return (
    <div>
      <div>
        <label htmlFor="file-upload">
          <div
            className="min-h-[300px] w-full flex justify-center items-center border border-dashed border-opacity-20
              border-white bg-white bg-opacity-5 hover:bg-opacity-10 rounded-xl"
          >
            <div className="h-full w-full flex justify-center items-center flex-col opacity-35">
              <svg
                className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="text-md font-light">Upload Proof of Works</p>
            </div>
          </div>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            multiple
            onChange={handleImageUpload}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
