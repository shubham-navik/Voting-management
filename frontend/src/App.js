// App.js
import './App.css';
import Footer from './components/Footer';
import LeftContent from './components/LeftContent';
import VariableComponent from './components/mainComponents/variableComponent';
import Navbar from './components/navbar';
// import Ragister from './components/Ragister';
// import RightContent from './components/RightContent';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <section className='bg-rose-200'>
      <Navbar />
        <LeftContent/>
      <div className='flex justify-center min-h-[90vh] w-full  gap-8'>

        <section className='w-2/4  flex justify-center'>
          {/* This is where the routed component will be rendered */}
          <VariableComponent />
        </section>

        {/* <section className='w-1/4 flex justify-center'><RightContent/></section> */}
      </div>

      <Footer />
      
<Toaster
  position="top-right"
  toastOptions={{
    duration: 5000, // 5 seconds
    style: {
      background: '#333',
      color: '#fff',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '15px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    },
    success: {
      iconTheme: {
        primary: '#4caf50',
        secondary: '#fff',
      },
    },
    error: {
      iconTheme: {
        primary: '#f44336',
        secondary: '#fff',
      },
    },
  }}
/>
      
    </section>
  );
}

export default App;
