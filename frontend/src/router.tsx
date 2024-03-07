import { Routes, Route } from 'react-router-dom'
import { SignupPage } from '@pages/signup'
import { SigninPage } from '@pages/signin'
import { BalancePage } from '@pages/balance'
import { SessionPage } from './pages/session'
import { PrivatePage } from '@pages/_private'
import { ExpensesPage } from '@pages/expenses'
import { PurchasePage } from '@pages/purchase'
import { DepositsPage } from '@pages/deposits'
import { DepositsNewPage } from '@pages/deposits_new'
import { DepositsControlPage } from '@pages/depopsits_control'
import { DepositsDetailPage } from '@pages/deposits_detail'
import { NotFoundedPage } from '@pages/notfounded'
import { PublicPage } from '@pages/_public'

function Router() {
  return (
    <Routes>
      <Route element={<SessionPage />}>
        <Route element={<PublicPage />}>
          <Route path="" element={<SigninPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
        <Route element={<PrivatePage />}>
          <Route path="balance" element={<BalancePage />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="purchase" element={<PurchasePage />} />
          <Route path="deposits" element={<DepositsPage />} />
          <Route path="deposits/new" element={<DepositsNewPage />} />
          <Route path="deposits/control" element={<DepositsControlPage />} />
          <Route path="deposits/:id" element={<DepositsDetailPage />} />
          <Route path="*" element={<NotFoundedPage />} />
        </Route>
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  )
}

export default Router
