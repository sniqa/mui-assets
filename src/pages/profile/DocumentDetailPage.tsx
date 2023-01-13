import { DocumentHistoryInfoWithId } from "@lib/types";
import { fetchData } from "@lib/fetch";
import ArrowBack from "@comps/ArrowBack";
import { Button, Step, StepButton, Stepper } from "@mui/material";
import { Path } from "@lib/path_map";
import MdEditor from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HamsterLoading } from "@comps/Loading";
import useSWR from "swr";
import { SWRUniqueKey } from "@lib/swrKey";

const DocumentDetail = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");

  const [documentHistorys, setDocumenthistorys] = useState<
    Array<DocumentHistoryInfoWithId>
  >([]);

  const [curVersionIndex, setCurVersionIndex] = useState(0);

  const [steps, setSteps] = useState([]);

  // 获取数据
  const { data } = useSWR(SWRUniqueKey.DocumentDetail, async () => {
    const { find_document_history_by_document_id, find_document_by_id } =
      await fetchData({
        find_document_history_by_document_id: id,
        find_document_by_id: id,
      });

    setDocumenthistorys(find_document_history_by_document_id.data || []);

    setSteps(
      find_document_history_by_document_id?.data.map(
        (d: DocumentHistoryInfoWithId) =>
          new Date(d.timestamp).toLocaleString("zh-cn", {
            hour12: false,
          })
      )
    );

    return {
      document_history: find_document_history_by_document_id.data || [],
      document: find_document_by_id.data || [],
    };
  });

  return (
    <div className="h-screen flex flex-col">
      <div className="px-2 flex justify-between items-center border-b bg-white">
        <div className="flex items-center">
          <ArrowBack />

          <div className="text-2xl ml-2">{title || ""}</div>
        </div>

        <div className=" flex-grow overflow-auto h-28 flex items-center justify-center scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <Stepper
            activeStep={curVersionIndex}
            nonLinear
            alternativeLabel
            sx={{ fontSize: "0.8rem" }}
          >
            {steps.map((label, index) => (
              <Step key={index} completed={index === curVersionIndex}>
                <StepButton
                  color="inherit"
                  sx={{ pb: 0 }}
                  onClick={() => {
                    setCurVersionIndex(index);
                  }}
                >
                  <div className="text-sm"> {label}</div>
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </div>

        <Link
          to={`${Path.DocumentUpdate}/${documentHistorys[curVersionIndex]?._id}`}
        >
          <Button variant="outlined">{`编辑`}</Button>
        </Link>
      </div>

      <div className="h-full m-4 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 border rounded-xl">
        <MdEditor
          modelValue={documentHistorys[curVersionIndex]?.content || ""}
          className="h-container"
          previewOnly
          previewTheme={"github"}
        />
      </div>
    </div>
  );
};

export default DocumentDetail;
