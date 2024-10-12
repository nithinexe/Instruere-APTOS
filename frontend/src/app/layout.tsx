
import { ClerkProvider } from '@clerk/nextjs';
import Bubbles from './components/Bubble';
import Logo from './components/Logo';
import PrelineScript from './components/PrelineScript';
import './globals.css';


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
            <body className="">

            <ClerkProvider>
            <Bubbles />
            <Logo />
          
                {children}
                </ClerkProvider>
             
            </body>
        </html>
    );
};

export default Layout;
