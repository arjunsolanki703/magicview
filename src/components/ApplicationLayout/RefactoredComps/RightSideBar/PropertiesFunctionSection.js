import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export default function PropertiesFunctionSection(props) {
  // props
  const { metaDataKey, binding, saveFunctionBinding, selectedLayoutMetaData } =
    props;

  const functionsReducer = useSelector(store => store.functions);
  const { functions = [] } = functionsReducer;

  // START: function state logic
  const defaultFunctionState = {
    func_uuid: '',
    key_name: '',
    desc: '',
    input_param: {},
    output_param: [],
  };

  const [functionState, setFunctionState] = React.useState({
    ...defaultFunctionState,
  });
  const [selectedFunction, setSelectedFunction] = React.useState(null);

  const handleFunctionSelectionChange = e => {
    const functionObj = e.target.value
      ? functions.find(obj => obj.func_uuid === e.target.value)
      : null;

    const input_paramObj = {};
    if (functionObj) {
      functionObj.input_param.forEach(obj => (input_paramObj[obj.label] = ''));
    }

    const output_paramArr = binding.map(obj => ({ ...obj, params: [] }));

    setSelectedFunction(functionObj);
    setFunctionState({
      ...defaultFunctionState,
      ...(functionObj && {
        func_uuid: functionObj.func_uuid,
        key_name: functionObj.key_name,
        desc: functionObj.desc,
        input_param: input_paramObj,
        output_param: output_paramArr,
      }),
    });
  };

  const handleInputParamChange = (e, obj) => {
    const value = e.target.value;
    setFunctionState(prev => ({
      ...prev,
      input_param: { ...prev.input_param, [obj.label]: value },
    }));
  };

  const handleOutputParamChange = (value, i) => {
    const fieldValues = [...functionState.output_param];
    fieldValues[i].params = fieldValues[i].multiValueBinding ? value : [value];
    setFunctionState(prev => ({
      ...prev,
      output_param: fieldValues,
    }));
  };
  // END: function state logic

  // START: function save button disable logic
  const [saveBtnDisabled, setSaveBtnDisabled] = React.useState(true);

  React.useEffect(() => {
    const allInputParamSelected = Object.values(
      functionState.input_param
    ).every(val => val !== '' && val !== null && val !== undefined);

    const allOutputParamSelected = functionState.output_param.every(
      obj => obj.params.length > 0
    );

    setSaveBtnDisabled(
      !functionState.func_uuid ||
        !functionState.key_name ||
        !allOutputParamSelected ||
        !allInputParamSelected
    );
  }, [functionState]);
  // END: function save button disable logic

  // START: assigning the saved function metadata of selected layout
  React.useEffect(() => {
    if (functions.length) {
      if (selectedLayoutMetaData[metaDataKey]) {
        const functionObj = functions.find(
          obj => obj.func_uuid === selectedLayoutMetaData[metaDataKey].func_uuid
        );

        setSelectedFunction(functionObj);
        setFunctionState({ ...selectedLayoutMetaData[metaDataKey] });
      } else {
        setSelectedFunction(null);
        setFunctionState({ ...defaultFunctionState });
      }
    }
  }, [selectedLayoutMetaData, selectedLayoutMetaData[metaDataKey], functions]);
  // END: assigning the saved function metadata of selected layout

  return (
    <Box px={4}>
      <Text fontWeight="bold">Function Binding</Text>

      <Stack direction="column" spacing={3} mt={3}>
        <Box>
          <Text fontSize="sm">Name:</Text>
          <Select
            placeholder="Select a function"
            size="sm"
            variant="outline"
            value={functionState.func_uuid}
            onChange={handleFunctionSelectionChange}
          >
            {functions.map((obj, idx) => (
              <option value={obj.func_uuid} key={idx}>
                {obj.key_name}
              </option>
            ))}
          </Select>
        </Box>

        {selectedFunction && functionState.func_uuid && (
          <>
            {/* Input params */}
            {selectedFunction.input_param.length !== 0 && (
              <Box p={2} borderWidth="thin">
                <Text fontSize="sm" fontWeight="bold">
                  Input Param
                </Text>

                <Stack direction="column" spacing={3} mt={3}>
                  {selectedFunction.input_param.map((obj, idx) => (
                    <Box key={idx}>
                      <Text fontSize="sm">{obj.name}:</Text>
                      <Input
                        size="sm"
                        variant="outline"
                        value={functionState.input_param[obj.label]}
                        onChange={e => handleInputParamChange(e, obj)}
                      />
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}

            {/* Output params */}
            <Box p={2} borderWidth="thin">
              <Text fontSize="sm" fontWeight="bold">
                Output Param Binding
              </Text>

              <Stack direction="column" spacing={3} mt={3}>
                {functionState.output_param.map((bobj, bidx) => (
                  <Box key={bidx} p={2} borderWidth="thin">
                    <Text fontSize="sm" mb={2}>
                      Bind{' '}
                      <strong>
                        <u>{bobj.bindToMetaDataKey}</u>
                      </strong>{' '}
                      with:
                    </Text>
                    {bobj.multiValueBinding ? (
                      <CheckboxGroup
                        value={bobj.params}
                        onChange={val => handleOutputParamChange(val, bidx)}
                        size="sm"
                      >
                        <Stack>
                          {selectedFunction.output_param
                            .filter(obj =>
                              bobj.dataTypeAccepted.includes(obj.type)
                            )
                            .map((obj, idx) => (
                              <Checkbox value={obj.label} key={idx}>
                                {obj.name}
                              </Checkbox>
                            ))}
                        </Stack>
                      </CheckboxGroup>
                    ) : (
                      <RadioGroup
                        value={bobj.params[0] || ''}
                        onChange={val => handleOutputParamChange(val, bidx)}
                        size="sm"
                      >
                        <Stack>
                          {selectedFunction.output_param
                            .filter(obj =>
                              bobj.dataTypeAccepted.includes(obj.type)
                            )
                            .map((obj, idx) => (
                              <Radio value={obj.label} key={idx}>
                                {obj.name}
                              </Radio>
                            ))}
                        </Stack>
                      </RadioGroup>
                    )}
                  </Box>
                ))}
              </Stack>
            </Box>
          </>
        )}

        <Stack direction="row">
          <Button
            size="sm"
            variant="solid"
            colorScheme="blue"
            width="50%"
            disabled={saveBtnDisabled}
            onClick={() =>
              saveFunctionBinding(
                metaDataKey,
                JSON.parse(JSON.stringify(functionState))
              )
            }
          >
            Bind it
          </Button>

          <Button
            size="sm"
            variant="outline"
            colorScheme="red"
            width="50%"
            onClick={() => saveFunctionBinding(metaDataKey, null)}
          >
            Remove Binding
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
