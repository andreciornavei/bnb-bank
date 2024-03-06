import { SessionPage } from './pages/session'
import { Routes, Route } from 'react-router-dom'

function Router() {
  return (
    <Routes>
      <Route path="" element={<SessionPage />}>
        {/* <Route path="" element={<SigninPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="balance" element={<BalancePage />} />
        <Route path="expenses" element={<ExpensesPage />} />
        <Route path="add_purchase" element={<AddPurchasePage />} />
        <Route path="deposits" element={<DepositsPage />} />
        <Route path="deposits/new" element={<NewDepositPage />} />
        <Route path="deposits/control" element={<NewDepositPage />} />
        <Route path="deposits/:id" element={<TransactionDetailPage />} /> */}
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  )
}

export default Router
