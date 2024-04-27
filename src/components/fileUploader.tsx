import { useDropzone, FileWithPath } from "react-dropzone";
import { useCallback, useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

type Props = {
  setState: (file: string) => void;
  mediaUrl: string;
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formattedDate} at ${time}`;
}

export default function FileUploader({ setState, mediaUrl }: Props) {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedfile: FileWithPath[]) => {
      setFile(acceptedfile);
      setState(convertFileToUrl(acceptedfile[0]));
      setFileUrl(convertFileToUrl(acceptedfile[0]));
    },
    [file],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".heic"] },
  });

  return (
    <div className="w-full h-full flex justify-center">
      <div
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
      </div>
    </div>
  );
}
