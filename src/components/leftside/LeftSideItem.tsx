import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IconCaretDown } from "@comps/FontAwesomeSvgs";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Popover,
  Popper,
  Paper,
  Tooltip,
  Button,
  TooltipProps,
  tooltipClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export interface LeftSideItemProps {
  icon: JSX.Element;
  title?: string;
  expand?: boolean;
  subItems?: LeftSideItemProps[];
  to: string;
}

type LeftSideExpansitionItemProps = Omit<LeftSideItemProps, "expand">;

const LeftSideItem = ({
  icon,
  title,
  expand,
  subItems,
  to,
}: LeftSideItemProps) => {
  return expand ? (
    <NoExpansionItem icon={icon} title={title} to={to} subItems={subItems} />
  ) : (
    <ExpansionItem icon={icon} title={title} to={to} subItems={subItems} />
  );
};

export default memo(LeftSideItem);

const NoExpansionItem = ({
  icon,
  title,
  to,
  subItems,
}: LeftSideExpansitionItemProps) => {
  const navigate = useNavigate();

  return (
    <CustomTooltip
      className=" dark:!gray-50 dark:!bg-gray-50 !gray-50 !bg-gray-50"
      title={
        subItems ? (
          <div className="py-2 pr-4">
            {subItems.map((subItem) => (
              <Link
                className="min-w-32 h-8 flex items-center text-sm cursor-pointer no-underline text-gray-50 dark:text-gray-200 dark:hover:text-gray-50"
                key={subItem.to}
                to={subItem.to}
              >
                <span className="ml-2 text-sm">{subItem.icon}</span>
                <span className="ml-3">{subItem.title}</span>
              </Link>
            ))}
          </div>
        ) : (
          <span className="px-1 h-4 text-sm">{title}</span>
        )
      }
      placement={subItems ? "right-start" : `right`}
      arrow
    >
      <div
        className="h-12 flex justify-center items-center cursor-pointer text-base "
        onClick={() => {
          !subItems && navigate(to);
        }}
      >
        {icon}
      </div>
    </CustomTooltip>
  );
};

// 展开
const ExpansionItem = ({
  icon,
  title,
  subItems,
  to,
}: LeftSideExpansitionItemProps) => {
  const navigate = useNavigate();

  return (
    <Accordion
      elevation={0}
      disableGutters
      sx={{
        ":before": { backgroundColor: "transparent" },
        backgroundColor: "transparent",
      }}
      className={`text-base cursor-pointer text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 dark:hover: text-white`}
    >
      <AccordionSummary
        expandIcon={
          subItems && <IconCaretDown className="dark:text-gray-100 " />
        }
        className={`dark:text-gray-100`}
      >
        <div className="flex" onClick={() => !subItems && navigate(to)}>
          <span className="">{icon}</span>
          <span className="ml-3">{title}</span>
        </div>
      </AccordionSummary>

      {subItems && (
        <AccordionDetails
          sx={{ py: 0 }}
          className={`dark:bg-gray-900 bg-gray-100`}
        >
          {subItems.map((subItem) => (
            <LeftSideItem key={subItem.to} {...subItem}></LeftSideItem>
          ))}
        </AccordionDetails>
      )}
    </Accordion>
  );
};

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
