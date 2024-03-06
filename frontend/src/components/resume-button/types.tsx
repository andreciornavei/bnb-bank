import { SimplePaletteColorOptions } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { Icon } from '@phosphor-icons/react'
export type ResumeButtonSizeType = 'regular' | 'small'
export type ActionIconDirectionType = 'horizontal' | 'vertical'
export type ResumeButtonSizeProps = {
  resumeLabelSize: Variant
  resumeValueSize: Variant
  actionLabelSize: Variant
}
export type ResumeButtonIconDirectionProps = {
  direction: 'row-reverse' | 'column'
  alignItems: 'center' | 'flex-end'
}

export const ResumeButtonIconDirectionMap: Record<
  ActionIconDirectionType,
  ResumeButtonIconDirectionProps
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
  ResumeButtonSizeType,
  ResumeButtonSizeProps
> = {
  regular: {
    actionLabelSize: 'h6',
    resumeLabelSize: 'body2',
    resumeValueSize: 'h2',
  },
  small: {
    actionLabelSize: 'caption',
    resumeLabelSize: 'body2',
    resumeValueSize: 'h3',
  },
}

export type ResumeButtonProps = {
  resumeLabel?: string
  resumeValue?: string
  actionLabel?: string
  actionIcon?: Icon
  actionIconDirection?: ActionIconDirectionType
  color: SimplePaletteColorOptions
  onPress?: () => void
  href?: string
  size: ResumeButtonSizeType
}
