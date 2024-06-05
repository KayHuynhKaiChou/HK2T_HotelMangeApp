import { HistoryOutlined, LockOutlined, PersonOutline } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { RootState } from "../../../redux/reducers";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ComponentType, useEffect, useState } from "react";
import ProfileCustomer from "../components/ProfileCustomer";

export default function PersonalPage() {
    const { menu } = useParams();
    const {response , user} = useSelector<RootState , RootState>(state => state);
    const [MenuComponent, setMenuComponent] = useState<ComponentType>(() => ProfileCustomer);

    useEffect(() => {
        switch (menu) {
            case 'profile':
                setMenuComponent(() => ProfileCustomer)
                break;
            default:
                setMenuComponent(() => <></>)
                break;
        }
    },[menu])

    return (
        <div className="bl_personalPage">
            <div className="bl_personalPage_banner">
                <div className="bl_banner_infor">
                    <div className="bl_infor_name">
                        {`Hello, ${user.firstname} ${user.surname}`}
                    </div>
                    <div className="bl_infor_optionSelect">Change Password</div>
                </div>
            </div>
            <div className="bl_personalPage_inner un_paddingDefault">
                <div className="bl_personalPage_left un_personalPage_grid">
                    <div className="bl_sidebar_commonInfor">
                        <Avatar
                            className='bl_commonInfor_avatar'
                            src={user.link_avatar} 
                        />
                        <div className="bl_commonInfor_fullName">
                            {`${user.firstname} ${user.surname}`}
                        </div>
                    </div>
                    <div className="bl_sidebar_options">
                        <div className="bl_option">
                            <PersonOutline/>
                            profile
                        </div>
                        <div className="bl_option">
                            <HistoryOutlined/>
                            booking history
                        </div>
                        <div className="bl_option">
                            <LockOutlined/>
                            change password
                        </div>
                    </div>
                </div>
                <div className="bl_personalPage_right un_personalPage_grid">
                    <MenuComponent/>
                </div>
            </div>
        </div>

    )
}
