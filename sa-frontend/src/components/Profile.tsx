import CustomContainer from "../shared/CustomContainer";
import CustomMainContainer from "../shared/CustomMainContainer";
import Navbar from "../shared/Navbar";
import styled from 'styled-components';
import CustomForm from "../shared/CustomForm";
import useApiError from "./hooks/useApiErrors";
import { useContext, useEffect, useState } from "react";
import { Form, Input } from 'antd';
import { useTranslation } from "react-i18next";
import ApiService from "../services/ApiService";
import { EditUserInterface } from "../shared/interfaces/EditUserInterface";
import { Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import CustomButton from "../shared/CustomButton";
import { openNotification } from "../shared/Notification";

const CustomRegisterForm = styled(CustomForm)`
    height: 65%;
`;

const apiService: ApiService = new ApiService();

const Profile = () => {
    const { t } = useTranslation()
    const [form] = CustomForm.useForm();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { formLevelError, handleApiError } = useApiError();
    const { id, accessToken } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const getUserDetailsArgs = {
        userId: id,
        accessToken: accessToken
    }

    const getUserDetails = () => {
        apiService.getUserDetails(getUserDetailsArgs).then((response) => {
            const result = JSON.parse(JSON.stringify(response));
            localStorage.setItem('activeUser', result.firstName);
            form.setFieldsValue({ firstName: result.firstName });
            form.setFieldsValue({ lastName: result.lastName });
            form.setFieldsValue({ username: result.username });
            form.setFieldsValue({ email: result.email });
            form.setFieldsValue({ password: result.password });
        });
    }

    const editUserSubmit = (values: any) => {
        const updateUserEntity: EditUserInterface = {
            id: id as string,
            accessToken: accessToken as string,
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            email: values.email,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
        };

        setIsLoading(true);
        setTimeout(() => {
            apiService.editUserDetails(updateUserEntity).then((_) => {
                openNotification('Success', "User detailes changed!", 'success');

            }).catch((error) => 
            { 
                handleApiError(error.response.data);
                openNotification('Error', "Email or username is already in use!", 'error');
            })

            setIsLoading(false);
        }, 1000);
    };

    useEffect(() => {
        getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <CustomMainContainer className="container">
            <Navbar />
            <CustomContainer className="editProfileContainer">

                <CustomRegisterForm
                    form={form}
                    onFinish={editUserSubmit}
                    className="editProfileForm"
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        username: "",
                        email: "",
                        newPassword: "",
                        confirmPassword: ""
                    }}
                >
                    <h2 className="titleEditAccount" style={{ paddingBottom: 25 }}>{t('EDIT_ACCOUNT')}</h2>

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
                            label={t('NEW_PASSWORD')}
                            name="newPassword"
                            rules={[
                                { min: 2, max: 200, message: t('PASSWORD_REQUIREMENTS') },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label={t('CONFIRM_PASSWORD')}
                            name="confirmPassword"
                            rules={[
                                { min: 2, max: 200, message: t('PASSWORD_REQUIREMENTS') },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (getFieldValue('confirmPassword')) {
                                            if (getFieldValue('newPassword') !== value) {
                                                return Promise.reject(new Error(t('NEW_PASS_CONFIRM_PASS_MUST_MATCH')));
                                            }
                                        }
                                        return Promise.resolve();
                                    }
                                })
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                    </div>

                    <div className="helperDiv">
                        <Form.Item className="buttonEditProfile" wrapperCol={{ offset: 8, span: 16 }}>
                            <CustomButton loading={isLoading} className="buttonLogin" type="primary" htmlType="submit" style={{ marginTop: 5 }}>
                                {t('SUBMIT')}
                            </CustomButton>
                        </Form.Item>
                    </div>
                </CustomRegisterForm>
            </CustomContainer>

            <Outlet />

        </CustomMainContainer>
    );
}

export default Profile;