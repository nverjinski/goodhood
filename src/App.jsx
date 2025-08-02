import GoogleMap from "./maps/GoogleMap";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import Toolbar from "./components/Toolbar";

function App() {
  return (
    <ThemeProvider>
      <Toolbar>
        <ThemeToggle />
      </Toolbar>
      <GoogleMap />
    </ThemeProvider>
  );
}

export default App;
