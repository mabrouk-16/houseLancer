import Jumbotron from './Jumbotron'
import SoundSection from './SoundSection'
import DisplaySection from './DisplaySection'
import WebgiViewer from './WebgiViewer'
import Loader from './Loader'
import { useRef } from 'react'
function Home() {
  

 const webgiViewerRef = useRef();
  const contentRef = useRef();

  const handlePreview = () => {
    webgiViewerRef.current.triggerPreview();
  }

  return (
    <div className="App">
      
      <div ref={contentRef} id="content">
        <Jumbotron />
        <SoundSection />
        <DisplaySection triggerPreview={handlePreview} />
      </div>

      <WebgiViewer contentRef={contentRef} ref={webgiViewerRef} />
    </div>
  );
}

export default Home