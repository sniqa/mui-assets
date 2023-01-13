import { PathMap } from "@lib/path_map";
import useSWR from "swr";
import { fetchData } from "@lib/fetch";
import { SWRUniqueKey } from "@lib/swrKey";
import { NetworkTypeInfoWithId } from "@lib/types";
import PieChart from "@comps/PieChart";

const SCROLLBAR_CLASSNAME =
  "scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200";
const CONTAINER_HEIGHT = "calc(100vh - 13rem)";

export default function SummaryPage() {
  const { data } = useSWR<NetworkTypeInfoWithId[]>(
    SWRUniqueKey.NetworkTypeSummary,
    async () => {
      const { find_network_types } = await fetchData({
        find_network_types: {},
      });

      const { success, data } = find_network_types;

      return success ? data : [];
    }
  );

  return (
    <div className="h-screen flex flex-col">
      <div className="min-h-16 h-16 bg-white  text-2xl px-4 flex items-center">
        {PathMap.Network_summary}
      </div>

      <div className={`flex-grow overflow-auto ${SCROLLBAR_CLASSNAME}`}>
        {data?.map((networkType, index) => (
          <PieChart
            key={index}
            className={index % 2 === 0 ? "bg-gray-300" : ""}
            title={`${networkType.level_one_network}  - ${networkType.level_two_network}  - ${networkType.level_three_network}`}
            data={[
              { type: "已使用", value: networkType.used_number },
              { type: "未使用", value: networkType.unused_number },
            ]}
          />
        ))}
      </div>
    </div>
  );
}
