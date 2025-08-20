import GoogleMap from "@maps/GoogleMap";
import { ThemeProvider } from "@contexts/ThemeContext";
import ThemeToggle from "@components/ThemeToggle";
import Toolbar from "@components/Toolbar";
import Toolbox from "@components/Toolbox";
import AddressInput from "@components/AddressInput";

function App() {
  return (
    <ThemeProvider>
      <Toolbox>
        <AddressInput />
      </Toolbox>
      <Toolbar>
        <ThemeToggle />
        <ThemeToggle />
        <ThemeToggle />
      </Toolbar>
      <GoogleMap />
    </ThemeProvider>
  );
}

export default App;
