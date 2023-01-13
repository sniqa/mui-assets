import CustomTable from "@comps/CustomTable";
import CustomUpload from "@comps/CustomUpload";
import { fetchData } from "@lib/fetch";
import { SWRUniqueKey } from "@lib/swrKey";
import { MRT_ColumnDef } from "material-react-table";
import { useCallback, useState } from "react";
import useSWR from "swr";
import { useSnackbar } from "notistack";

const columns: MRT_ColumnDef<any>[] = [];

// 获取数据

export default function TopologyPage() {
  const [openUpload, setOpenUpload] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const { data } = useSWR(SWRUniqueKey.Topologys, async () => {
    const { find_topologys } = await fetchData({
      find_topologys: {},
    });

    const { success, data, errmsg } = find_topologys;

    return success ? data : (enqueueSnackbar(errmsg), undefined);
  });

  return (
    <>
      <CustomTable
        columns={columns}
        data={data}
        onUpload={useCallback(() => setOpenUpload(true), [])}
      />
    </>
  );
}
