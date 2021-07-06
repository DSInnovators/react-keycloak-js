import { BrowserRouter } from "react-router-dom";
import RenderOnAnonymous from "./component/RenderOnAnonymous";
import Welcome from "./component/Welcome";
import RenderOnAuthenticated from "./component/RenderOnAuthenticated";
import BookBox from "./component/BookBox";

function App() {
  return (
   <>
       <BrowserRouter>
           <div className="container">
               <RenderOnAnonymous>
                   <Welcome/>
               </RenderOnAnonymous>
               <RenderOnAuthenticated>
                   <BookBox/>
               </RenderOnAuthenticated>
           </div>
       </BrowserRouter>
   </>
  );
}

export default App;
