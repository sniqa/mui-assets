import CustomSelect from "@comps/CustomSelect"
import SelectAction from "@comps/SelectAction"
import { SelectChangeEvent, TextField } from '@mui/material'
import { useRef, useState } from "react"

interface NetworkLevelItemProps {
    label: string
    onAdd: (value: string) => void
    onDelete: (value: string) => void
    onChange: (((event: SelectChangeEvent<unknown>, child: React.ReactNode) => void) & ((val: string) => void)) | undefined
    options: string[],
    value: string
}

const NetworkLevelItem = ({ label, onAdd, onDelete, onChange, options, value }: NetworkLevelItemProps) => {
    const [addValue, setAddValue] = useState('')
    const [deleteValue, setDeleteValue] = useState('')

    return <CustomSelect
        size="small"
        label={label}
        sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
        value={value}
        onChange={onChange}
        options={options}
        action={
            <>
                <SelectAction
                    dialogContent={
                        <TextField
                            size='small'
                            label={label}
                            value={addValue}
                            sx={{ width: '16rem', m: '1rem' }}
                            onChange={e => setAddValue(e.currentTarget.value.trim())}
                            autoFocus
                        // inputRef={addRef}
                        />
                    }
                    onOk={() => onAdd(addValue)}
                />

                {/* 删除 */}
                <SelectAction
                    buttonTitle='删除'
                    dialogTitle='删除'
                    dialogContent={
                        <div className='m-4'>
                            <CustomSelect size='small' label={label} sx={{ width: '16rem', }}
                                value={deleteValue}
                                onChange={val => setDeleteValue(val.toString())}
                                // inputRef={deleteRef}
                                options={options}
                            />
                        </div>
                    }
                    onOk={() => onDelete(deleteValue)}
                />
            </>
        }

    />
}

export default NetworkLevelItem