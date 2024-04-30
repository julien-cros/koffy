import { useDropzone, FileWithPath } from "react-dropzone";
import { useCallback, useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

type Props = {
  setState: (file: string) => void;
  mediaUrl: string;
};

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export default function FileUploader({ setState, mediaUrl }: Props) {
  const [fileUrl, setFileUrl] = useState(mediaUrl);


	const handleDelete = async () => {
		await utapi.deleteFiles(fileUrl);
		setFileUrl("");
		setState("");
	}

  return (
    <div className="w-full h-full flex justify-center">
      <div
        className={`
				${mediaUrl ? "w-fit" : "w-3/4 h-80 lg:h-[480px]"}
				flex flex-col items-center justify-center border-[1px] border-black dark:border-white rounded-2xl p-5`}
      >
        {fileUrl.length ? (
          <div className="flex flex-col items-center justify-center">
            <img
              src={fileUrl}
              alt="image"
              className="h-80 lg:h-[480px] w-full rounded-2xl"
            />
            <div className="w-3/4 border-b-[1px] border-black dark:border-white p-2" />
						<UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setState(res[0].url);
              setFileUrl(res[0].url);
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
            className="cursor-pointer"
          />
            <TrashIcon
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                handleDelete();
              }}
            />
          </div>
        ) : (
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setState(res[0].url);
              setFileUrl(res[0].url);
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
            className="cursor-pointer"
          />
        )}
      </div>
      {/* <div
        {...getRootProps()}
        className={`
				${fileUrl ? "w-fit" : "w-3/4 h-80 lg:h-[480px]"}
				flex flex-col items-center justify-center border-[1px] border-black dark:border-white rounded-2xl p-5`}
      >
        <input {...getInputProps()} className="cursor-pointer" />

        {fileUrl ? (
          <div className="flex flex-col items-center justify-center">
            <img
              src={fileUrl}
              alt="image"
              className="h-80 lg:h-[480px] w-full rounded-2xl"
            />
            <div className="w-3/4 border-b-[1px] border-black dark:border-white p-2" />
            <button>Click or drag to replace</button>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center space-y-4">
            <ArrowUpTrayIcon width={32} height={32} />
            <p>Drag photo here</p>
            <p className=" font-light ">PNG, JPG, JPEG, HEIC</p>
            <button>Click to open in your computer</button>
          </div>
        )}
      </div> */}
    </div>
  );
}
