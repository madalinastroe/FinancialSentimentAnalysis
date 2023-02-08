import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomErrorMapper from '../../mappers/CustomErrorMapper';

const useApiError = (form?: any) => {
  const [formLevelError, setFormLevelError] = useState('');
  const { t } = useTranslation();

  const handleApiError = (error: {StatusCode: number, Message: string}) => {
    const errorDetails: any = CustomErrorMapper[error.StatusCode];

    if(errorDetails.fieldName) {
      form.setFields([{
        name: errorDetails.fieldName,
        errors: [t(errorDetails.translationKey)]
      }]);
    } else {
      setFormLevelError(t(errorDetails.translationKey));
    }
  };

  return {
    formLevelError,
    handleApiError
  };
};

export default useApiError;