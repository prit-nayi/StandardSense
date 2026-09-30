import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Home from '@/pages/Home';
import Chat from '@/pages/Chat';
import Standards from '@/pages/Standards';
import StandardDetails from '@/pages/StandardDetails';
import Certification from '@/pages/Certification';
import Laboratories from '@/pages/Laboratories';
import Hallmarking from '@/pages/Hallmarking';
import About from '@/pages/About';

function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center">
      <div>
        <div className="text-6xl font-bold text-gray-200 mb-4">404</div>
        <div className="text-xl font-semibold text-gray-700 mb-2">Page not found</div>
        <a href="/" className="btn-primary inline-block mt-4">Back to Home</a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/standards" element={<Standards />} />
            <Route path="/standards/:id" element={<StandardDetails />} />
            <Route path="/certification" element={<Certification />} />
            <Route path="/laboratories" element={<Laboratories />} />
            <Route path="/hallmarking" element={<Hallmarking />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
