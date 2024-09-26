import React from "react";
import routes from "../../routes/admin-routes.js";
import AdminPage from "./admin-page.js";
import PageModel from "../page_model.js"


function AdminView() {
    return (
        <PageModel routes={routes}>
            <AdminPage />
        </PageModel>
    )
}

export default AdminView;