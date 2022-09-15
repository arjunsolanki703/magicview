import { useEffect, useState } from 'react';
import { Skeleton } from '@chakra-ui/react';

import { axiosInstance } from '../../../utils/RestClient';

export default function ComponentBuilder(props) {
  // props value
  const { componentFunc, layout } = props;

  // START: function execution logic
  const [state, setState] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const functionbinding = layout.metaData.functionbinding;

    if (functionbinding) {
      setIsProcessing(true);

      const requestOutputParam = functionbinding.output_param
        .map(obj => (obj.bindFromFunctionResponse ? obj.params : []))
        .flat();

      axiosInstance
        .post('/function_execute/', {
          func_uuid: functionbinding.func_uuid,
          key_name: functionbinding.key_name,
          desc: functionbinding.desc,
          input_param: JSON.stringify([
            { ...functionbinding.input_param },
            { fields: requestOutputParam.join() },
          ]),
          output_param: 'null',
        })
        .then(res => res.data)
        .then(data => {
          const dataObj = {};
          functionbinding.output_param.forEach(obj => {
            if (!obj.bindFromFunctionResponse) {
              dataObj[obj.bindToMetaDataKey] = obj.params;
            } else if (obj.multiValueBinding) {
              dataObj[obj.bindToMetaDataKey] = data.data;
            } else {
              if (data[obj.params[0]]) {
                dataObj[obj.bindToMetaDataKey] = data[obj.params[0]];
              } else {
                if (data.data && Array.isArray(data.data) && data.data[0]) {
                  dataObj[obj.bindToMetaDataKey] = data.data[0][obj.params[0]];
                } else {
                  dataObj[obj.bindToMetaDataKey] = JSON.stringify(
                    data.data || data
                  );
                }
              }
            }
          });
          setState(dataObj);
          setIsProcessing(false);
        })
        .catch(err => {
          setIsProcessing(false);
          console.log(err);
        });
    }
  }, []);
  // END: function execution logic

  return (
    <Skeleton isLoaded={!isProcessing} width="inherit" height="inherit">
      {componentFunc({
        ...layout.metaData,
        ...(layout.metaData.functionbinding && state !== null && { ...state }),
      })}
    </Skeleton>
  );
}
