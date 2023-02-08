import { Card, DatePicker, Form } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TagCloud } from "react-tagcloud";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import styled from "styled-components";
import ApiService from "../services/ApiService";
import CustomButton from "../shared/CustomButton";
import { openNotification } from "../shared/Notification";

const { RangePicker } = DatePicker;

const CustomDatePicker = styled(RangePicker)`
    height: 50%;
    width: 15%;
    margin: 3%;

    .ant-picker-suffix {
        color: #1976d2;
    }
`;

const CustomForm = styled(Form)`
    display: flex;
    align-items: center;
`;

const CustomFormItem = styled(Form.Item)`
    &.ant-row {
        width: 100%;
        height: 100%;

        .ant-col {
            height: 100%;
        }

        .ant-form-item-control-input {
            width: 100%;
            height: 100%;

            .ant-form-item-control-input-content {
                display: flex;
                align-items: center;

                .ant-picker {
                    width: 80%;
                    border-radius: 12px;
                    height: 40px;
                }
            }
        }

        &.buttonFiltersDiv {
            width: 30%;
        }
    }
`;

const CustomMainContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
    overflow: scroll;
`;

const CustomCard = styled(Card)`
    box-shadow: 10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 80%;
    margin: 20px;
`;

const apiService: ApiService = new ApiService();

interface Search {
    name: string;
    keywordName: string;
    numberOfOccurrences: number;
};

interface TagCloudItem {
    value: string;
    count: number;
};

const Trending = () => {
    const [occurrences, setOccurrences] = useState<Search[]>([]);
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [form] = CustomForm.useForm();
    const { t } = useTranslation();
    const [wordCloudItems, setWordCloudItems] = useState<TagCloudItem[]>([]);

    const dateParser = (period: string) => {
        const startDateAndEndDateArray = period.split(',');
        const startDate = moment(new Date(startDateAndEndDateArray[0])).toISOString().split('T')[0];
        const endDate = moment(new Date(startDateAndEndDateArray[1])).toISOString().split('T')[0];

        return [startDate, endDate];
    }

    interface Period {
        startDate: string;
        endDate: string;
    }

    const searchWithFilters = (values: any) => {
        const item: Period = {
            startDate: dateParser(values.period.toString())[0],
            endDate: dateParser(values.period.toString())[1]
        }

        setIsLoadingButton(true);

        setTimeout(() => {
            apiService.getUserSearchesTrends(item).then((response) => {
                const result = JSON.parse(JSON.stringify(response));

                if (result.length > 0) {
                    var auxArray: Search[] = [];

                    result.forEach((element: any) => {
                        const item: Search = {
                            name: element.keywordName,
                            keywordName: element.keywordName,
                            numberOfOccurrences: element.numberOfOccurrences
                        }
                        auxArray.push(item);
                    })
                    setOccurrences(auxArray);
                    setIsLoadingButton(false);
                }
                else {
                    openNotification('Error', "No data was found for the selected period.", 'error')
                    setOccurrences([]);
                    setIsLoadingButton(false);
                }
            })
        }, 3000);
    }

    const getWordcloud = () => {
        const auxWordcloudArray: TagCloudItem[] = [];

        apiService.getKeywordsForWordcloud().then((response) => {
            const result = JSON.parse(JSON.stringify(response));
            console.log(result);
            result.forEach((word: any) => {
                const auxItem: TagCloudItem = {
                    value: word.keywordName,
                    count: word.numberOfOccurrences
                }

                auxWordcloudArray.push(auxItem);
            })
            console.log(auxWordcloudArray);
            setWordCloudItems(auxWordcloudArray);
        })

    }

    useEffect(() => {
        getWordcloud();
    }, [])

    return (
        <CustomMainContainer>
            <CustomCard>
                <CustomForm
                    className="filtersForm"
                    onFinish={searchWithFilters}
                    form={form}
                    initialValues={{
                        period: ""
                    }}
                >
                    <CustomFormItem
                        name="period"
                        rules={[{ required: true, message: "Please insert period." }]}
                    >
                        <CustomDatePicker />

                    </CustomFormItem>

                    <CustomFormItem className="buttonFiltersDiv">
                        <CustomButton loading={isLoadingButton} type="primary" htmlType="submit" style={{ width: "120px", height: "40px" }}>{t('SUBMIT')}</CustomButton>
                    </CustomFormItem>
                </CustomForm>

                <BarChart width={850} height={550} data={occurrences}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="keywordName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="numberOfOccurrences" fill={"#996666"} />
                </BarChart>
            </CustomCard>
            <CustomCard style={{marginBottom: 80}}>
                <TagCloud
                    minSize={12}
                    maxSize={35}
                    tags={wordCloudItems}
                    onClick={(tag: any) => openNotification(`${tag.value}`, `Number of occurences: ${tag.count}`, 'info')}
                />
            </CustomCard>
        </CustomMainContainer>
    );
}

export default Trending;
