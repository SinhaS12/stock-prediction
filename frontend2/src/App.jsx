
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Token } from "./pages/Token";

import FeatureMarquee from "./components/FeatureMaequee";
import { Analyze } from "./pages/Analyze";


function App() {
  
  return(

    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Landing/>} />
          <Route path="/token" element= {<Token/>} />
          <Route path="/analyze" element={<Analyze/>} />
        </Routes>
        
      </BrowserRouter>
       
    
    </div>
  )
}

export default App