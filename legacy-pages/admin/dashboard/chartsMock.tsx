export const chartData = {
  apex: {
    pie: {
      series: [25, 2, 15],
      options: {
        chart: {
          type: "donut",
        },
        colors: ["#745FF9", "#E74A4B", "#FF943B"],
        labels: ["On progress", "Canceled", "Booked"],
        stroke: {
          show: false,
          width: 0,
        },
        plotOptions: {
          pie: {
            donut: {
              size: "45%",
            },
          },
        },
        dataLabels: {
          dropShadow: {
            enabled: false,
          },
        },
        legend: {
          show: false,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    },
  },
};

export const splineArea = {
  spline: {
    series: [
      {
        name: "Income",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Outcome",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      fill: {
        colors: ["rgba(0, 0, 0, 0)", "rgba(0,0,0,0)"],
        type: "solid",
      },
      colors: ["#D9D9D9", "#7E72F2"],
      legend: {
        position: "top",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      grid: {
        borderColor: "rgba(196, 196, 196, 0.2)",
      },
      yaxis: {
        labels: {
          style: {
            colors: [
              "rgba(18, 4, 0, .5)",
              "rgba(18, 4, 0, .5)",
              "rgba(18, 4, 0, .5)",
              "rgba(18, 4, 0, .5)",
              "rgba(18, 4, 0, .5)",
              "rgba(18, 4, 0, .5)",
              "rgba(18, 4, 0, .5)",
            ],
            fontWeight: 300,
          },
        },
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
        labels: {
          style: {
            colors: [
              "rgba(18, 4, 0, .5)",
              "rgba(18, 4, 0, .5)",
              "rgba(18, 4, 0, .5)",
              "rgba(18, 4, 0, .5)",
              "rgba(18, 4, 0, .5)",
              "rgba(18, 4, 0, .5)",
              "rgba(18, 4, 0, .5)",
            ],
            fontWeight: 300,
          },
        },
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  },
};

const Component = () => {
  return null;
};

export async function getServerSideProps(_context: unknown) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Component;
