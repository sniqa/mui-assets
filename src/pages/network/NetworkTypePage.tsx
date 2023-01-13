import CustomTable from "@comps/CustomTable2";
import { HamsterLoading } from "@comps/Loading";
import NetworkLevelItem from "@comps/NetworkLevelItem";
import { fetchData } from "@lib/fetch";
import { PathMap } from "@lib/path_map";
import { SWRUniqueKey } from "@lib/swrKey";
import type {
  NetworkLevelInfo,
  NetworkLevelInfoWithId,
  NetworkTypeInfo,
  NetworkTypeInfoWithId,
} from "@lib/types";
import { useChildToParent } from "@lib/utils";
import { TextField } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { memo, Suspense, useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import useSWRMution from "swr/mutation";
import { useSnackbar } from "notistack";

type NetworkTypeConfig = Omit<
  NetworkTypeInfoWithId,
  "used_number" | "unused_number" | "total_number"
> & {
  ip_use_detail: string;
};

const columns: MRT_ColumnDef<NetworkTypeConfig>[] = [
  {
    accessorKey: "level_one_network",
    enableClickToCopy: true,
    header: "一级网络",
    size: 160,
  },
  {
    accessorKey: "level_two_network",
    enableClickToCopy: true,
    header: "二级网络",
    size: 160,
  },
  {
    accessorKey: "level_three_network",
    enableClickToCopy: true,
    header: "三级网络",
    size: 160,
  },
  {
    accessorKey: "ip_use_detail",
    enableClickToCopy: true,
    header: `已使用 / 未使用 / 总数`,
    size: 220,
  },
  {
    accessorKey: "ip_address_start",
    enableClickToCopy: true,
    header: "开始地址",
    size: 160,
  },
  {
    accessorKey: "ip_address_end",
    enableClickToCopy: true,
    header: "结束地址",
    size: 160,
  },
  {
    accessorKey: "netmask",
    enableClickToCopy: true,
    header: "子网掩码",
    size: 160,
  },
  {
    accessorKey: "gateway",
    enableClickToCopy: true,
    header: "网关",
    size: 160,
  },
  {
    accessorKey: "dns",
    enableClickToCopy: true,
    header: "DNS",
    size: 160,
  },

  {
    accessorKey: "remark",
    enableClickToCopy: true,
    header: "备注",
    size: 150,
  },
];

// UI
export default function NetworkTypePage() {
  const { childHook, parentHook } = useChildToParent<NetworkTypeInfoWithId>();

  const { enqueueSnackbar } = useSnackbar();

  // 获取数据
  const { data } = useSWR<NetworkTypeInfoWithId[]>(
    SWRUniqueKey.NetworkType,
    async () => {
      const { find_network_types } = await fetchData({
        find_network_types: {},
      });

      const { success, data, errmsg } = find_network_types;

      return success ? data : (enqueueSnackbar(errmsg), undefined);
    }
  );

  const rows = useMemo(
    () =>
      data?.map((d) => ({
        ...d,
        ip_use_detail: `${d.used_number} / ${d.unused_number} / ${d.total_number}`,
      })) || [],
    [data]
  );

  // 删除
  const deletion = useSWRMution(
    SWRUniqueKey.NetworkType,
    async (key, { arg }: { arg: NetworkTypeInfoWithId }) => {
      const { delete_network_type } = await fetchData({
        delete_network_type: arg,
      });

      const { success, data, errmsg } = delete_network_type;

      return success
        ? (enqueueSnackbar("删除成功"), data)
        : (enqueueSnackbar(errmsg), undefined);
    }
  );

  // 创建
  const creation = useSWRMution(
    SWRUniqueKey.NetworkType,
    async (key, { arg }: { arg: NetworkTypeInfo }) => {
      const { create_network_type } = await fetchData({
        create_network_type: arg,
      });

      const { success, data, errmsg } = create_network_type;

      return success
        ? (enqueueSnackbar("创建成功"), data)
        : (enqueueSnackbar(errmsg), undefined);
    }
  );

  return (
    <>
      <div className="h-16 bg-white mb-4 text-2xl px-4 flex items-center">
        {PathMap.Network_type}
      </div>

      <div className="px-4">
        <CustomTable<NetworkTypeConfig>
          columns={columns}
          data={rows}
          onDelete={(data) => deletion.trigger(data)}
          onCreate={() => creation.trigger(parentHook())}
          rowCustomSelectSize={30}
          rowCustomActionsSize={80}
          renderCustomDialogContent={(currentRow) => (
            <NetworkTypeDetail emitValue={childHook} />
          )}
        />
      </div>
    </>
  );
}

// 新增，编辑弹出框
interface NetworkTypeDetailProps {
  emitValue: (data: () => NetworkTypeInfoWithId) => void;
}

//  新建网络类型弹出框
const NetworkTypeDetail = memo(({ emitValue }: NetworkTypeDetailProps) => {
  const [networkTypeDetail, setNetworkTypeDetail] =
    useState<NetworkTypeInfoWithId>({
      _id: "",
      level_one_network: "",
      level_two_network: "",
      level_three_network: "",
      ip_address_start: "",
      ip_address_end: "",
      netmask: "",
      gateway: "",
      dns: "",
      remark: "",
    });

  emitValue(() => networkTypeDetail);

  const { enqueueSnackbar } = useSnackbar();

  const handleOnChang = (val: string, key: string) => {
    setNetworkTypeDetail({ ...networkTypeDetail, [key]: val });
  };

  const { data } = useSWR<NetworkLevelInfoWithId[]>(
    SWRUniqueKey.NetworkTypeLevel,
    async () => {
      const { find_network_levels } = await fetchData({
        find_network_levels: {},
      });

      const { success, data } = find_network_levels;

      return success ? data : [];
    }
  );

  //   创建
  const creation = useSWRMution(
    SWRUniqueKey.NetworkTypeLevel,
    async (key, { arg }: { arg: NetworkLevelInfo }) => {
      const { create_network_level } = await fetchData({
        create_network_level: arg,
      });

      const { success, data, errmsg } = create_network_level;

      return success
        ? (enqueueSnackbar("创建成功"), data)
        : (enqueueSnackbar(errmsg), undefined);
    }
  );

  //   更新
  const updation = useSWRMution(
    SWRUniqueKey.NetworkTypeLevel,
    async (key, { arg }: { arg: NetworkLevelInfoWithId }) => {
      const { modify_network_level } = await fetchData({
        modify_network_level: arg,
      });

      const { success, data, errmsg } = modify_network_level;

      return success
        ? (enqueueSnackbar("更新成功"), data)
        : (enqueueSnackbar(errmsg), undefined);
    }
  );

  //   删除
  const deletion = useSWRMution(
    SWRUniqueKey.NetworkTypeLevel,
    async (key, { arg }: { arg: NetworkLevelInfoWithId }) => {
      const { delete_network_level } = await fetchData({
        delete_network_level: arg,
      });

      const { success, errmsg } = delete_network_level;

      return success
        ? enqueueSnackbar("删除成功")
        : (enqueueSnackbar(errmsg), undefined);
    }
  );

  return (
    <Suspense fallback={<HamsterLoading />}>
      <div className=" py-2 pl-2">
        <div className={`flex flex-wrap items-center`}>
          {/* 一级网络 */}
          <NetworkLevelItem
            label={"一级网络"}
            onAdd={(val) => {
              const newData = { child_network: [], level_one_network: val };
              creation.trigger(newData);
            }}
            onDelete={(val) => {
              deletion.trigger(data?.find((d) => d.level_one_network === val));
            }}
            onChange={(val) =>
              setNetworkTypeDetail({
                ...networkTypeDetail,
                level_one_network: val.toString(),
              })
            }
            options={data?.map((d) => d.level_one_network) || []}
            value={networkTypeDetail.level_one_network || ""}
          />

          {/* 二级网络 */}
          <NetworkLevelItem
            label={"二级网络"}
            onAdd={(val) => {
              if (!networkTypeDetail.level_one_network) {
                return;
              }

              const target = data?.find(
                (d) =>
                  d.level_one_network === networkTypeDetail.level_one_network
              ) as NetworkLevelInfoWithId;

              const newData: NetworkLevelInfoWithId = {
                ...target,
                child_network: [
                  ...target.child_network,
                  { level_two_network: val, level_three_network: [] },
                ],
              };

              updation.trigger(newData);
            }}
            onDelete={(val) => {
              if (!networkTypeDetail.level_one_network) {
                return;
              }

              const target = data?.find(
                (d) =>
                  d.level_one_network === networkTypeDetail.level_one_network
              ) as NetworkLevelInfoWithId;

              const newData: NetworkLevelInfoWithId = {
                ...target,
                child_network: target.child_network.filter(
                  (d) => d.level_two_network != val
                ),
              };

              updation.trigger(newData);
            }}
            onChange={(val) =>
              setNetworkTypeDetail({
                ...networkTypeDetail,
                level_two_network: val.toString(),
              })
            }
            options={
              data
                ?.find(
                  (d) =>
                    d.level_one_network === networkTypeDetail.level_one_network
                )
                ?.child_network.map((d) => d.level_two_network) || []
            }
            value={networkTypeDetail.level_two_network || ""}
          />

          {/* 三级网络 */}
          <NetworkLevelItem
            label={"三级网络"}
            onAdd={(val) => {
              if (
                !networkTypeDetail.level_one_network &&
                !networkTypeDetail.level_two_network
              ) {
                return;
              }

              const target = data?.find(
                (d) =>
                  d.level_one_network === networkTypeDetail.level_one_network
              ) as NetworkLevelInfoWithId;

              const newData: NetworkLevelInfoWithId = {
                ...target,
                child_network: target.child_network.map((d) =>
                  d.level_two_network === networkTypeDetail.level_two_network
                    ? {
                        ...d,
                        level_three_network: [...d.level_three_network, val],
                      }
                    : d
                ),
              };

              updation.trigger(newData);
            }}
            onDelete={(val) => {
              if (
                !networkTypeDetail.level_one_network &&
                !networkTypeDetail.level_two_network
              ) {
                return;
              }

              const target = data?.find(
                (d) =>
                  d.level_one_network === networkTypeDetail.level_one_network
              ) as NetworkLevelInfoWithId;

              const newData: NetworkLevelInfoWithId = {
                ...target,
                child_network: target.child_network.map((d) =>
                  d.level_two_network === networkTypeDetail.level_two_network
                    ? {
                        ...d,
                        level_three_network: d.level_three_network.filter(
                          (s) => s != val
                        ),
                      }
                    : d
                ),
              };

              updation.trigger(newData);
            }}
            onChange={(val) =>
              setNetworkTypeDetail({
                ...networkTypeDetail,
                level_three_network: val.toString(),
              })
            }
            options={
              data
                ?.find(
                  (d) =>
                    d.level_one_network === networkTypeDetail.level_one_network
                )
                ?.child_network.find(
                  (d) =>
                    d.level_two_network === networkTypeDetail.level_two_network
                )?.level_three_network || []
            }
            value={networkTypeDetail.level_three_network || ""}
          />

          <TextField
            size="small"
            label={`开始地址`}
            sx={{ width: "16rem", mr: "1rem", mb: "1rem" }}
            onChange={(e) =>
              handleOnChang(e.currentTarget.value.trim(), "ip_address_start")
            }
          />
          <TextField
            size="small"
            label={`结束地址`}
            sx={{ width: "16rem", mr: "1rem", mb: "1rem" }}
            onChange={(e) =>
              handleOnChang(e.currentTarget.value.trim(), "ip_address_end")
            }
          />
          <TextField
            size="small"
            label={`子网掩码`}
            sx={{ width: "16rem", mr: "1rem", mb: "1rem" }}
            onChange={(e) =>
              handleOnChang(e.currentTarget.value.trim(), "netmask")
            }
          />
          <TextField
            size="small"
            sx={{ width: "16rem", mr: "1rem", mb: "1rem" }}
            label={`网关`}
            onChange={(e) =>
              handleOnChang(e.currentTarget.value.trim(), "gateway")
            }
          />
          <TextField
            size="small"
            label={`dns`}
            sx={{ width: "16rem", mr: "1rem", mb: "1rem" }}
            onChange={(e) => handleOnChang(e.currentTarget.value.trim(), "dns")}
          />
        </div>

        <TextField
          size="small"
          label={`备注`}
          sx={{ width: "33rem", mr: "1rem", mb: "1rem" }}
          onChange={(e) =>
            handleOnChang(e.currentTarget.value.trim(), "remark")
          }
          multiline
          minRows={3}
        />
      </div>
    </Suspense>
  );
});
