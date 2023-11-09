import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserReducer/UserReducer";
import BaiIoTReducer from "./BaiIoT/BaiIoTReducer";
import CommentBaiKhoiNguon from "./CommentBaiIoT/CommentBaiKhoiNguon";
import SensorBlockReducer from "./SensorBlockReducer/SensorBlockReducer";
import ControllerBlockReducer from "./ControllerBlockReducer/ControllerBlockReducer";
import PeripheralBlockReducer from "./PeripheralBlockReducer/PeripheralBlockReducer";
import CommentBaiKhoiCamBien from "./CommentBaiIoT/CommentBaiKhoiCamBien";
import CommentBaiKhoiDieuKhien from "./CommentBaiIoT/CommentBaiKhoiDieuKhien";
import CommentBaiKhoiNgoaiVi from "./CommentBaiIoT/CommentBaiKhoiNgoaiVi";
import VideoGrammarReducer from "./VideoGrammar/VideoGrammarReducer";
import VideoCamBienReducer from "./VideoCamBien/VideoCamBienReducer";
import VideoDieuKhienReducer from "./VideoDieuKhien/VideoDieuKhienReducer";
import VideoBaiNgoaiViReducer from "./VideoBaiNgoaiViReducer/VideoBaiNgoaiViReducer";





export const store = configureStore({
    reducer: {
        UserReducer,

        BaiIoTReducer,
        SensorBlockReducer,
        ControllerBlockReducer,
        PeripheralBlockReducer,

        CommentBaiKhoiNguon,
        CommentBaiKhoiCamBien,
        CommentBaiKhoiDieuKhien,
        CommentBaiKhoiNgoaiVi,

        VideoGrammarReducer,
        VideoCamBienReducer,
        VideoDieuKhienReducer,
        VideoBaiNgoaiViReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch