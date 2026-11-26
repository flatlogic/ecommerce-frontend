import LegacyIcon from "components/compat/LegacyIcon";
import React from "react";
import { Row, Col, Progress } from "components/compat/bootstrap";
import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { chartData, splineArea } from "./chartsMock";
import SimpleLine from "./widget";
import Head from "components/compat/Head";
import HomePageWidget from "../widgets/HomePageWidget";

import s from "./Dashboard.module.scss";
import { useAppSelector } from "@/redux/hooks";
import type { User } from "types/domain";
import type { ApexOptions } from "apexcharts";

interface DashboardProps {
  currentUser: User | null;
}

interface DashboardState {
  graph: null;
  checkedArr: boolean[];
  pie: { options: ApexOptions };
}

class Index extends React.Component<DashboardProps, DashboardState> {
  override state: DashboardState = {
    graph: null,
    checkedArr: [false, false, false],
    pie: {
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
      } as ApexOptions,
    },
  };

  override componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  override componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    return this.setState({});
  };

  checkTable = (id: number) => {
    let arr: boolean[] = [];
    if (id === 0) {
      const val = !this.state.checkedArr[0];
      for (let i = 0; i < this.state.checkedArr.length; i += 1) {
        arr[i] = val;
      }
    } else {
      arr = this.state.checkedArr;
      arr[id] = !arr[id];
    }
    if (arr[0]) {
      let count = 1;
      for (let i = 1; i < arr.length; i += 1) {
        if (arr[i]) {
          count += 1;
        }
      }
      if (count !== arr.length) {
        arr[0] = !arr[0];
      }
    }
    this.setState({
      checkedArr: arr,
    });
  };

  override render() {
    return (
      <>
        <Head>
          <title>Ecommerce dashboard</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />

          <meta
            name="description"
            content="Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development"
          />
          <meta name="keywords" content="flatlogic, react templates" />
          <meta name="author" content="Flatlogic LLC." />
          <meta charSet="utf-8" />

          <meta
            property="og:title"
            content="Flatlogic - React, Vue, Angular and Bootstrap Templates and Admin Dashboard Themes"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://flatlogic-ecommerce.herokuapp.com/"
          />
          <meta
            property="og:image"
            content="https://flatlogic-ecommerce-backend.herokuapp.com/images/blogs/content_image_six.jpg"
          />
          <meta
            property="og:description"
            content="Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development"
          />
          <meta name="twitter:card" content="summary_large_image" />

          <meta property="fb:app_id" content="712557339116053" />

          <meta property="og:site_name" content="Flatlogic" />
          <meta name="twitter:site" content="@flatlogic" />
        </Head>
        <div className={s.root}>
          <h1 className="page-title">
            Welcome,{" "}
            {this.props.currentUser
              ? this.props.currentUser.firstName || "User"
              : "User"}
            ! <br />
            <small>
              <small>
                Your role is{" "}
                {this.props.currentUser && this.props.currentUser.role}
              </small>
            </small>
          </h1>
          <Row>
            <Col lg={3}>
              <SimpleLine
                color="#5EC992"
                title="97.5K"
                subtitle="Revenue Generated"
              />
            </Col>
            <Col lg={3}>
              <SimpleLine
                color="#CA4155"
                title="84.2K"
                subtitle="Revenue Generated"
              />
            </Col>
            <Col lg={3}>
              <SimpleLine
                color="#D19C48"
                title="58.8K"
                subtitle="Revenue Generated"
              />
            </Col>
            <Col lg={3}>
              <SimpleLine
                color="#4392D5"
                title="89.3K"
                subtitle="Revenue Generated"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={s.dashboardWidgetWrapper}>
                <h3 className={s.widgetMainTitle} style={{ paddingLeft: 25 }}>
                  Revenue
                </h3>
                <ApexChart
                  className="sparkline-chart"
                  series={splineArea.spline.series}
                  options={splineArea.spline.options as ApexOptions}
                  type={"area"}
                  height={350}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} xs={12}>
              <div className={`${s.widgetPadding} ${s.dashboardWidgetWrapper}`}>
                <h3 className={s.widgetMainTitle}>Browser Statistics</h3>
                <div className={s.progressItemWrap}>
                  <div className={s.flexItem}>
                    <div className={s.leftSide}>
                      <h6>Google Chrome</h6>
                      <span>73%</span>
                    </div>
                    <div className={s.rightSide}>
                      <h6>
                        800{" "}
                        <LegacyIcon
                          className={
                            "la la-arrow-right ml-sm text-success rotate-270"
                          }
                        />
                      </h6>
                      <span>13:16</span>
                    </div>
                  </div>
                  <Progress
                    value={60}
                    className={`progress-xs ${s.bgViolet}`}
                  />
                </div>
                <div className={s.progressItemWrap}>
                  <div className={s.flexItem}>
                    <div className={s.leftSide}>
                      <h6>Opera</h6>
                      <span>8%</span>
                    </div>
                    <div className={s.rightSide}>
                      <h6>
                        -200{" "}
                        <LegacyIcon
                          className={
                            "la la-arrow-right ml-sm text-danger rotate-90"
                          }
                        />
                      </h6>
                      <span>13:16</span>
                    </div>
                  </div>
                  <Progress
                    value={60}
                    className={`progress-xs ${s.bgViolet}`}
                  />
                </div>
                <div className={s.progressItemWrap}>
                  <div className={s.flexItem}>
                    <div className={s.leftSide}>
                      <h6>Firefox</h6>
                      <span>19%</span>
                    </div>
                    <div className={s.rightSide}>
                      <h6>
                        100{" "}
                        <LegacyIcon
                          className={
                            "la la-arrow-right ml-sm text-success rotate-270"
                          }
                        />
                      </h6>
                      <span>13:26</span>
                    </div>
                  </div>
                  <Progress
                    value={60}
                    className={`progress-xs ${s.bgViolet}`}
                  />
                </div>
                <div className={s.progressItemWrap}>
                  <div className={s.flexItem}>
                    <div className={s.leftSide}>
                      <h6>Internet Explorer</h6>
                      <span>27%</span>
                    </div>
                    <div className={s.rightSide}>
                      <h6>
                        -450{" "}
                        <LegacyIcon
                          className={
                            "la la-arrow-right ml-sm text-danger rotate-90"
                          }
                        />
                      </h6>
                      <span>13:16</span>
                    </div>
                  </div>
                  <Progress
                    value={60}
                    className={`progress-xs ${s.bgViolet}`}
                  />
                </div>
              </div>
            </Col>
            <Col md={6} xs={12}>
              <div className={`${s.widgetPadding} ${s.dashboardWidgetWrapper}`}>
                <h3 className={s.widgetMainTitle}>Product Orders</h3>
                <ApexChart
                  className="sparkline-chart"
                  type={"donut"}
                  height={180}
                  series={chartData.apex.pie.series}
                  options={this.state.pie.options}
                />
                <Col sm={12}>
                  <div className={`${s.pieElements} ${s.elementDesktop}`}>
                    <h5 className={"mt-3 mb-1"}>Desktop - 59.5%</h5>
                    <p className={s.piePercent}>
                      2%
                      <LegacyIcon
                        className={
                          "la la-arrow-right ml-sm text-success rotate-270"
                        }
                      />
                    </p>
                  </div>
                </Col>
                <Col sm={12}>
                  <div className={`${s.pieElements} ${s.elementMobile}`}>
                    <h5 className={"mt-3 mb-1"}>Mobile - 35.7%</h5>
                    <p className={s.piePercent}>
                      8%
                      <LegacyIcon
                        className={
                          "la la-arrow-right ml-sm text-success rotate-270"
                        }
                      />
                    </p>
                  </div>
                </Col>
                <Col sm={12}>
                  <div className={`${s.pieElements} ${s.elementTablet}`}>
                    <h5 className={"mt-3 mb-1"}>Tablet - 4.8%</h5>
                    <p className={s.piePercent}>
                      -5%
                      <LegacyIcon
                        className={
                          "la la-arrow-right ml-sm text-danger rotate-90"
                        }
                      />
                    </p>
                  </div>
                </Col>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={9}>
              <HomePageWidget />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export async function getServerSideProps(_context: unknown) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function DashboardPage() {
  const currentUser = useAppSelector((store) => store.auth.currentUser);
  return <Index currentUser={currentUser} />;
}
