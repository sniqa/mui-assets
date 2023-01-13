import CustomTable from "@comps/CustomTable2";
import { uploadUsersUrl } from "@lib/config";
import { fetchData } from "@lib/fetch";
import { PathMap } from "@lib/path_map";
import { SWRUniqueKey } from "@lib/swrKey";
import type {
  DepartmentInfoWithId,
  UserInfo,
  UserInfoWithId,
} from "@lib/types";
import { useChildToParent } from "@lib/utils";
import { Autocomplete, TextField } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { memo, useState } from "react";
import useSWR from "swr";
import useSWRMution from "swr/mutation";
import { useSnackbar } from "notistack";

const columns: MRT_ColumnDef<UserInfo>[] = [
  {
    accessorKey: "username",
    header: "用户名称",
    size: 160,
  },
  {
    accessorKey: "department",
    header: "部门",
    size: 160,
  },
  {
    accessorKey: "location",
    header: "办公室",
    size: 160,
  },
  {
    accessorKey: "number",
    // enableClickToCopy: true,
    header: "编号",
    size: 160,
  },
  {
    accessorKey: "remark",
    // enableClickToCopy: true,
    header: "备注",
    size: 150,
  },
];

export default function AccountPage() {
  const { enqueueSnackbar } = useSnackbar();

  const { childHook, parentHook } = useChildToParent<UserInfoWithId>();

  // 获取数据
  const { data } = useSWR(SWRUniqueKey.Users, async () => {
    const { find_users } = await fetchData({
      find_users: {},
    });

    const { success, data, errmsg } = find_users;

    return success ? data : (enqueueSnackbar(errmsg), undefined);
  });

  // 删除
  const deletion = useSWRMution(
    SWRUniqueKey.Users,
    async (key: string, { arg }: { arg: UserInfoWithId }) => {
      const { delete_user } = await fetchData({ delete_user: arg });

      const { success, data, errmsg } = delete_user;

      return success
        ? (enqueueSnackbar("删除成功"), data)
        : (enqueueSnackbar(errmsg), undefined);
    }
  );

  // 创建
  const creation = useSWRMution(
    SWRUniqueKey.Users,
    async (key: string, { arg }: { arg: UserInfoWithId }) => {
      const { create_user } = await fetchData({ create_user: arg });

      const { success, data, errmsg } = create_user;

      return success
        ? (enqueueSnackbar("创建成功"), data)
        : (enqueueSnackbar(errmsg), undefined);
    }
  );

  // 编辑
  const edition = useSWRMution(
    SWRUniqueKey.Users,
    async (key: string, { arg }: { arg: UserInfoWithId }) => {
      const { modify_user } = await fetchData({ modify_user: arg });

      const { success, data, errmsg } = modify_user;

      return success
        ? (enqueueSnackbar("更新成功"), data)
        : (enqueueSnackbar(errmsg), undefined);
    }
  );

  // 删除多个
  const deletions = useSWRMution(
    SWRUniqueKey.Users,
    async (key: string, { arg }: { arg: UserInfoWithId[] }) => {
      const ids = arg.map((a) => a._id);

      const { delete_many_users_by_ids } = await fetchData({
        delete_many_users_by_ids: [ids],
      });

      const { success, data, errmsg } = delete_many_users_by_ids;

      return success
        ? (enqueueSnackbar("删除成功"), data)
        : (enqueueSnackbar(errmsg), undefined);
    }
  );

  return (
    <>
      <div className="h-16 bg-white mb-4 text-2xl px-4 flex items-center">
        {PathMap.Account}
      </div>

      <div className="px-4">
        <CustomTable<UserInfoWithId>
          columns={columns}
          data={data}
          downloadTemplate={`/public/用户模板.csv`}
          rowCustomActionsSize={60}
          rowCustomSelectSize={25}
          onDeleteSeleted={(users) => deletions.trigger(users)}
          onDelete={(user) => deletion.trigger(user)}
          onCreate={() => creation.trigger(parentHook())}
          onEdit={() => edition.trigger(parentHook())}
          // uploadState={{
          //   action: uploadUsersUrl,
          // }}
          renderCustomDialogContent={(currentRow) => (
            <AccountDetail originData={currentRow} emitValue={childHook} />
          )}
        />
      </div>
    </>
  );
}

interface AccountDetailProps {
  emitValue: (cb: () => UserInfoWithId) => void;
  originData?: UserInfoWithId | null;
  departmentSelection?: DepartmentInfoWithId[];
}

const AccountDetail = memo(
  ({ emitValue, originData, departmentSelection = [] }: AccountDetailProps) => {
    const [accountDetail, setAccountDetail] = useState<UserInfoWithId>(
      originData || {
        _id: "",
        username: "",
        department: "",
        location: "",
        number: "",
        remark: "",
      }
    );

    emitValue(() => accountDetail);

    const handleOnChang = (val: string, key: string) => {
      setAccountDetail({ ...accountDetail, [key]: val });
    };

    return (
      <div className=" py-2 pl-2">
        <div className={`flex flex-wrap items-center`}>
          <TextField
            size="small"
            label={`用户名称`}
            sx={{ width: "16rem", mr: "1rem", mb: "1rem" }}
            defaultValue={originData?.username}
            onChange={(e) =>
              handleOnChang(e.currentTarget.value.trim(), "username")
            }
          />
          <Autocomplete
            sx={{ width: "16rem", mr: "1rem", mb: "1rem" }}
            renderInput={(params) => (
              <TextField label={`部门`} {...params} size="small" />
            )}
            onChange={(e, newValue) =>
              setAccountDetail({ ...accountDetail, department: newValue || "" })
            }
            defaultValue={originData?.department || ""}
            options={["", ...departmentSelection.map((d) => d.department_name)]}
          />
          <Autocomplete
            sx={{ width: "16rem", mr: "1rem", mb: "1rem" }}
            renderInput={(params) => (
              <TextField label={`办公室`} {...params} size="small" />
            )}
            defaultValue={originData?.location || ""}
            onChange={(e, newValue) =>
              setAccountDetail({ ...accountDetail, location: newValue || "" })
            }
            options={["", ...departmentSelection.flatMap((d) => d.locations)]}
          />
          <TextField
            size="small"
            label={`编号`}
            sx={{ width: "16rem", mr: "1rem", mb: "1rem" }}
            defaultValue={originData?.number || ""}
            onChange={(e) =>
              handleOnChang(e.currentTarget.value.trim(), "number")
            }
          />
        </div>

        <TextField
          size="small"
          label={`备注`}
          sx={{ width: "33rem", mr: "1rem", mb: "1rem" }}
          defaultValue={originData?.remark || ""}
          onChange={(e) =>
            handleOnChang(e.currentTarget.value.trim(), "remark")
          }
          multiline
          minRows={3}
        />
      </div>
    );
  }
);
