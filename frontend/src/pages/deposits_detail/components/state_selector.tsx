import { DepositsDetailForm } from './form'
import { Siren } from '@phosphor-icons/react'
import { DepositsDetailPageContext } from '../context'
import { LoadingPage } from '@components/loading-page'
import { MessagePage } from '@components/message-page'
import { useContextSelector } from 'use-context-selector'

export const DepositsDetailStateSelector = (): JSX.Element | null => {
  const loading = useContextSelector(
    DepositsDetailPageContext,
    (s) => s.loading
  )
  const transaction = useContextSelector(
    DepositsDetailPageContext,
    (s) => s.transaction
  )

  if (!!loading) return <LoadingPage message="Loading check details..." />

  if (!transaction)
    return (
      <MessagePage
        icon={Siren}
        title="Check Details Not Founded"
        message="This check is not available anymore, maybe other admin has already approved/rejected it?"
      />
    )

  return <DepositsDetailForm transaction={transaction} />
}
