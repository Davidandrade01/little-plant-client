import { StatusBar } from 'expo-status-bar';
import { AuthProvider, BagProvider } from './src/contexts';
import { PaperProvider } from 'react-native-paper';
import { RootNavigation } from './src/navigation';
import { SearchProvider} from './src/contexts';

export default function App() {
  return (
    <AuthProvider>
      <BagProvider>
      <SearchProvider>
        <PaperProvider>
          <RootNavigation/>
        </PaperProvider>
    </SearchProvider>
    </BagProvider>
    </AuthProvider>
    
    
  );
}


