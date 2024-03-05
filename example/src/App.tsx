/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {View} from 'react-native';
import {ImageAIO} from '../../src';
function App(): React.JSX.Element {
  return (
      <View>
        <ImageAIO source='' parentLoading={false} placeholder={false} style={{width: 'red'}} />
      </View>
  );
}

export default App;
