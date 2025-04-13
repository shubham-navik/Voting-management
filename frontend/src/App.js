// App.js
import './App.css';
import Footer from './components/Footer';
import LeftContent from './components/LeftContent';
import VariableComponent from './components/mainComponents/variableComponent';
import Navbar from './components/navbar';
import RightContent from './components/RightContent';

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

        <section className='w-1/4 flex justify-center'><RightContent/></section>
      </div>

      <Footer />
    </section>
  );
}

export default App;
