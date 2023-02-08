import { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import CustomContainer from '../shared/CustomContainer';
import CustomForm from '../shared/CustomForm';
import CustomMainContainer from '../shared/CustomMainContainer';
import Navbar from '../shared/Navbar';
import styled from 'styled-components';
import ApiService from '../services/ApiService';
import useApiError from './hooks/useApiErrors';
import { useState } from 'react';
import CustomButton from '../shared/CustomButton';
import { openNotification } from '../shared/Notification'

const CustomRegisterForm = styled(CustomForm)`
    height: 65%;
`;

const apiService: ApiService = new ApiService();

const Register = () => {
    const { t } = useTranslation()
    const [form] = CustomForm.useForm();
    const navigate = useNavigate();
    const { formLevelError, handleApiError } = useApiError();
    const [isError, setIsError] = useState(false);
    const [showSpin, setShowSpin] = useState(false);

    useEffect(() => {
      if(!isError) {
        return;
      }
      openNotification('Error', formLevelError, 'error', handleOnClose);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError])


    const registerSubmit = (values: any) => {
        setShowSpin(true);
        setTimeout(() => {
            apiService.register(values).then((response) => {
                navigate('/login');
            }).catch((error) => {
                setShowSpin(false);
                handleApiError(error.response.data);
                setIsError(true);
                // form.resetFields();
                setTimeout(() => {
                    setIsError(false);
                }, 3000)
            })
        }, 1000)
    };


    const handleOnClose = () => {
        setIsError(false);
    };

    return (
        <CustomMainContainer className="container">
            <Navbar />
            <CustomContainer>
                <CustomRegisterForm
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                    form={form}
                    onFinish={registerSubmit}
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        username: '',
                        email: '',
                        password: ''
                    }}
                >
                    <div className="helperDiv">
                        <Form.Item
                            label={t('FIRST_NAME')}
                            name="firstName"
                            rules={[
                                { required: true, message: t('PLEASE_INPUT_YOUR_FIRST_NAME') },
                                { min: 2, max: 200, message: t('FIRST_NAME_REQUIREMENTS') },
                                {
                                    pattern: /^[a-zA-Z-]*$/i,
                                    message: t('FIRST_NAME_ALLOWANCE')
                                }
                            ]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={t('LAST_NAME')}
                            name="lastName"
                            rules={[{ required: true, message: t('PLEASE_INPUT_YOUR_LAST_NAME') },
                            { min: 2, max: 200, message: t('LAST_NAME_REQUIREMENTS') },
                            {
                                pattern: /^[a-zA-Z-]*$/i,
                                message: t('LAST_NAME_ALLOWANCE')
                            }
                            ]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={t('USERNAME')}
                            name="username"
                            rules={[{ required: true, message: t('PLEASE_INPUT_YOUR_USERNAME') },
                            { min: 2, max: 100, message: t('USERNAME_REQUIREMENTS') }
                            ]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={t('EMAIL')}
                            name="email"
                            rules={[{ required: true, message: t('PLEASE_INPUT_YOUR_MAIL') },
                            { min: 7, max: 74, message: t('EMAIL_REQUIREMENTS') },
                            {
                                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g,
                                message: t('EMAIL_INCORRECT_FORMAT')
                            }]}
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
                                {t('SIGN_UP')}
                            </CustomButton>
                        </Form.Item>

                        <Link to="/login" className="helperMessage">{t('IF_YOU_HAVE_ACCOUNT_LOGIN')} </Link>
                    </div>
                </CustomRegisterForm>
      </CustomContainer>
        </CustomMainContainer>);
}

export default Register;
