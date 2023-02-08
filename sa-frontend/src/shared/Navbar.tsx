import styled from 'styled-components';
import { Avatar, Menu, MenuProps, Switch } from 'antd';
import { CalculatorOutlined, ClockCircleOutlined, DashboardOutlined, EditOutlined, LoginOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../context/UserContext';
import ApiService from '../services/ApiService';

const CustomDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    font-weight: bold;

    .ant-menu {
        color: white;
    }

    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;

    @media all and (max-width: 500px) and (max-height: 915px) {
        &.customDivForNavbar {
            display: flex;
            flex-direction: column;
            height: 100%;
            padding: 10px;
        }

        .ant-menu {
            display: flex;
            justify-content: center;
        }

        .switchDiv {
            width: 100%;
        }
    }

    @media all and (max-width: 420px) and (max-height: 900px) {
        &.customDivForNavbar {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            padding: 10px;
            
            .ant-menu-overflow {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        }

        .ant-menu {
            display: flex;
            justify-content: center;
            align-items: center;

            .ant-menu-submenu {
                display: flex;
                justify-content: center;
                align-items: flex-end;
                width: 60%;
                height: 70%;
                margin: 0;
            }
        }

        .switchDiv {
            width: 100%;
            height: 80%;
        }
    }
`;

const CustomMenu = styled(Menu)`
    width: 100%;
    height: 105%;

    &.ant-menu-overflow {
        color: #1976d2;
        border: 2px solid white;
    }

    &.accountMenu {
        height: 103%;
    }
`;

const CustomSubMenu = styled(Menu.SubMenu)`
    display: flex;
    justify-content: flex-end;
    margin-right: 15%;
`;

const CustomSwitchDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10%;
    height: 102%;
`;

const apiService: ApiService = new ApiService();

const Navbar = () => {
    const [current, setCurrent] = useState('homepage');
    const [currentLanguage, setCurrentLanguage] = useState<string>(localStorage.getItem('language') as string);
    const [toggle, setToggle] = useState(true); //use en

    const navigate = useNavigate();
    const { t, i18n } = useTranslation()
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const { id, accessToken, setId } = useContext(UserContext);
    const [initials, setInitials] = useState("");

    const handleChangeLanguage = (toggle: boolean) => {
        setToggle(!toggle);

        if (toggle === true) {
            i18n.changeLanguage("en");
            localStorage.setItem("language", "en");
            setCurrentLanguage("en");
        }
        else {
            i18n.changeLanguage("ro");
            localStorage.setItem("language", "ro");
            setCurrentLanguage("ro");
        }
    };

    const getUserDetailsArgs = {
        userId: id,
        accessToken: accessToken
    }

    const getUserDetails = () => {
        if (id) {
            apiService.getUserDetails(getUserDetailsArgs).then((response) => {
                const result = JSON.parse(JSON.stringify(response));
                setInitials(result.firstName[0].toUpperCase() + result.lastName[0].toUpperCase())
            }).catch(error => {
                if (error.response.data.Message.toLowerCase().includes('token')) {
                    logoutUser();
                }
            });
        }
    }

    useEffect(() => {
        getUserDetails();
    });

    const logoutUser = () => {
        localStorage.setItem("accessToken", "");
        localStorage.setItem("id", "");
        localStorage.setItem("language", "en");
        setCurrentLanguage("en");
        setIsLoggedIn(false);
        setId('');
        navigate("/login");
        i18n.changeLanguage("en");
    }

    const onClick: MenuProps['onClick'] = (e: any) => {
        setCurrent(e.key);
        navigate(e.key);
    };

    const menuItems = [
        {
            key: '/login',
            icon: <LoginOutlined />,
            label: `${t('LOGIN')}`,
            visibility: !isLoggedIn

        },
        {
            key: '/register',
            icon: <EditOutlined />,
            label: `${t('SIGN_UP')}`,
            visibility: !isLoggedIn,
        },
        {
            key: '/',
            icon: <DashboardOutlined />,
            label: `${t('DASHBOARD')}`,
            visibility: isLoggedIn,
        },
        {
            key: '/manage',
            icon: <CalculatorOutlined />,
            label: `${t('Manage')}`,
            visibility: isLoggedIn,
        },
        {
            key: '/history',
            icon: <ClockCircleOutlined />,
            label: `${t('HISTORY')}`,
            visibility: isLoggedIn,
        }
    ];

    return (
        <CustomDiv className="customDivForNavbar">
            <CustomMenu onClick={onClick} mode="horizontal" selectedKeys={[current]} items={menuItems.filter((menuItem) => menuItem.visibility === true)}>
            </CustomMenu>

            {isLoggedIn && <CustomMenu className="accountMenu">
                <CustomSubMenu title={<Avatar style={{ color: '#1890FF', backgroundColor: 'white' }}>{initials}</Avatar>}>
                    <Menu.Item key="/profile"
                        onClick={() => { navigate('/profile') }}
                    >
                        {t('PROFILE')}
                    </Menu.Item>

                    <Menu.Item key="/logout" onClick={logoutUser}>
                        {t('LOGOUT')}
                    </Menu.Item>

                </CustomSubMenu>
            </CustomMenu>}

            <CustomSwitchDiv className="switchDiv">
                <Switch checkedChildren="en" unCheckedChildren="ro" checked={currentLanguage === 'en' ? true : false} onChange={() => handleChangeLanguage(toggle)} />
            </CustomSwitchDiv>
        </CustomDiv>
    );
}

export default Navbar;