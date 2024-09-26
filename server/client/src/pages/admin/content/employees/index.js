import React from "react";
import { Route, Routes } from "react-router-dom"
import ContentModel from "../../../content_model.js";
import EmployeesListContent from "./EmployeesListContent.js";
import MDBox from "../../../../components/MDBox/index.js";
import EmployeesCreateContent from "./EmployeesCreateContent.js";
import EmployeesEditContent from "./EmployeesEditContent.js";

function EmployeesContent(){
    return (
        <ContentModel>
            <MDBox py={3}>
                <Routes>
                    <Route path="/" element={<EmployeesListContent />} />
                    <Route path="/create" element={<EmployeesCreateContent />} />
                    <Route path="/edit/:id" element={<EmployeesEditContent />} />
                </Routes>
            </MDBox>
        </ContentModel>
    );
}

export default EmployeesContent;