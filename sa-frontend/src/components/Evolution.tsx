import { Card, DatePicker, Form, Input, notification } from "antd";
import moment from "moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import styled from "styled-components";
import ApiService from "../services/ApiService";
import CustomButton from "../shared/CustomButton";
import { openNotification } from "../shared/Notification";

const apiService: ApiService = new ApiService();

const CustomMainContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CustomForm = styled(Form)`
    width: 100%;
    display: flex;

    .ant-row {
        height: 100%;
        width: 100%;

        &.buttonFiltersDiv {
            width: 30%;
        }

        .ant-col {
            display: flex;
            align-items: center;
            justify-content: center;

            .ant-form-item-control-input {
                width: 100%;
                border-radius: 12px;

                .ant-form-item-control-input-content {
                    width: 100%;
                    display : flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;

                    .ant-picker {
                        width: 100%;
                        border-radius: 12px;
                        height: 40px;
                    }

                    .ant-input {
                        border-radius: 12px;
                        height: 40px;
                    }
                }
            }
        }
    }
`;

const CustomFormItem = styled(Form.Item)`
    width: 100%;
    height: 100%;
`;

const CustomCard = styled(Card)`
    box-shadow: 10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 80%;
`;


const { RangePicker } = DatePicker;
const CustomDatePicker = styled(RangePicker)`
`;

interface Filter {
    keyword: string;
    start: string;
    end: string;
}
interface Period {
    start: string;
    end: string;
}

interface SearchResult {
    date: string;
    numberOfOccurrences: number;
}

const Evolution = () => {
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [searchEvolution, setSearchEvolution] = useState<SearchResult[]>([]);
    const [form] = CustomForm.useForm();
    const { t } = useTranslation();

    const dateParser = (period: string) => {
        const startDateAndEndDateArray = period.split(',');
        const startDate = moment(new Date(startDateAndEndDateArray[0])).toISOString().split('T')[0];
        const endDate = moment(new Date(startDateAndEndDateArray[1])).toISOString().split('T')[0];

        return [startDate, endDate];
    }

    const searchWithFilters = (values: any) => {
        const period: Period = {
            start: dateParser(values.period.toString())[0],
            end: dateParser(values.period.toString())[1]
        }
        const item: Filter = {
            keyword: values.keyword,
            start: period.start,
            end: period.end
        }

        setIsLoadingButton(true);

        setTimeout(() => {
            apiService.getEvolutionForKeyphrase(item).then((response) => {
                const result = JSON.parse(JSON.stringify(response));

                console.log(result);

                
                var auxArray: SearchResult[] = [];

                if (result.length > 0) {
                    result.forEach((element: any) => {
                        const item: SearchResult = {
                            date: element.date.split("T")[0],
                            numberOfOccurrences: element.numberOfOccurrences
                        }
                        auxArray.push(item);
                    })
                    setSearchEvolution(auxArray);
                    setIsLoadingButton(false);
                }
                else {
                    setSearchEvolution([]);
                    openNotification('Error', "Seems that this word/phrase was not found in the previously analyzed texts.", 'error')
                    setIsLoadingButton(false);
                }
            })
        }, 3000);
    }


    return (
        <CustomMainContainer>
            <CustomCard>
                <CustomForm
                    onFinish={searchWithFilters}
                    form={form}
                    initialValues={{
                        keyword: "",
                        period: ""
                    }}
                >
                    <CustomFormItem
                        name="keyword"
                        rules={[{ required: true, message: "Please insert keyword/keyphrase." }]}
                    >
                        <Input placeholder={t('SEARCH')} />
                    </CustomFormItem>

                    <CustomFormItem
                        name="period"
                        rules={[{ required: true, message: "Please insert period." }]}
                    >
                        <CustomDatePicker />

                    </CustomFormItem>

                    <CustomFormItem className="buttonFiltersDiv">
                        <CustomButton loading={isLoadingButton} style={{ width: "120px", height: "40px" }} type="primary" htmlType="submit">
                            {t('SUBMIT')}
                        </CustomButton>
                    </CustomFormItem>
                </CustomForm>

                <BarChart width={850} height={550} data={searchEvolution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="numberOfOccurrences" fill={"#996666"} />
                </BarChart>
            </CustomCard>
        </CustomMainContainer>
    );
}

export default Evolution;