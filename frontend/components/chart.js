import React from 'react';
import { View, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Text } from 'react-native';

const YourPieChart = (a, b) => {
  const scr = Dimensions.get("window").width;
  console.log("========================",a,b)
  const data = [
    {
      name: "Likes",
      population: b,
      color: "#2ecc71", // Green color for likes
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Reports",
      population: a,
      color: "#e74c3c", // Red color for reports
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
    
    
    
    
    
  };

  return (
    <View>
      <PieChart
        data={data}
        width={scr}
        height={300}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        center={[80, 10]}
        // absolute
        hasLegend={false} // Hide legend (labels outside the PieChart)
      />
    </View>
  );
};

export default YourPieChart;