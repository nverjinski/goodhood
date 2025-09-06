import { useSelector } from "react-redux";
import GoogleMap from "@maps/GoogleMap";
import { ThemeProvider } from "@contexts/ThemeContext";
import { APIProvider } from "@vis.gl/react-google-maps";
import { ExpansionPanel } from "./components/base";
import { GunCrimeLayerSettings } from "@components/layerSettings";
import {
  Toolbar,
  Toolbox,
  AddressInput,
  LocationHistory,
  ThemeToggle,
  SettingsButton,
  LoginButton,
  PlayButton,
} from "@components";

function App() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const hasHistory = useSelector(
    (state) => state.location.locationHistory.length
  );

  if (!apiKey) {
    console.error("Error: Missing Google Maps API Key");
    return <div>Error: Missing Google Maps API Key</div>;
  }
  return (
    <ThemeProvider>
      <APIProvider apiKey={apiKey}>
        <Toolbox>
          <AddressInput />
          <ExpansionPanel title="Location History" disabled={!hasHistory}>
            <LocationHistory />
          </ExpansionPanel>
          <ExpansionPanel title="Layers" defaultOpen={false}>
            <GunCrimeLayerSettings />
          </ExpansionPanel>
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
