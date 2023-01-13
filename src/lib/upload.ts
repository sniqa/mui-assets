import { Res } from "./fetch";
import { backendBaseUrl } from "@lib/config";

const getUrl = (lastPath: string) => `${backendBaseUrl}${lastPath}`;

const uploadRequestOptions = (formdata: FormData) => ({
  method: "POST",
  body: formdata,
});

export interface UploadConfig {
  path: string;
}

interface UploadFile {
  name?: string;
  file: File | File[];
  filename?: string;
}

export const upload = async <T>(
  config: UploadConfig,
  targetFile: UploadFile
): Promise<Res<any>> => {
  const url = getUrl(config.path);

  const formdata = new FormData();

  const { name = "", file, filename } = targetFile;

  if (Array.isArray(file)) {
    for (let i = 0; i <= file.length; i++) {
      const f = file[i];
      f && formdata.append("file", f, filename);
    }
  } else {
    formdata.append(name, file, filename);
  }

  const options = uploadRequestOptions(formdata);

  return fetch(url, options)
    .then((res) => res.ok && res.json())
    .catch((err) => {
      return { success: false };
    });
};
