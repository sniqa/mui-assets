import { fetchData } from "@lib/fetch";
import ArrowBack from "@comps/ArrowBack";
import DialogWraper from "@comps/CustomDialogWraper";
import { Button, TextField } from "@mui/material";
import { Path } from "@lib/path_map";
import MdEditor from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { upload } from "@lib/upload";
import { HamsterLoading } from "@comps/Loading";
import { useChildToParent } from "@lib/utils";
import { DocumentInfo, DocumentInfoWithId } from "@lib/types";

interface DocumentDescript {
  title: string;
  description: string;
}

const DocumentCreate = () => {
  const [text, setText] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const { childHook, parentHook } = useChildToParent<DocumentDescript>();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSaveClick = async () => {
    const value = parentHook();

    const document = {
      ...value,
      content: text,
      autor: "",
    };

    setLoading(true);

    const { create_document } = await fetchData({ create_document: document });

    setLoading(false);

    if (create_document.success) {
      navigate(`${Path.Document}/${create_document.data}`);
    }
  };

  //   加载过程
  if (loading) {
    return <HamsterLoading />;
  }

  return (
    <div className="h-screen">
      <div className="h-16 px-2 flex justify-between items-center  bg-white">
        <div className="flex items-center text-blue-600">
          <ArrowBack />
          <div className="text-xl ml-2 ">{`创建文档`}</div>
        </div>

        <Button
          variant="outlined"
          onClick={() => setOpenDialog(true)}
        >{`保存`}</Button>
      </div>

      <div className="p-4 h-container">
        <MdEditor
          modelValue={text}
          onChange={(modelValue) => setText(modelValue)}
          previewTheme={"github"}
          className="h-full-important rounded-xl"
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

      <DialogWraper
        title={"保存"}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onOk={handleSaveClick}
      >
        <DocumentDetail emitValue={childHook} />
      </DialogWraper>
    </div>
  );
};

export default DocumentCreate;

interface DocumentDetailProps {
  emitValue: (cb: () => DocumentDescript) => void;
}

const DocumentDetail = ({ emitValue }: DocumentDetailProps) => {
  const [descript, setDescript] = useState({
    title: "",
    description: "",
  });

  emitValue(() => descript);

  return (
    <div className="flex flex-col py-2">
      <TextField
        size="small"
        label={`标题`}
        onChange={(e) =>
          setDescript({ ...descript, title: e.currentTarget.value.trim() })
        }
        sx={{ width: "18rem", mb: "1rem" }}
      />
      <TextField
        label={`描述`}
        multiline
        minRows={3}
        onChange={(e) =>
          setDescript({
            ...descript,
            description: e.currentTarget.value.trim(),
          })
        }
      />
    </div>
  );
};
