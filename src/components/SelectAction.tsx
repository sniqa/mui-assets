import { Button } from '@mui/material'
import DialogWraper from '@comps/CustomDialogWraper'
import { ReactNode, useState } from "react"

interface SelectActionProps {
    buttonTitle?: string
    dialogTitle?: string
    dialogContent?: ReactNode
    onOk?: () => void
}
  
const SelectAction = ({
    buttonTitle = '新增',
    dialogTitle = '新增',
    dialogContent,
    onOk
  }: SelectActionProps) => {
    const [open, setOpen] = useState(false)
  
    return <>
      <Button onClick={() => setOpen(true)} size={`small`}>{buttonTitle}</Button>
  
      <DialogWraper
          open={open}
          onClose={() => setOpen(false)} title={dialogTitle} 
          onOk={() => (setOpen(false), onOk && onOk())}
      >
        {dialogContent}
      </DialogWraper>
    </>
  }

  export default SelectAction