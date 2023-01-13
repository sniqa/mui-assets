import { Button, Popover, PopoverOrigin } from "@mui/material";
import { ReactNode, useCallback, useRef, useState } from "react";

export interface PopConfirmProps {
  confirmContent?: ReactNode;
  children?: ReactNode;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  disable?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const origin: PopoverOrigin = { vertical: "top", horizontal: "center" };

const PopConfirm = ({
  confirmContent,
  children,
  anchorOrigin,
  transformOrigin,
  disable,
  onCancel,
  onConfirm,
}: PopConfirmProps) => {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  const handleOnCancel = useCallback(() => {
    setOpen(false);
    onCancel && onCancel();
  }, []);

  const handleOnConfirm = useCallback(() => {
    setOpen(false);
    onConfirm && onConfirm();
  }, []);

  const handleOpenConfirm = useCallback(
    () => !disable && setOpen(true),
    [disable]
  );

  return (
    <>
      <div className="dark:text-gray-50" ref={ref} onClick={handleOpenConfirm}>
        {children}
      </div>

      <Popover
        open={open}
        anchorEl={ref.current}
        elevation={2}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        <div className="p-4 rounded dark:bg-gray-700">
          {confirmContent}

          <div className="flex justify-end">
            <Button
              size="small"
              variant="outlined"
              onClick={handleOnCancel}
              className="dark:!text-gray-200 dark:!border-gray-200 dark:hover:!bg-gray-700"
            >{`取消`}</Button>
            <Button
              size="small"
              variant="contained"
              disableElevation
              sx={{ ml: "8px" }}
              onClick={handleOnConfirm}
            >{`确认`}</Button>
          </div>
        </div>
      </Popover>
    </>
  );
};

export default PopConfirm;
