import React from "react";
import { Routes, Route } from "react-router-dom";
import ContentModel from "../../../content_model.js";
import ProductListContent from "./ProductListContent.js";
import MDBox from "../../../../components/MDBox/index.js";
import ProductCreateContent from "./ProductCreateContent.js";
import ProductEditContent from "./ProductEditContent.js";

function ProductContent(){
    return (
        <ContentModel>
            <MDBox py={3}>
                <Routes>
                    <Route path="/" element={<ProductListContent />} />
                    <Route path="/create" element={<ProductCreateContent />} />
                    <Route path="/edit/:id" element={<ProductEditContent />} />
                </Routes>
            </MDBox>
        </ContentModel>
    );
}

export default ProductContent;