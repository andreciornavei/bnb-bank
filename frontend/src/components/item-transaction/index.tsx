import { useNavigate } from 'react-router-dom'
import { TouchableItem } from './styles'
import { ItemTransactionProps } from './types'
import { Stack, Typography, useTheme } from '@mui/material'
import { formatAmount, formatDate } from '@utils/formatter'
import { TransactionStatusEnum } from '@enums/transaction_status_enum'
import { ClockCountdown } from '@phosphor-icons/react'

export const ItemTransaction = ({
  data,
  href,
  onClick,
  labelField,
}: ItemTransactionProps): JSX.Element => {
  const { palette } = useTheme()
  const navigate = useNavigate()

  const handleOnClick = () => {
    if (!!href) navigate(href)
    else if (!!onClick) onClick(data)
  }

  return (
    <TouchableItem onClick={handleOnClick} disabled={!href && !onClick}>
      <Stack
        py={1.5}
        mx={3}
        width="100%"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        borderBottom={`1px solid ${palette.secondary.main}`}
      >
        <Stack direction="column" alignItems="start">
          <Typography
            variant="body2"
            color="primary"
            fontWeight="bold"
            lineHeight={1.2}
            sx={
              data.status === TransactionStatusEnum.rejected
                ? [{ textDecoration: 'line-through', opacity: 0.5 }]
                : []
            }
          >
            {data[labelField || 'description']}
          </Typography>
          <Typography
            variant="caption"
            color="primary"
            lineHeight={1.2}
            sx={
              data.status === TransactionStatusEnum.rejected
                ? [{ opacity: 0.5 }]
                : []
            }
          >
            {formatDate(
              data.created_at as unknown as Date,
              'DD/MM/YYYY, HH:mm A'
            )}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          {data.status === TransactionStatusEnum.pending && (
            <ClockCountdown
              size={16}
              weight="duotone"
              color={palette.primary.main}
            />
          )}
          <Typography
            variant="body2"
            fontWeight="bold"
            color={data.factor > 0 ? palette.primary.main : palette.error.main}
            sx={
              data.status === TransactionStatusEnum.rejected
                ? [{ textDecoration: 'line-through', opacity: 0.5 }]
                : []
            }
          >
            {formatAmount(data.factor * data.amount)}
          </Typography>
        </Stack>
      </Stack>
    </TouchableItem>
  )
}
