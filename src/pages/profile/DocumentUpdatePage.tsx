import { DocumentHistoryInfo, DocumentHistoryInfoWithId } from "@lib/types";
import { fetchData } from "@lib/fetch";
import { upload } from "@lib/upload";
import ArrowBack from "@comps/ArrowBack";
import { Button } from "@mui/material";
import { Path } from "@lib/path_map";
import MdEditor from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { SWRUniqueKey } from "@lib/swrKey";
import useSWRMutation from "swr/mutation";
import { useSnackbar } from "notistack";

const DocumentModify = () => {
  const { id } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const [text, setText] = useState("");

  const { data: documentHistory } = useSWR<DocumentHistoryInfoWithId>(
    SWRUniqueKey.DocumentDetail,
    async () => {
      const { find_document_history_by_id } = await fetchData({
        find_document_history_by_id: id,
      });

      console.log(find_document_history_by_id);

      setText(find_document_history_by_id.data?.content || ``);

      return find_document_history_by_id.data;
    }
  );

  const handleSaveClick = useSWRMutation(
    SWRUniqueKey.DocumentDetail,
    async () => {
      const { _id, ...hitoryWhoutId } =
        documentHistory as DocumentHistoryInfoWithId;

      const query: DocumentHistoryInfo = { ...hitoryWhoutId, content: text };

      const { create_document_history } = await fetchData({
        create_document_history: query,
      });

      const { success, data, errmsg } = create_document_history;

      return success ? enqueueSnackbar("更新成功") : enqueueSnackbar(errmsg);
    }
  );

  return (
    <div className="h-screen flex flex-col border">
      <div className="h-16 px-2 flex justify-between items-center border-b bg-white">
        <div className="flex items-center">
          <ArrowBack />
        </div>

        <div className="">
          <Link to={``}>
            <Button
              variant="outlined"
              sx={{ mr: "0.5rem" }}
              onClick={() => navigate(-1)}
            >{`取消`}</Button>
          </Link>

          <Link to={``}>
            <Button
              variant="contained"
              disableElevation
              onClick={handleSaveClick.trigger}
            >{`保存`}</Button>
          </Link>
        </div>
      </div>

      <div className="h-full p-4 rounded overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 border  ">
        <MdEditor
          modelValue={text || ""}
          className="h-full-important"
          previewTheme={"github"}
          onChange={(modelValue) => setText(modelValue)}
          onUploadImg={async (
            files: File[],
            callback: (urls: string[]) => void
          ) => {
            const res = await upload(
              { path: "/upload/static" },
              {
                file: files,
              }
            );

            res.data && callback(res.data);
          }}
        />
      </div>
    </div>
  );
};

export default DocumentModify;
