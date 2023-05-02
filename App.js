import React, {Suspense} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';

const AndroidHealth = React.lazy(() => import('./AndroidHealth'));
const IosHealth = React.lazy(() => import('./IosHealth'));

const Loading = () => {
  return null;
};

const App = () => {
  console.log(Platform.OS);
  if (Platform.OS === null || Platform.OS === '') {
    return null;
  }
  return (
    <Suspense fallback={<Loading />}>
      <SafeAreaView>
        <StatusBar />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            <Text style={styles.title}>Welcome to calories4earth</Text>
            <StatusBar style="auto" />
          </View>
          {Platform.OS === 'ios' ? <IosHealth /> : <AndroidHealth />}
        </ScrollView>
      </SafeAreaView>
    </Suspense>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
});
export default App;
