// AdminPage.jsx
import { SafeAreaView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../component/Header';
import CoursesTable from '../component/CoursesTable';

export default function AdminPage() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#f4f4f5',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Header />
      <View style={{ flex: 1 }}>
        <CoursesTable
          contentContainerStyle={{ padding: 16 }}
        />
      </View>
    </SafeAreaView>
  );
}
