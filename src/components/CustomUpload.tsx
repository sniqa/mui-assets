import { upload } from "@lib/upload";
import { Button, Dialog, Link, Typography } from "@mui/material";
import { useCallback, useState, memo } from "react";
import { useDropzone } from "react-dropzone";

import { HamsterLoading } from "@comps/Loading";

export interface UploadState {
  uploadPath: string;
  onUploadStart?: () => void;
  onUploadComplete?: (react: any) => void;
  onComplete?: (result: any) => void;
}

export interface CustomUploadProps {
  open: boolean;
  onClose: () => void;
  templateDownloadPath: string;
  templateName?: string;
  title: string;
  className?: string;
  uploadState?: UploadState;
}

const CustomUpload = ({
  open,
  onClose,
  title,
  templateDownloadPath,
  templateName,
  className,
  uploadState,
}: CustomUploadProps) => {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setLoading(true);

    const res = await upload(
      { path: uploadState?.uploadPath || "" },
      {
        file: acceptedFiles,
      }
    );

    setLoading(false);

    if (res) {
      uploadState?.onComplete && uploadState?.onComplete(res);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <Typography
        className="px-4 pt-4 flex justify-center text-blue-500"
        sx={{ fontSize: "1.6rem" }}
      >
        {title}
      </Typography>

      <div className="flex flex-col p-4">
        <Link
          className="pb-4"
          href={templateDownloadPath}
          download={
            templateName ? templateName : templateDownloadPath.split("/")[1]
          }
        >{`下载模板`}</Link>

        <div
          {...getRootProps()}
          className={`border w-96 h-36 inline-flex rounded-lg items-center justify-center cursor-pointer ${className}`.trim()}
        >
          <input {...getInputProps()} />

          {loading ? <HamsterLoading /> : <Button>{`点击或拖动上传`}</Button>}
        </div>
      </div>

      <Button
        size="large"
        onClick={onClose}
        className={`mb-2`}
      >{`取消`}</Button>
    </Dialog>
  );
};

export default memo(CustomUpload);
