import { ReactNode } from 'react'
import Header from './Header';

interface LayoutProps{
    children: ReactNode;
}
const Layout = ({children} : LayoutProps) => {
  return (
    <div>
        <Header/>
        <main className='flex-1 container mx-auto p-6'>{children}</main>
        <footer></footer>
    </div>
  )
}

export default Layout;