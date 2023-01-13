import CustomTable from "@comps/CustomTable2";
import CustomUpload from "@comps/CustomUpload";
import { fetchData } from "@lib/fetch";
import { PathMap } from "@lib/path_map";
import { SWRUniqueKey } from "@lib/swrKey";
import type { DepartmentInfo } from "@lib/types";
import { MRT_ColumnDef } from "material-react-table";
import { useCallback, useState } from "react";
import useSWR from "swr";
import { useSnackbar } from "notistack";

const columns: MRT_ColumnDef<DepartmentInfo>[] = [
  {
    accessorKey: "department_name",
    // enableClickToCopy: true,
    header: "部门",
    size: 160,
  },
  {
    accessorKey: "locations",
    // enableClickToCopy: true,
    header: "物理位置",
    size: 160,
  },
  {
    accessorKey: "remark",
    // enableClickToCopy: true,
    header: "备注",
    size: 150,
  },
];

export default function DepartmentPage() {
  const { enqueueSnackbar } = useSnackbar();

  const [openUpload, setOpenUpload] = useState(false);

  // 获取数据
  const { data } = useSWR(SWRUniqueKey.Department, async () => {
    const { find_departments } = await fetchData({ find_departments: {} });

    const { success, data, errmsg } = find_departments;

    return success ? data : (enqueueSnackbar(errmsg), undefined);
  });

  return (
    <>
      <div className="h-16 bg-white mb-4 text-2xl px-4 flex items-center">
        {PathMap.Department}
      </div>

      <div className="px-4">
        <CustomTable<DepartmentInfo>
          columns={columns}
          data={data}
          onDelete={() => {}}
          rowCustomActionsSize={35}
          rowCustomSelectSize={15}
        />
      </div>
    </>
  );
}
