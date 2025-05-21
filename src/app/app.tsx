import { Header } from '@/entities/header/header'
import { Button } from '@/shared/ui/kit/button'
import { Logo } from '@/shared/ui/kit/logo'
import { Outlet } from 'react-router-dom'
import { LayoutApp } from './layout'
import { ProtectedComponents } from './protected-route'
import { Providers } from './providers'

export const App = () => {
  return (
    <Providers>
      <LayoutApp
        header={
          <ProtectedComponents>
            <Header
              logo={<Logo />}
              actions={<Button>Exit</Button>}
            />
          </ProtectedComponents>
        }
        main={<Outlet />}
      />
    </Providers>
  )
}
