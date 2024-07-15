import React from 'react'
import {Link} from "react-router-dom"
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import RateReviewIcon from '@mui/icons-material/RateReview';

const Slidebar=()=>{
    return(
        <>
            <div className="slidebar"> 
                <Link to="/">
                    <h3>JUST_BUY</h3>
                </Link>
                <Link to="/admin/dashboard">
                  <p> <span> <DashboardIcon sx={{fontSize:"40px"}}/></span> DashBoard</p>

                </Link>
                <Link >
                   <SimpleTreeView
                    defaultCollapseIcon ={<ExpandMoreIcon sx={{fontSize:"40px"}}/>}
                    defaultExpandIcon ={<ImportExportIcon sx={{fontSize:"40px"}}/>}
                    className="tree-item"
                   >
                    <TreeItem itemId="1" label="Products" sx={{fontSize:"40px"}}>
                        <Link to="/admin/products">
                            <TreeItem itemId="2" label="All" icon={<PostAddIcon sx={{fontSize:"40px"}}/>}/>
                       </Link>
                        <Link to="/admin/product/new">
                            <TreeItem itemId="3" label="Create" icon={<AddIcon sx={{fontSize:"40px"}}/>} />
                        </Link>
            
                    </TreeItem>

                   </SimpleTreeView>
                </Link>
                <Link to="/admin/orders">
                    <p>
                    <span><ListAltIcon sx={{fontSize:"40px"}}/></span>
                        Orders
                    </p>
                </Link>
                <Link to="/admin/users">
                    <p>
                    <span><ListAltIcon sx={{fontSize:"40px"}}/></span>
                        Users
                    </p>
                </Link>
                <Link to="/admin/reviews">
                    <p>
                    <span><RateReviewIcon sx={{fontSize:"40px"}}/></span>
                       
                        Reviews
                    </p>
                </Link>
            </div>
        </>
    )
}

export default Slidebar