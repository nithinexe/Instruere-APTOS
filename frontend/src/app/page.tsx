import { SignedIn, SignIn } from '@clerk/nextjs';
import UploadForm from './components/UploadForm';
import Link from 'next/link';
import MainPage from './components/MainPage';

const Home: React.FC = () => {
    return (
        <main>
          <MainPage />
        </main>
    );
};

export default Home;
