import React from 'react';
import {
  Heading,
  Image,
  TableContainer,
  Textarea,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Stack,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';
import { BiHeading, BiImage, BiTable, BiLineChart } from 'react-icons/bi';
import {
  BsTextareaT,
  BsFillPieChartFill,
  BsBarChartFill,
} from 'react-icons/bs';
import { MdWidgets } from 'react-icons/md';

export const AccessLayouts = [
  {
    name: 'Header',
    icon: BiHeading,
    comp: metaData => (
      <Heading overflow="auto" h="full" {...metaData}>
        {metaData.text}
      </Heading>
    ),
    props: { h: 1, w: 1, x: 0, y: 0 },
    metaData: {
      text: 'Heading',
      as: 'h2',
      size: 'xl',
      textAlign: 'center',
      functionbinding: null,
    },
  },
  {
    name: 'Image',
    icon: BiImage,
    comp: metaData => <Image {...metaData} w="full" h="full" />,
    props: { h: 1, w: 1, x: 0, y: 0 },
    metaData: {
      src: 'https://bit.ly/dan-abramov',
      alt: 'Dan Abramov',
      functionbinding: null,
    },
  },
  {
    name: 'Textarea',
    icon: BsTextareaT,
    comp: metaData => (
      <Textarea
        isReadOnly
        cursor="default"
        resize="none"
        focusBorderColor="none"
        w="full"
        h="full"
        minH="inherit"
        {...metaData}
      />
    ),
    props: { h: 1, w: 3, x: 0, y: 0 },
    metaData: {
      value: 'Your content goes here....',
      size: 'md',
      variant: 'outline',
      functionbinding: null,
    },
  },
  {
    name: 'Table',
    icon: BiTable,
    comp: metaData => {
      const isDataValid = metaData.data && Array.isArray(metaData.data);
      let columns = [];

      if (isDataValid && metaData.data.length) {
        if (typeof metaData.data[0] === 'object' && metaData.data[0] !== null) {
          columns = Object.keys(metaData.data[0]);
        }
      }

      return (
        <TableContainer
          overflowY="auto"
          borderWidth={1}
          borderColor="inherit"
          h="full"
        >
          {isDataValid ? (
            <Table {...metaData}>
              <Thead>
                <Tr>
                  {columns.map((cval, i) => (
                    <Th key={i}>{cval}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {metaData.data.map((obj, i) => (
                  <Tr key={i}>
                    {columns.map((cval, ci) => (
                      <Td key={ci}>{obj[cval]}</Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text color="red.500">Invalid Table data</Text>
          )}
        </TableContainer>
      );
    },
    props: { h: 2, w: 3, x: 0, y: 0 },
    metaData: {
      data: [
        { id: 1, name: 'Lorem ipsum' },
        { id: 2, name: 'Lorem ipsum' },
      ],
      size: 'md',
      variant: 'simple',
      functionbinding: null,
    },
  },
  {
    name: 'PieChart',
    icon: BsFillPieChartFill,
    comp: metaData => {
      return (
        <ResponsivePie
          data={metaData.data}
          id={metaData.id}
          value={metaData.value}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={2}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#999"
          arcLinkLabelsThickness={2}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
            },
          ]}
        />
      );
    },
    props: { h: 3, w: 3, x: 0, y: 0 },
    metaData: {
      data: [
        { key: 'c', count: 309 },
        { key: 'javascript', count: 282 },
        { key: 'css', count: 403 },
      ],
      id: 'key',
      value: 'count',
      functionbinding: null,
    },
  },
  {
    name: 'BarChart',
    icon: BsBarChartFill,
    comp: metaData => {
      return (
        <ResponsiveBar
          data={metaData.data}
          indexBy={metaData.id}
          keys={metaData.value}
          groupMode="grouped"
          layout="vertical"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          theme={{ textColor: '#999' }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: metaData.axisBottomLegend || '',
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: metaData.axisLeftLegend || '',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'theme', modifiers: [['darker', 1.6]] }}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              symbolShape: 'circle',
            },
          ]}
        />
      );
    },
    props: { h: 3, w: 3, x: 0, y: 0 },
    metaData: {
      data: [
        { country: 'AD', burger: 143, sandwich: 195, donut: 110 },
        { country: 'AE', burger: 137, sandwich: 117, donut: 194 },
        { country: 'AF', burger: 63, sandwich: 102, donut: 27 },
        { country: 'AG', burger: 78, sandwich: 136, donut: 97 },
      ],
      id: 'country',
      value: ['burger', 'sandwich', 'donut'],
      axisBottomLegend: 'Country',
      axisLeftLegend: 'Food',
      functionbinding: null,
    },
  },
  {
    name: 'LineChart',
    icon: BiLineChart,
    comp: metaData => {
      const data = [];
      metaData.data.forEach(obj => {
        const id = obj[metaData.id];
        let objCreatedIdx = data.findIndex(e => e.id === id);
        if (objCreatedIdx === -1) {
          data.push({ id: id, data: [] });
          objCreatedIdx = data.length - 1;
        }
        data[objCreatedIdx].data.push({
          x: obj[metaData.xValue],
          y: obj[metaData.yValue] || 0,
        });
      });

      return (
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
          }}
          curve="natural"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: metaData.axisBottomLegend || '',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: metaData.axisLeftLegend || '',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          theme={{ textColor: '#999' }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
            },
          ]}
        />
      );
    },
    props: { h: 3, w: 3, x: 0, y: 0 },
    metaData: {
      data: [
        { id: 'Corp A.', x: 0, y: 55 },
        { id: 'Corp A.', x: 1, y: 34 },
        { id: 'Corp A.', x: 2, y: 124 },
        { id: 'Corp A.', x: 3, y: 36 },
        { id: 'Corp A.', x: 4, y: 69 },
        { id: 'Corp A.', x: 5, y: 12 },
      ],
      id: 'id',
      xValue: 'x',
      yValue: 'y',
      axisBottomLegend: 'Corp',
      axisLeftLegend: 'Count',
      functionbinding: null,
    },
  },
  {
    name: 'Widget1',
    icon: MdWidgets,
    comp: metaData => (
      <Stack
        borderWidth={1}
        borderRadius="lg"
        p={3}
        direction="row"
        spacing={3}
        overflow="auto"
        w="full"
        h="full"
      >
        <Flex w="33%" bgColor={metaData.color} align="center" justify="center">
          <Icon as={MdWidgets} p={5} w="full" h="full" color="white" />
        </Flex>
        <Flex flexDirection="column" justify="center">
          <Text color={metaData.color}>{metaData.widgetLine1}</Text>
          <Text casing="uppercase">{metaData.widgetLine2}</Text>
        </Flex>
      </Stack>
    ),
    props: { h: 1, w: 3, x: 0, y: 0 },
    metaData: {
      widgetLine1: '$1.9999,50',
      widgetLine2: 'Widget Title',
      color: 'blue',
      functionbinding: null,
    },
  },
];
