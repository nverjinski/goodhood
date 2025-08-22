import GoogleMap from "@maps/GoogleMap";
import { ThemeProvider } from "@contexts/ThemeContext";
import ThemeToggle from "@components/ThemeToggle";
import PlayButton from "@components/PlayButton";
import Toolbar from "@components/Toolbar";
import Toolbox from "@components/Toolbox";
import AddressInput from "@components/AddressInput";
import SettingsButton from "@components/SettingsButton";
import LoginButton from "@components/LoginButton";

function App() {
  return (
    <ThemeProvider>
      <Toolbox>
        <AddressInput />
      </Toolbox>
      <Toolbar>
        <ThemeToggle />
        <LoginButton />
        <PlayButton />
        <SettingsButton />
      </Toolbar>
      <GoogleMap />
    </ThemeProvider>
  );
}

export default App;
