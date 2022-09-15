export const AccessLayoutsConfig = {
  // Header
  Header: {
    generic: [
      {
        metaDataKey: 'text',
        label: 'Text',
        component: 'Input',
        placeholder: 'Enter a Heading text',
      },
      {
        metaDataKey: 'as',
        label: 'Heading type',
        component: 'Select',
        placeholder: 'Select a Heading type',
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      },
      {
        metaDataKey: 'size',
        label: 'Font Size',
        component: 'Select',
        placeholder: 'Select a font size',
        options: ['4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs'],
      },
      {
        metaDataKey: 'textAlign',
        label: 'Text Align',
        component: 'Select',
        placeholder: 'Select text alignment',
        options: [
          'center',
          'end',
          'start',
          'left',
          'right',
          'justify',
          'initial',
        ],
      },
    ],
    functionbinding: {
      metaDataKey: 'functionbinding',
      isAccepted: true,
      binding: [
        {
          bindToMetaDataKey: 'text',
          dataTypeAccepted: ['string', 'integer'],
          multiValueBinding: false,
          bindFromFunctionResponse: true,
        },
      ],
    },
  },
  // Image
  Image: {
    generic: [
      {
        metaDataKey: 'src',
        label: 'Source URI',
        component: 'Input',
        placeholder: 'Enter the Image source uri',
      },
      {
        metaDataKey: 'alt',
        label: 'Image Alternate text',
        component: 'Input',
        placeholder: 'Image alternate text to show',
      },
    ],
    functionbinding: {
      metaDataKey: 'functionbinding',
      isAccepted: true,
      binding: [
        {
          bindToMetaDataKey: 'src',
          dataTypeAccepted: ['string'],
          multiValueBinding: false,
          bindFromFunctionResponse: true,
        },
      ],
    },
  },
  // Textarea
  Textarea: {
    generic: [
      {
        metaDataKey: 'value',
        label: 'Value',
        component: 'Textarea',
        placeholder: 'Enter the Textarea text',
      },
      {
        metaDataKey: 'size',
        label: 'Size',
        component: 'Select',
        placeholder: 'Select a font size',
        options: ['lg', 'md', 'sm', 'xs'],
      },
      {
        metaDataKey: 'variant',
        label: 'Variant',
        component: 'Select',
        placeholder: 'Select a textarea variant',
        options: ['outline', 'flushed', 'filled', 'unstyled'],
      },
    ],
    functionbinding: {
      metaDataKey: 'functionbinding',
      isAccepted: true,
      binding: [
        {
          bindToMetaDataKey: 'value',
          dataTypeAccepted: ['string', 'integer'],
          multiValueBinding: false,
          bindFromFunctionResponse: true,
        },
      ],
    },
  },
  // Table
  Table: {
    generic: [
      {
        metaDataKey: 'size',
        label: 'Size',
        component: 'Select',
        placeholder: 'Select a table font size',
        options: ['lg', 'md', 'sm'],
      },
      {
        metaDataKey: 'variant',
        label: 'Variant',
        component: 'Select',
        placeholder: 'Select a table variant',
        options: ['simple', 'striped'],
      },
    ],
    functionbinding: {
      metaDataKey: 'functionbinding',
      isAccepted: true,
      binding: [
        {
          bindToMetaDataKey: 'data',
          dataTypeAccepted: ['string', 'integer'],
          multiValueBinding: true,
          bindFromFunctionResponse: true,
        },
      ],
    },
  },
  // PieChart
  PieChart: {
    generic: [],
    functionbinding: {
      metaDataKey: 'functionbinding',
      isAccepted: true,
      binding: [
        {
          bindToMetaDataKey: 'data',
          dataTypeAccepted: ['string', 'integer'],
          multiValueBinding: true,
          bindFromFunctionResponse: true,
        },
        {
          bindToMetaDataKey: 'id',
          dataTypeAccepted: ['string', 'integer'],
          multiValueBinding: false,
          bindFromFunctionResponse: false,
        },
        {
          bindToMetaDataKey: 'value',
          dataTypeAccepted: ['string', 'integer'],
          multiValueBinding: false,
          bindFromFunctionResponse: false,
        },
      ],
    },
  },
  // BarChart
  BarChart: {
    generic: [
      {
        metaDataKey: 'axisBottomLegend',
        label: 'Bottom Axis Legend Name',
        component: 'Input',
        placeholder: 'Enter the Bottom axis legend name',
      },
      {
        metaDataKey: 'axisLeftLegend',
        label: 'Left Axis Legend Name',
        component: 'Input',
        placeholder: 'Enter the Left axis legend name',
      },
    ],
    functionbinding: {
      metaDataKey: 'functionbinding',
      isAccepted: true,
      binding: [
        {
          bindToMetaDataKey: 'data',
          dataTypeAccepted: ['string', 'integer'],
          multiValueBinding: true,
          bindFromFunctionResponse: true,
        },
        {
          bindToMetaDataKey: 'id',
          dataTypeAccepted: ['string', 'integer'],
          multiValueBinding: false,
          bindFromFunctionResponse: false,
        },
        {
          bindToMetaDataKey: 'value',
          dataTypeAccepted: ['string', 'integer'],
          multiValueBinding: true,
          bindFromFunctionResponse: false,
        },
      ],
    },
  },
  // LineChart
  LineChart: {
    generic: [
      {
        metaDataKey: 'axisBottomLegend',
        label: 'Bottom Axis Legend Name',
        component: 'Input',
        placeholder: 'Enter the Bottom axis legend name',
      },
      {
        metaDataKey: 'axisLeftLegend',
        label: 'Left Axis Legend Name',
        component: 'Input',
        placeholder: 'Enter the Left axis legend name',
      },
    ],
    functionbinding: {
      metaDataKey: 'functionbinding',
      isAccepted: true,
      binding: [
        {
          bindToMetaDataKey: 'data',
          dataTypeAccepted: ['string', 'integer'],
          multiValueBinding: true,
          bindFromFunctionResponse: true,
        },
        {
          bindToMetaDataKey: 'id',
          dataTypeAccepted: ['string', 'integer'],
          multiValueBinding: false,
          bindFromFunctionResponse: false,
        },
        {
          bindToMetaDataKey: 'xValue',
          dataTypeAccepted: ['string', 'integer'],
          multiValueBinding: false,
          bindFromFunctionResponse: false,
        },
        {
          bindToMetaDataKey: 'yValue',
          dataTypeAccepted: ['integer'],
          multiValueBinding: false,
          bindFromFunctionResponse: false,
        },
      ],
    },
  },
  // Widget1
  Widget1: {
    generic: [
      {
        metaDataKey: 'widgetLine1',
        label: 'Widget Line1',
        component: 'Input',
        placeholder: 'Enter a Widget Line1',
      },
      {
        metaDataKey: 'widgetLine2',
        label: 'Widget Line2',
        component: 'Input',
        placeholder: 'Enter a Widget Line2',
      },
      {
        metaDataKey: 'color',
        label: 'Color',
        component: 'Input',
        placeholder: 'Enter a color',
      },
    ],
    functionbinding: {
      metaDataKey: 'functionbinding',
      isAccepted: false,
      binding: [],
    },
  },
};
