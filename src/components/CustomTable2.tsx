import CustomDialogWraper from "@comps/CustomDialogWraper";
import CustomTable, { CustomTableProps } from "@comps/CustomTable";
import CustomUpload, { UploadState } from "@comps/CustomUpload";
import { ReactNode, useCallback, useState } from "react";

type CustomTable2Props<TData extends Record<string, any>> = Omit<
  CustomTableProps<TData>,
  "onUpload" | "onEdit"
> & {
  downloadTemplate?: string;
  uploadState?: UploadState;
  onEdit?: () => void;
  renderCustomDialogContent?: (
    row: TData | null
    // setValue: React.Dispatch<React.SetStateAction<TData | null>>
  ) => ReactNode;
};

export default function CustomTable2<TData extends Record<string, any> = {}>({
  columns,
  data,
  onDelete,
  onDeleteSeleted,
  onCreate,
  onEdit,
  rowCustomActionsSize,
  rowCustomSelectSize,
  exportCSVFilename,
  downloadTemplate,
  renderCustomDialogContent,
  uploadState,
}: CustomTable2Props<TData>) {
  const [openUpload, setOpenUpload] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRow, setCurrentRow] = useState<TData | null>(null);

  const handleCloseUpload = useCallback(() => setOpenUpload(false), []);
  const handleOpenUpload = useCallback(() => setOpenUpload(true), []);
  const handleCloseDialog = useCallback(() => setOpenDialog(false), []);

  const handleOnEdit = useCallback((data: TData) => {
    setCurrentRow(data);
    setOpenDialog(true);
  }, []);

  const handleOnCreate = useCallback(() => {
    setCurrentRow(null);
    setOpenDialog(true);
  }, []);

  const handleOnOk = useCallback(() => {
    currentRow ? onEdit && onEdit() : onCreate && onCreate();
    setOpenDialog(false);
  }, [currentRow, onCreate, onEdit]);

  return (
    <>
      <CustomTable
        columns={columns}
        data={data}
        exportCSVFilename={exportCSVFilename}
        onUpload={uploadState && handleOpenUpload}
        onCreate={handleOnCreate}
        onEdit={handleOnEdit}
        rowCustomActionsSize={rowCustomActionsSize}
        rowCustomSelectSize={rowCustomSelectSize}
        onDelete={onDelete}
        onDeleteSeleted={onDeleteSeleted}
      />

      {uploadState && (
        <CustomUpload
          onClose={() => setOpenUpload(false)} 
          title={""} 
          // uploadState={{}}
           templateDownloadPath={downloadTemplate || ''}
          open={openUpload}
          // onCancel={handleCloseUpload}
          // onOk={handleCloseUpload}
          {...uploadState}        />
      )}

      {renderCustomDialogContent && (
        <CustomDialogWraper
          title={""}
          open={openDialog}
          onClose={handleCloseDialog}
          onOk={handleOnOk}
        >
          {renderCustomDialogContent(currentRow)}
        </CustomDialogWraper>
      )}
    </>
  );
}
