import GoogleMap from "@maps/GoogleMap";
import { ThemeProvider } from "@contexts/ThemeContext";
import ThemeToggle from "@components/ThemeToggle";
import PlayButton from "@components/PlayButton";
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
        <PlayButton />
      </Toolbar>
      <GoogleMap />
    </ThemeProvider>
  );
}

export default App;
