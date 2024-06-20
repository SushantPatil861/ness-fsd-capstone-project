import React from 'react';
import { Route, Routes } from "react-router-dom";
import UserProtectRoute from './UserProtectRoute';
import ReaderHomeComponent from '../ReaderHomeWindow';
import SignUpComponent from '../SignupWindow';
import LoginComponent from '../LoginWindow';
import DefaultHomeComponent from '../DefaultHomeWindow';
import PostReaderComponent from '../PostReaderWindow';
import WrapperComponent from '../Wrapper';
import PostCreatorComponent from '../PostCreatorWindow';
import PostCreatorComponent2 from '../PostCreatorWindow2';

export default function RouterComponent() {
    return(
            <Routes>
                <Route path="/" element={<WrapperComponent><DefaultHomeComponent /></WrapperComponent>}></Route>
                <Route path="/login" element={<WrapperComponent><LoginComponent /></WrapperComponent>}></Route>
                <Route path="/signup" element={<WrapperComponent><SignUpComponent /></WrapperComponent>}></Route>
                <Route path="/home" element={
                                            <UserProtectRoute>
                                            <WrapperComponent>
                                                <ReaderHomeComponent />
                                            </WrapperComponent>
                                            </UserProtectRoute>
                                            }></Route>
                <Route path="/:author/:postId" element={<WrapperComponent><PostReaderComponent /></WrapperComponent>}></Route>
                <Route path="/new-story" element={<PostCreatorComponent />}></Route>
                <Route path="/new-story1" element={<PostCreatorComponent2 />}></Route>
            </Routes>
    )
}