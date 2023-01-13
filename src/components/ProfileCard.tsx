import { Link } from "react-router-dom";
import { memo } from "react";
import ConfirmButton from "@comps/ConfirmButton";
import { Delete as DeleteIcon } from "@mui/icons-material";

interface TopologyCardProps {
  to: string;
  title: string;
  description: string;
  create_timestamp: number;
  last_modify_timestamp: number;
}

const TopologyCard = ({
  to,
  title,
  description,
  create_timestamp = 0,
  last_modify_timestamp = 0,
}: TopologyCardProps) => {
  return (
    <div
      className={`p-1 box-border <sm:w-full lg:w-1/2 xl:w-1/3  text-gray-900 `}
    >
      <div className="px-1 box-border border rounded-xl bg-white min-w-72 ">
        <section className={`h-12 border-b flex items-center justify-between`}>
          <span className="text-xl p-2 font-bold">{title}</span>

          <ConfirmButton
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            promptMessage={`确认删除`}
          >
            <DeleteIcon />
          </ConfirmButton>
        </section>

        <section className={`py-1 px-3`}>
          <Link
            to={to}
            className={`h-20 line-clamp-3 break-all  no-underline `}
          >
            {description}
          </Link>
        </section>

        <section
          className={`px-2 flex justify-between h-8 border-t text-xs items-center`}
        >
          <div className="">
            {`创建时间: ${new Date(create_timestamp).toLocaleDateString()}`}
          </div>

          <div className="">
            {`最后修改时间: ${new Date(
              last_modify_timestamp
            ).toLocaleDateString()}`}
          </div>
        </section>
      </div>
    </div>
  );
};

export default memo(TopologyCard);
