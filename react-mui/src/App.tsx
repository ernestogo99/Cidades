import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { APProutes } from "./routes";
import { AppThemeProvider } from "./shared/contexts/themecontext";
import { Menulateral } from "./shared/components";
import { AppDrawerprovider } from "./shared/contexts";

function App() {
  return (
    <AppThemeProvider>
      <AppDrawerprovider>
        <BrowserRouter>
          <Menulateral>
            <APProutes />
          </Menulateral>
        </BrowserRouter>
      </AppDrawerprovider>
    </AppThemeProvider>
  );
}

export default App;
