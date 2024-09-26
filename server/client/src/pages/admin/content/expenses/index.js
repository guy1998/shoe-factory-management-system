import React from "react";
import { Route, Routes } from "react-router-dom"
import ContentModel from "../../../content_model.js";
import MDBox from "../../../../components/MDBox/index.js";
import ListContent from "./ListContent.js";
import CreateContent from "./CreateContent.js";
import EditContent from "./EditContent.js";

function ExpensesContent(){
    return (
        <ContentModel>
            <MDBox py={3}>
                <Routes>
                    <Route path="/" element={<ListContent />} />
                    <Route path="/create" element={<CreateContent />} />
                    <Route path="/edit/:id" element={<EditContent />} />
                </Routes>
            </MDBox>
        </ContentModel>
    );
}

export default ExpensesContent;