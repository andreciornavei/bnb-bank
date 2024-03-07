import { useState } from 'react'
import { Tab, Tabs, useTheme } from '@mui/material'
import { TabFilterProps } from './types'
import { useSearchParams, useNavigate } from 'react-router-dom'

export const TabFilter = (props: TabFilterProps): JSX.Element => {
  const { palette } = useTheme()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialIndex = searchParams.has(props.qsName)
    ? props.tabs.findIndex((i) => i.key === searchParams.get(props.qsName))
    : 0

  const [index, setIndex] = useState<number | undefined>(initialIndex)

  const handleChange = (_: any, index: number) => {
    setIndex(index)
    searchParams.set(props.qsName, props.tabs[index].key)
    navigate({ search: searchParams.toString() })
  }

  return (
    <Tabs
      value={index}
      onChange={handleChange}
      variant="fullWidth"
      style={{ backgroundColor: palette.tertiary.main }}
      indicatorColor="primary"
    >
      {props.tabs?.map?.(({ key, label }) => {
        return (
          <Tab
            key={key}
            id={key}
            label={label}
            style={{ fontWeight: 'bold', color: palette.primary.main }}
          />
        )
      })}
    </Tabs>
  )
}
