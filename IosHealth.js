import React, {useState} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import AppleHealthKit from 'react-native-health';

const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Steps],
    write: [AppleHealthKit.Constants.Permissions.Steps],
  },
};

AppleHealthKit.initHealthKit(permissions, error => {
  if (error) {
    console.log('[ERROR] Cannot grant permissions!');
  }
});

const IosHealth = () => {
  const [dailySteps, setdailySteps] = useState([]);
  const [authStatus, setAuthStatus] = useState({});

  const handlePressGetAuthStatus = () => {
    AppleHealthKit.getAuthStatus(permissions, (err, result) => {
      if (err) {
        console.error(err);
      }
      setAuthStatus(result);
    });
  };

  const handlePressGetSteps = () => {
    let opt = {
      startDate: new Date(2023, 1, 1).toISOString(),
      endDate: new Date().toISOString(),
    };

    AppleHealthKit.getDailyStepCountSamples(opt, (err, results) => {
      if (err) {
        return;
      }
      setdailySteps(results);
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Button
          title="Press me to get Auth Status"
          onPress={handlePressGetAuthStatus}
        />
        <Text style={styles.content}>
          {JSON.stringify(authStatus, null, 2)}
        </Text>
      </View>

      <View style={styles.container}>
        <Button
          title="Press me to get Steps Count Data"
          onPress={handlePressGetSteps}
        />

        <Text style={styles.content}>
          {JSON.stringify(dailySteps, null, 2)}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopColor: 'darkgrey',
    borderTopWidth: 2,
  },
  content: {
    marginTop: 8,
    fontSize: 13,
    padding: 10,
  },
});

export default IosHealth;
