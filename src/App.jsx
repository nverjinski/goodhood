import { useSelector, useDispatch } from "react-redux";
import GoogleMap from "@maps/GoogleMap";
import { ThemeProvider } from "@contexts/ThemeContext";
import { APIProvider } from "@vis.gl/react-google-maps";
import { toggleModalOpen } from "@store/appSlice";
import { DialogModal, ExpansionPanel } from "./components/base";
import {
  GunCrimeLayerSettings,
  OffenderLayerSettings,
} from "@components/layerSettings";
import {
  AuthenticationDialogContent,
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
  const dispatch = useDispatch();
  const hasHistory = useSelector(
    (state) => state.location.locationHistory.length
  );
  const loginModalOpen = useSelector((state) => state.app.modals.loginModal);

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
            <OffenderLayerSettings disabled={true} />
          </ExpansionPanel>
        </Toolbox>
        <Toolbar>
          <ThemeToggle />
          <LoginButton />
          <PlayButton />
          <SettingsButton />
        </Toolbar>
        <DialogModal
          isOpen={loginModalOpen}
          width="400px"
          onClose={() => dispatch(toggleModalOpen("loginModal"))}
          animate={true}
        >
          <AuthenticationDialogContent />
        </DialogModal>
        <GoogleMap />
      </APIProvider>
    </ThemeProvider>
  );
}

export default App;
