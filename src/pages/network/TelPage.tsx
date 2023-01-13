import CustomTable from "@comps/CustomTable2";
import CustomUpload from "@comps/CustomUpload";
import { fetchData } from "@lib/fetch";
import { PathMap } from "@lib/path_map";
import { SWRUniqueKey } from "@lib/swrKey";
import type { TelInfo } from "@lib/types";
import { MRT_ColumnDef } from "material-react-table";
import { useCallback, useState } from "react";
import useSWR from "swr";
import { uploadTelsUrl } from "@lib/config";
import { useSnackbar } from "notistack";

const columns: MRT_ColumnDef<TelInfo>[] = [
  {
    accessorKey: "tel_number",
    header: "号码",
    size: 160,
  },
  {
    accessorKey: "location",
    header: "装机地址",
    size: 160,
  },
  {
    accessorKey: "long_distance",
    header: "是否开通长途",
    size: 160,
  },
  {
    accessorKey: "panel_port",
    header: "面板端口",
    size: 160,
  },
  {
    accessorKey: "remark",
    header: "备注",
    size: 160,
  },
];

export default function TelPage() {
  const [openUpload, setOpenUpload] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleCloseUpload = useCallback(() => setOpenUpload(false), []);

  const handleOpenUpload = useCallback(() => setOpenUpload(true), []);

  // 获取数据
  const { data } = useSWR(SWRUniqueKey.Tels, async () => {
    const { find_tels } = await fetchData({ find_tels: {} });

    const { success, data, errmsg } = find_tels;

    return success ? data : (enqueueSnackbar(errmsg), undefined);
  });

  return (
    <>
      <div className="h-16 bg-white mb-4 text-2xl px-4 flex items-center">
        {PathMap.Tel}
      </div>

      <div className="px-4">
        <CustomTable<TelInfo>
          columns={columns}
          data={data}
          onDelete={() => {}}
          downloadTemplate={`/public/固话模板.csv`}
          rowCustomActionsSize={60}
          rowCustomSelectSize={25}
          // uploadState={{
          //   action: uploadTelsUrl,
          // }}
        />
      </div>
    </>
  );
}
