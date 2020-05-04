// new client button
import React from 'react'
import * as AppRoutes from "../routes";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar() {
    return (
        <div>
            <Link to={AppRoutes.ADD_CLIENT} className="btn btn-success btn-block">
                 <FontAwesomeIcon icon="plus" /> New Client
            </Link>
        </div>
    )
}
