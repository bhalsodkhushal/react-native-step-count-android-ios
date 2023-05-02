import React, {useState} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import GoogleFit, {Scopes} from 'react-native-google-fit';

const AndroidHealth = () => {
  const [dailySteps, setdailySteps] = useState(0);

  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_ACTIVITY_WRITE,
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_BODY_WRITE,
      Scopes.FITNESS_BLOOD_PRESSURE_READ,
      Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
      Scopes.FITNESS_BLOOD_GLUCOSE_READ,
      Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
      Scopes.FITNESS_NUTRITION_WRITE,
      Scopes.FITNESS_SLEEP_READ,
    ],
  };

  GoogleFit.checkIsAuthorized().then(() => {
    var authorized = GoogleFit.isAuthorized;

    if (authorized) {
      console.log('AAAAA');
      fetchFitnessData();
    } else {
      // Authentication if already not authorized for a particular device
      GoogleFit.authorize(options)
        .then(authResult => {
          if (authResult.success) {
            fetchFitnessData();
          } else {
            console.log('AUTH_DENIED ' + authResult.message);
          }
        })
        .catch(() => {
          console.log('AUTH_ERROR');
        });
    }
  });

  const fetchFitnessData = async () => {
    let today = new Date();
    let lastWeekDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 20,
    );
    const opt = {
      startDate: lastWeekDate.toISOString(), // required ISO8601Timestamp
      endDate: today.toISOString(), // required ISO8601Timestamp
      bucketUnit: 'DAY', // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
      bucketInterval: 1, // optional - default 1.
    };

    const res = await GoogleFit.getDailyStepCountSamples(opt);
    console.log('result here', JSON.stringify(res, null, 4));

    if (res.length !== 0) {
      for (var i = 0; i < res.length; i++) {
        if (res[i].source === 'com.google.android.gms:estimated_steps') {
          //   let data = res[i].steps.reverse();
          //   setdailySteps(data[0].value ? data[0].value : 0);
          //   let dailyStepCount = ;
          setdailySteps(res[i].steps);
        }
      }
    } else {
      console.log('Not Found');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Get latest steps count data" onPress={fetchFitnessData} />
      <Text style={styles.content}>{JSON.stringify(dailySteps, null, 2)}</Text>
    </View>
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

export default AndroidHealth;
