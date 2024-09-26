import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ContentModel from "../../../content_model.js";
import MDBox from "../../../../components/MDBox/index.js";
import UserListContent from "./UserListContent.js";
import UserCreateContent from "./UserCreateContent.js";
import { checkUserSectionAccess } from "./scripts/user-scripts.js";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";

function UserContent(){

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const notification = { add: enqueueSnackbar, close: closeSnackbar };

    useEffect(()=>{
        checkUserSectionAccess(notification, navigate, setLoading);
    }, []);

    return (
        <ContentModel>
            <MDBox py={3}>
                {!loading ? <Routes>
                    <Route path="/" element={<UserListContent />} />
                    <Route path="/create" element={<UserCreateContent />} />
                </Routes> : <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><CircularProgress /></div>}
            </MDBox>
        </ContentModel>
    );
}

export default UserContent;