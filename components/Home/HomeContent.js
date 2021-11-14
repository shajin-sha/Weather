import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  Text,
  ImageBackground,
  ActivityIndicator,
  View,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import Sun from '../../images/2282190.jpg';
import Rain from '../../images/5652.jpg';
import Sun2 from '../../images/5712801.jpg';
import Clouds from '../../images/5751386.jpg';


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const HomeContent = () => {
  const [Data, setData] = useState([]);
  const [TimeNow, SetTimeNow] = useState('');
  const [DateNow, setDateNow] = useState('');

  useEffect(() => {
    //? get Time
    const MyDate = new Date();
    let hours = MyDate.toLocaleTimeString().split(':');
    let NowTime = hours[0] + ':' + hours[1];
    SetTimeNow(NowTime);
    //? get Date
    let date = MyDate.toDateString().split(' ');
    let NowDate = date[0] + ' ' + date[2] + ' | ' + date[1];
    setDateNow(NowDate);
    //? get user location
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    }).then(location => {
      // api key
      const api_key = '15f958d72a82ae04f2b70568b2a8e082';
      // url
      const uri = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${api_key}&units=metric`;
      fetch(uri).then(response => {
        response.json().then(json => {
          setData(json);
          console.log(json.weather[0]);
        });
      });
    });
  }, []);

  return (
    <SafeAreaView>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <ImageBackground
        source={Clouds}
        style={{
          height: height,
          width: width,
          alignContent: 'center',
          justifyContent: 'space-evenly',
        }}>
        {Data.main ? (
          <View>
            <Text
              style={{
                marginTop: height / 10,
                textAlign: 'center',
                fontWeight: '300',
                fontSize: 60,
                width: width,
                zIndex: 10000,
              }}>
              {TimeNow}
            </Text>
            {Data.weather && Data.weather[0].icon && (
              <Image
                style={{
                  marginVertical: 22,
                  marginHorizontal: 150,
                  position: 'absolute',
                  width: width / 5,
                  height: height / 10,
                }}
                source={{
                  uri: `https://openweathermap.org/img/wn/${Data.weather[0].icon}@4x.png`,
                }}
              />
            )}

            <Text
              style={{
                marginTop: height / 70,
                textAlign: 'center',
                fontWeight: '300',
                fontSize: 17,
                width: width,
              }}>
              {DateNow}
            </Text>
            <Text
              style={{
                marginTop: height / 500,
                textAlign: 'center',
                fontWeight: '700',
                fontSize: 17,
                width: width,
              }}>
              {Data.name}
            </Text>
            <Text
              style={{
                marginTop: height / 1.9,
                textAlign: 'center',
                fontWeight: '500',
                fontSize: 57,
                width: width,
              }}>
              {Data.main && parseInt(Data.main.temp)}
            </Text>
            <Text
              style={{
                paddingBottom: 50,
                textAlign: 'center',
                fontWeight: '100',
                fontSize: 18,
                width: width,
              }}>
              {Data.weather ? Data.weather[0].description : ''}
            </Text>
          </View>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};
export default HomeContent;
