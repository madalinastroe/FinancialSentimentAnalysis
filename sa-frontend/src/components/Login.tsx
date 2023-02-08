import { useEffect } from 'react'
import Navbar from '../shared/Navbar';
import CustomMainContainer from '../shared/CustomMainContainer';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import CustomContainer from '../shared/CustomContainer';
import CustomForm from '../shared/CustomForm';
import ApiService from '../services/ApiService';
import useApiError from './hooks/useApiErrors';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import CustomButton from '../shared/CustomButton';
import { openNotification } from '../shared/Notification'

const apiService: ApiService = new ApiService();

const Login = () => {
    const { t, i18n } = useTranslation()
    const [form] = CustomForm.useForm();
    const navigate = useNavigate();
    const { formLevelError, handleApiError } = useApiError();
    const [isError, setIsError] = useState(false);
    const [showSpin, setShowSpin] = useState(false);
    const { setIsLoggedIn, setId, setAccessToken } = useContext(UserContext);

    useEffect(() => {
      if(!isError) {
        return;
      }
      openNotification('Error', formLevelError, 'error', handleOnClose);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError])

    const loginSubmit = (values: any) => {
        setShowSpin(true);
        setTimeout(() => {
            apiService.login(values).then((response) => {
                const responseJson = JSON.parse(JSON.stringify(response));
                localStorage.setItem("accessToken", responseJson.accessToken);
                localStorage.setItem("id", responseJson.id);
                localStorage.setItem("language", "en");

                i18n.changeLanguage("en");
                setIsLoggedIn(true);
                setId(responseJson.id);
                setAccessToken(responseJson.accessToken);
                navigate('/');

            }).catch((error) => {
                setShowSpin(false);
                handleApiError(error.response.data);
                setIsError(true);
                form.resetFields();

            });
        }, 1000);
    };

    const handleOnClose = () => {
        setIsError(false);
    };

    return (
        <CustomMainContainer className="container">
            <Navbar />
            <CustomContainer>
                <CustomForm
                    className="loginForm"
                    form={form}
                    onFinish={loginSubmit}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{
                        loginResource: '',
                        password: ''
                    }}
                    autoComplete="on"
                >
                    <div className="helperDiv">
                        <Form.Item
                            label={t('EMAIL_OR_USERNAME')}
                            name='loginResource'
                            rules={[{ required: true, message: t('EMAIL_USERNAME_REQUIREMENT') }]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={t('PASSWORD')}
                            name="password"
                            rules={[{ required: true, message: t('PLEASE_INPUT_YOUR_PASSWORD') },
                            { min: 2, max: 200, message: t('PASSWORD_REQUIREMENTS') }]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                    </div>

                    <div className="helperDiv">
                        <Form.Item className="buttonLoginDiv" wrapperCol={{ offset: 8, span: 16 }}>
                            <CustomButton loading={showSpin} className="buttonLogin" type="primary" htmlType="submit">
                                {t('LOGIN')}
                            </CustomButton>
                        </Form.Item>

                        <Link to="/register" className="helperMessage">{t('IF_YOU_DONT_HAVE_ACCONT_REGISTER')} </Link>
                    </div>
                </CustomForm>
            </CustomContainer>
        </CustomMainContainer>
    );
}

export default Login;
