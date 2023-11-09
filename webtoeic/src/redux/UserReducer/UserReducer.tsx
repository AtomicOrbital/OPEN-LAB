import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { ACCESS_TOKEN, FIREBASE_TOKEN, USER_LOGIN, history, http, settings } from "../../util/config";


export interface LoginRequestPayload {
    email: string;
    password: string;
}

export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null | undefined;
    userId: number | null;
    email: string | null;
    firebaseToken: string;
}

export interface LoginResponse {
    token: string;
    userId: number | null;
    role: string | null;
    email: string | null;
    message: string;
    status: number;
    firebaseToken: string;
}


export interface BaseResponse {
    status: number;
    message: string;
    data: any;
}

export interface RejectedValue {
    message: string;
}

const userLoginData = settings.getStorageJson(USER_LOGIN);

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token') ? true : false,
    loading: false,
    error: "",
    userId: userLoginData && userLoginData.userId ? Number(userLoginData.userId) : null,
    email: localStorage.getItem('email'),
    firebaseToken: ""
};

export const loginUser = createAsyncThunk<LoginResponse, LoginRequestPayload, { rejectValue: RejectedValue }>(
    'auth/loginUser',
    async (data: LoginRequestPayload, thunkAPI) => {
        try {
            const response: AxiosResponse<BaseResponse> = await http.post('/auth/login', data);
            console.log("Response from server:", response.data);
            if (response.data.status === 200) {
                return {
                    token: response.data.data.token,
                    userId: response.data.data.userId,
                    role: response.data.data.role,
                    email: response.data.data.email,
                    message: response.data.message,
                    status: response.data.status,
                    firebaseToken: response.data.data.firebaseToken
                };
            } else {
                return thunkAPI.rejectWithValue({ message: response.data.message });
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);





const userReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
            state.loading = false;
            state.isAuthenticated = true;

            // Lưu token vào state và ACCESS_TOKEN
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.email = action.payload.email;
            state.firebaseToken = action.payload.firebaseToken;
            settings.setStorage(ACCESS_TOKEN, action.payload.token);
            settings.setStorage(FIREBASE_TOKEN, action.payload.firebaseToken);
            // Lưu toàn bộ thông tin API trả về vào userLogin
            settings.setStorageJson(USER_LOGIN, {
                token: action.payload.token,
                userId: action.payload.userId,
                role: action.payload.role,
                email: action.payload.email,
                firebaseToken: action.payload.firebaseToken
            });
            history.push("/home");
        });

        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            if (action.payload) {
                state.error = action.payload.message;
            } else if (action.error) {
                state.error = action.error.message;
            }
        });

    },
});
export default userReducer.reducer;
