import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import {
  unstable_HistoryRouter as HistoryBrowser,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import { history } from './util/config';
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import AuthGuard from './components/AuthGuard';
import AdminPage from './pages/AdminPage/AdminPage';
import IoTPage from './pages/Home/IoTPage/IoTPage';
import AIPage from './pages/Home/AIPage/AIpage';
import FiveGPage from './pages/Home/FiveGPage/FiveGPage';
import IoTNodePage from './pages/Home/IoTPage/IoTNodePage/IoTNodePage/IoTNodePage';
import IoTGatewayPage from './pages/Home/IoTPage/IoTGatewayPage/IoTGatewayPage';
import IoTCloudPage from './pages/Home/IoTPage/IoTCloudPage/IoTCloudPage';
import SourceBlock from './pages/Home/IoTPage/IoTNodePage/SourceBlock/SourceBlock';
import DetailSourceBlockPage from './pages/Home/IoTPage/IoTNodePage/SourceBlock/DetailSourceBlockPage/DetailSourceBlockPage';
import SensorBlock from './pages/Home/IoTPage/IoTNodePage/SensorBlock/SensorBlock';
import DetailSensorBlockPage from './pages/Home/IoTPage/IoTNodePage/SensorBlock/DetailkSensorBlockPage/DetailSensorBlockPage';
import ControllerBlock from './pages/Home/IoTPage/IoTNodePage/ControllerBlock/ControllerBlock';
import DetailControllerBlockPage from './pages/Home/IoTPage/IoTNodePage/ControllerBlock/DetailControllerBlockPage/DetailControllerBlockPage';
import PeripheralBlock from './pages/Home/IoTPage/IoTNodePage/PeripheralBlock/PeripheralBlock';
import DetailPeripheralBlockPage from './pages/Home/IoTPage/IoTNodePage/PeripheralBlock/DetailPeripheralBlockPage/DetailPeripheralBlockPage';
import ChatComponent from './components/BoxChat/ChatComponent';
import FirebaseAuthGuard from './components/FirebaseAuthGuard';
import PracticeSourceBlock from './pages/Home/IoTPage/IoTNodePage/SourceBlock/DetailSourceBlockPage/PracticeSourceBlock';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryBrowser history={history}>
      <Routes>
        <Route path="" element={<Login />}></Route>
        <Route path="/home" element={<AuthGuard><Home /></AuthGuard>}></Route>

        <Route path="/home/IoT" element={<AuthGuard><IoTPage /></AuthGuard>}></Route>
        <Route path="/home/AI" element={<AuthGuard><AIPage /></AuthGuard>}></Route>
        <Route path="/home/5G" element={<AuthGuard><FiveGPage /></AuthGuard>}></Route>
        <Route path='/admin' element={<AuthGuard><AdminPage /></AuthGuard>}></Route>

        <Route path="/home/IoT/Node" element={<AuthGuard><IoTNodePage /></AuthGuard>}></Route>
        <Route path="/home/IoT/Node/source_block" element={<AuthGuard><SourceBlock /></AuthGuard>}></Route>
        <Route path="/home/IoT/Node/source_block/detailKhoiNguon" element={<AuthGuard><DetailSourceBlockPage /></AuthGuard>}></Route>
        <Route path="/home/IoT/Node/source_block/detailKhoiNguon/practiceSourceBlock" element={<AuthGuard><PracticeSourceBlock /></AuthGuard>}></Route>

        <Route path="/home/IoT/Node/sensor_block" element={<AuthGuard><SensorBlock /></AuthGuard>}></Route>
        <Route path="/home/IoT/Node/sensor_block/detailKhoiCamBien" element={<AuthGuard><DetailSensorBlockPage /></AuthGuard>}></Route>

        <Route path="/home/IoT/Node/controller_block" element={<AuthGuard><ControllerBlock /></AuthGuard>}></Route>
        <Route path="/home/IoT/Node/controller_block/detailKhoiDieuKhien" element={<AuthGuard><DetailControllerBlockPage /></AuthGuard>}></Route>

        <Route path="/home/IoT/Node/peripheral_block" element={<AuthGuard><PeripheralBlock /></AuthGuard>}></Route>
        <Route path="/home/IoT/Node/peripheral_block/detailKhoiNgoaiVi" element={<AuthGuard><DetailPeripheralBlockPage /></AuthGuard>}></Route>

        <Route path="/home/IoT/Gateway" element={<AuthGuard><IoTGatewayPage /></AuthGuard>}></Route>
        <Route path="/home/IoT/Cloud" element={<AuthGuard><IoTCloudPage /></AuthGuard>}></Route>

        <Route path='/boxchat' element={<FirebaseAuthGuard><ChatComponent /></FirebaseAuthGuard>}></Route>

        <Route path='*' element={<Navigate to="" />}></Route>
      </Routes>
    </HistoryBrowser>
  </Provider >
);

