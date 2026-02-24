import AppRouter from "./routes/AppRouter.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { BookingProvider } from "./context/BookingProvider.jsx";
import { ProviderProvider } from "./context/ProviderProvider.jsx";

// App root with global providers.
// This structure mirrors real SaaS apps: auth + domain providers.
const App = () => {
  return (
    <AuthProvider>
      <ProviderProvider>
        <BookingProvider>
          <AppRouter />
        </BookingProvider>
      </ProviderProvider>
    </AuthProvider>
  );
};

export default App;
