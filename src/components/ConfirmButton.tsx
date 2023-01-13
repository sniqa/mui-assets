import PopConfirm, { PopConfirmProps } from "@comps/PopConfirm";
import { IconButton, Tooltip, Typography } from "@mui/material";

type ConfirmButtonProps = {
  iconTitle?: ReactNode;
  promptMessage?: ReactNode;
  disabled?: boolean;
} & Omit<PopConfirmProps, "confirmContent">;

import { ReactNode } from "react";

const ConfirmButton = ({
  iconTitle,
  children,
  promptMessage,
  disabled,
  ...prop
}: ConfirmButtonProps) => {
  return (
    <PopConfirm
      {...prop}
      disable={disabled}
      confirmContent={
        <>
          <Typography className="dark:text-gray-50">{`提示`}</Typography>
          <Typography className="py-2 dark:text-gray-50">
            {promptMessage}
          </Typography>
        </>
      }
    >
      <Tooltip title={iconTitle}>
        <span className="">
          <IconButton disabled={disabled} className="">
            {children}
          </IconButton>
        </span>
      </Tooltip>
    </PopConfirm>
  );
};

export default ConfirmButton;
