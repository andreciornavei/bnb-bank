export type TabFilterItemType = {
  key: string
  label: string
}

export type TabFilterProps = {
  qsName: string
  tabs: TabFilterItemType[]
}
