import React from "react";
import { Route, Routes } from "react-router-dom"
import ContentModel from "../../../content_model.js";
import MDBox from "../../../../components/MDBox/index.js";
import FierFinancialListContent from "./FierFinancialListContent.js";
import FierCreateContent from "./FierCreateContent.js";
import FierEditContent from "./FierEditContent.js";

function FierContent(){
    return (
        <ContentModel>
            <MDBox py={3}>
                <Routes>
                    <Route path="/" element={<FierFinancialListContent />} />
                    <Route path="/create" element={<FierCreateContent />} />
                    <Route path="/edit/:id" element={<FierEditContent />} />
                </Routes>
            </MDBox>
        </ContentModel>
    );
}

export default FierContent;