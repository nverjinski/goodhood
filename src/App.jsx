import GoogleMap from "@maps/GoogleMap";
import { ThemeProvider } from "@contexts/ThemeContext";
import { APIProvider } from "@vis.gl/react-google-maps";
import ThemeToggle from "@components/ThemeToggle";
import PlayButton from "@components/PlayButton";
import Toolbar from "@components/Toolbar";
import Toolbox from "@components/Toolbox";
import AddressInput from "@components/AddressInput";
import SettingsButton from "@components/SettingsButton";
import LoginButton from "@components/LoginButton";
import LocationHistory from "@components/LocationHistory";

function App() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error("Error: Missing Google Maps API Key");
    return <div>Error: Missing Google Maps API Key</div>;
  }
  return (
    <ThemeProvider>
      <APIProvider apiKey={apiKey}>
        <Toolbox>
          <AddressInput />
          <LocationHistory />
        </Toolbox>
        <Toolbar>
          <ThemeToggle />
          <LoginButton />
          <PlayButton />
          <SettingsButton />
        </Toolbar>
        <GoogleMap />
      </APIProvider>
    </ThemeProvider>
  );
}

export default App;
