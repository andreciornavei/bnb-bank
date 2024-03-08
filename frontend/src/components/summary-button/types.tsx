import { SimplePaletteColorOptions } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { Icon } from '@phosphor-icons/react'
export type SummaryButtonSizeType = 'regular' | 'small'
export type ActionIconDirectionType = 'horizontal' | 'vertical'
export type SummaryButtonSizeProps = {
  summaryLabelSize: Variant
  summaryValueSize: Variant
  actionLabelSize: Variant
}
export type SummaryButtonIconDirectionProps = {
  direction: 'row-reverse' | 'column'
  alignItems: 'center' | 'flex-end'
}

export const ResumeButtonIconDirectionMap: Record<
  ActionIconDirectionType,
  SummaryButtonIconDirectionProps
> = {
  horizontal: {
    direction: 'row-reverse',
    alignItems: 'center',
  },
  vertical: {
    direction: 'column',
    alignItems: 'flex-end',
  },
}

export const ResumeButtonSizeMap: Record<
  SummaryButtonSizeType,
  SummaryButtonSizeProps
> = {
  regular: {
    actionLabelSize: 'h6',
    summaryLabelSize: 'body2',
    summaryValueSize: 'h2',
  },
  small: {
    actionLabelSize: 'caption',
    summaryLabelSize: 'body2',
    summaryValueSize: 'h3',
  },
}

export type ResumeButtonProps = {
  summaryLabel?: string
  summaryValue?: string
  actionLabel?: string
  actionIcon?: Icon
  actionIconDirection?: ActionIconDirectionType
  color: SimplePaletteColorOptions
  onPress?: () => void
  href?: string
  size: SummaryButtonSizeType
}
