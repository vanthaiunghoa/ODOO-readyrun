/**
 * WinERP Application
 * https://winerp.vn/
 */

import React from 'react';
import { YellowBox } from 'react-native';

import Routes from './routes/index';
import{AppContainer} from './routes/index';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
	}

	render() {
		//return <Routes />;
		return <AppContainer />;
	}
}