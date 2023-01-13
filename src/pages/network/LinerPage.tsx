import CustomTable from "@comps/CustomTable2";
import { uploadLinersUrl } from "@lib/config";
import { fetchData } from "@lib/fetch";
import { PathMap } from "@lib/path_map";
import { SWRUniqueKey } from "@lib/swrKey";
import type { LinerInfo } from "@lib/types";
import { MRT_ColumnDef } from "material-react-table";
import { useCallback, useState } from "react";
import useSWR from "swr";
import { useSnackbar } from "notistack";

const columns: MRT_ColumnDef<LinerInfo>[] = [
  {
    accessorKey: "liner_number",
    header: "专线号",
    size: 160,
  },
  {
    accessorKey: "state",
    header: "状态",
    size: 160,
  },
  {
    accessorKey: "location",
    header: "端口位置",
    size: 160,
  },
  {
    accessorKey: "peer_location",
    header: "对端位置",
    size: 160,
  },
  {
    accessorKey: "liner_type",
    header: "专线类型",
    size: 160,
  },
  {
    accessorKey: "liner_usage",
    header: "用途",
    size: 160,
  },
  {
    accessorKey: "create_timestamp",
    header: "安装时间",
    size: 160,
  },
  {
    accessorKey: "user",
    header: "负责人",
    size: 160,
  },
  {
    accessorKey: "contact_user",
    header: "联系人",
    size: 160,
  },
  {
    accessorKey: "liner_vendor",
    header: "运营商",
    size: 160,
  },
  {
    accessorKey: "liner_price",
    header: "费用",
    size: 160,
  },
  {
    accessorKey: "remark",
    header: "备注",
    size: 160,
  },
];

export default function LinerPage() {
  const { enqueueSnackbar } = useSnackbar();

  // 获取数据
  const { data } = useSWR(SWRUniqueKey.Liner, async () => {
    const { find_liners } = await fetchData({ find_liners: {} });

    const { success, data, errmsg } = find_liners;

    return success
      ? data
      : (enqueueSnackbar(errmsg, { variant: "error" }), undefined);
  });

  return (
    <div className="h-full w-full box-border">
      <div className="h-16 bg-white mb-4 text-2xl px-4 flex items-center">
        {PathMap.Liner}
      </div>

      <div className="px-4 box-border">
        <CustomTable<LinerInfo>
          columns={columns}
          data={data}
          onDelete={() => {}}
          rowCustomActionsSize={80}
          rowCustomSelectSize={30}
          downloadTemplate={`/public/专线模板.csv`}
          // uploadState={{
          //   action: uploadLinersUrl,
          // }}
        />
      </div>
    </div>
  );
}
