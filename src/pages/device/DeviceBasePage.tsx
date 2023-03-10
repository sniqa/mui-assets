import CustomTable from "@comps/CustomTable2";
import { fetchData } from "@lib/fetch";
import { PathMap } from "@lib/path_map";
import { SWRUniqueKey } from "@lib/swrKey";
import type { DeviceBaseInfo } from "@lib/types";
import { MRT_ColumnDef } from "material-react-table";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import useSWR from "swr";

const columns: MRT_ColumnDef<DeviceBaseInfo>[] = [
  {
    accessorKey: "vendor",
    // enableClickToCopy: true,
    header: "设备品牌",
    size: 150,
  },
  {
    accessorKey: "device_model",
    // enableClickToCopy: true,
    header: "设备型号",
    size: 150,
  },
  {
    accessorKey: "manufacture_date",
    // enableClickToCopy: true,
    header: "出厂日期",
    size: 150,
  },
  {
    accessorKey: "shelf_life",
    // enableClickToCopy: true,
    header: "保质期",
    size: 150,
  },
  // {
  // 	accessorKey: 'device_category',
  // 	// enableClickToCopy: true,
  // 	header: '设备分类',
  // 	size: 150,
  // },
  {
    accessorKey: "device_kind",
    // enableClickToCopy: true,
    header: "设备种类",
    size: 150,
  },
];

export default function DeviceBasePage() {
  const { enqueueSnackbar } = useSnackbar();

  // 获取数据
  const { data } = useSWR(SWRUniqueKey.DeviceBase, async () => {
    const { find_device_base } = await fetchData({
      find_device_base: {},
    });

    const { success, data, errmsg } = find_device_base;

    return success ? data : (enqueueSnackbar(errmsg), undefined);
  });

  return (
    <>
      <div className="h-16 bg-white mb-4 text-2xl px-4 flex items-center">
        {PathMap.Device_base}
      </div>

      <div className="px-4">
        <CustomTable<DeviceBaseInfo>
          columns={columns}
          data={data}
          onDelete={() => {}}
          rowCustomActionsSize={55}
          rowCustomSelectSize={20}
        />
      </div>
    </>
  );
}
