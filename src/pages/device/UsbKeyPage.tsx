import CustomTable from "@comps/CustomTable2";
import { uploadUsbkeysUrl } from "@lib/config";
import { fetchData } from "@lib/fetch";
import { PathMap } from "@lib/path_map";
import { SWRUniqueKey } from "@lib/swrKey";
import type { UsbKeyInfo, UsbKeyInfoWithId } from "@lib/types";
import { Autocomplete, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { MRT_ColumnDef } from "material-react-table";
import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import zhcn from "dayjs/locale/zh-cn";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useChildToParent } from "@lib/utils";
import { useSnackbar } from "notistack";

type UsbKeyConfig = Omit<
  UsbKeyInfoWithId,
  "enable_time" | "collection_time" | "return_time"
> & {
  enable_time: string | number;
  collection_time: string | number;
  return_time: string | number;
};

const columns: MRT_ColumnDef<UsbKeyConfig>[] = [
  {
    accessorKey: "number",
    enableClickToCopy: true,
    header: "证书编号",
    size: 150,
  },
  {
    accessorKey: "user",
    enableClickToCopy: true,
    header: "使用人",
    size: 150,
  },
  {
    accessorKey: "enable_time",
    enableClickToCopy: true,
    header: "启用时间",
    size: 150,
  },
  {
    accessorKey: "collection_time",
    enableClickToCopy: true,
    header: "领用时间",
    size: 150,
  },
  {
    accessorKey: "return_time",
    enableClickToCopy: true,
    header: "归还时间",
    size: 150,
  },
  {
    accessorKey: "remark",
    enableClickToCopy: true,
    header: "备注",
    size: 150,
  },
];

export default function UsbKeyPage() {
  const { enqueueSnackbar } = useSnackbar();

  const { childHook, parentHook } = useChildToParent<UsbKeyConfig>();

  // 获取数据
  const { data } = useSWR<UsbKeyInfoWithId[]>(SWRUniqueKey, async () => {
    const { find_usb_key } = await fetchData({
      find_usb_key: {},
    });

    const { success, data, errmsg } = find_usb_key;

    return success ? data : (enqueueSnackbar(errmsg), []);
  });

  const rows = useMemo(
    () =>
      data?.map((d) => ({
        ...d,
        enable_time: new Date(d.enable_time).toLocaleString("zh-cn", {
          hour12: false,
        }),
        collection_time: new Date(d.collection_time).toLocaleString("zh-cn", {
          hour12: false,
        }),
        return_time: d.return_time
          ? new Date(d.return_time).toLocaleString("zh-cn", {
              hour12: false,
            })
          : "",
      })),
    [data]
  );

  return (
    <>
      <div className="h-16 bg-white mb-4 text-2xl px-4 flex items-center">
        {PathMap.Usb_key}
      </div>

      <div className="px-4">
        <CustomTable<UsbKeyConfig>
          columns={columns}
          data={rows || []}
          onDelete={() => {}}
          rowCustomActionsSize={70}
          rowCustomSelectSize={30}
          downloadTemplate={`/public/数字证书.csv`}
          exportCSVFilename={`数字证书`}
          // uploadState={{
          //   action: uploadUsbkeysUrl,
          // }}
          renderCustomDialogContent={(currentRow) => (
            <UsbKeyDetail emitValue={childHook} originData={currentRow} />
          )}
        />
      </div>
    </>
  );
}

interface UsbKeyDetailProps {
  emitValue: (cb: () => UsbKeyConfig) => void;
  originData?: UsbKeyConfig | null;
  userSelection?: string[];
}

dayjs.locale(zhcn);

const date = new Date().getTime();

const initialState: UsbKeyConfig = {
  _id: "",
  number: "",
  user: "",
  enable_time: date,
  collection_time: date,
  return_time: date,
  remark: "",
};

const UsbKeyDetail = ({
  emitValue,
  originData,
  userSelection = [],
}: UsbKeyDetailProps) => {
  const [usbKey, setUsbKey] = useState(originData || initialState);

  emitValue(() => usbKey);

  return (
    <div className={`flex flex-wrap items-center py-2 pl-2`}>
      <TextField
        label={`编号`}
        size="small"
        defaultValue={originData?.number || ""}
        sx={{ width: "16rem", mr: "1rem", mb: "1rem" }}
        onChange={(e) =>
          setUsbKey({ ...usbKey, number: e.currentTarget.value.trim() || "" })
        }
      />

      {/* 使用人 */}
      <Autocomplete
        sx={{ width: "16rem", mb: "1rem" }}
        renderInput={(params) => (
          <TextField label={`使用人`} {...params} size="small" />
        )}
        options={userSelection}
        defaultValue={originData?.user || ""}
        onChange={(e, newValue) =>
          setUsbKey({ ...usbKey, user: newValue || "" })
        }
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* 启用时间 */}
        <DatePicker
          onChange={(value) =>
            setUsbKey({
              ...usbKey,
              enable_time: value?.valueOf() || new Date().getTime(),
            })
          }
          value={usbKey.enable_time}
          renderInput={(params) => (
            <TextField
              size="small"
              sx={{ width: "16rem", mr: "1rem", mb: "1rem" }}
              {...params}
              label={`启用时间`}
            />
          )}
        />

        {/* 领用时间 */}
        <DatePicker
          onChange={(value) => {
            setUsbKey({
              ...usbKey,
              collection_time: value?.valueOf() || new Date().getTime(),
            });
          }}
          value={usbKey.collection_time}
          renderInput={(params) => (
            <TextField
              size="small"
              // defaultValue={originData?.collection_time}
              sx={{ width: "16rem", mb: "1rem" }}
              {...params}
              label={`领用时间`}
            />
          )}
        />

        {/* 归还时间 */}
        <DatePicker
          onChange={(value) =>
            setUsbKey({
              ...usbKey,
              return_time: value?.valueOf() || new Date().getTime(),
            })
          }
          value={usbKey.return_time}
          renderInput={(params) => (
            <TextField
              sx={{ width: "16rem", mr: "1rem", mb: "1rem" }}
              // defaultValue={originData?.return_time}
              size="small"
              {...params}
              label={`归还时间`}
            />
          )}
        />
      </LocalizationProvider>

      {/* 备注 */}
      <TextField
        sx={{ width: "33rem" }}
        label={`备注`}
        multiline
        minRows={3}
        defaultValue={originData?.remark || ""}
        onChange={(e) =>
          setUsbKey({ ...usbKey, remark: e.currentTarget.value.trim() || "" })
        }
      />
    </div>
  );
};
