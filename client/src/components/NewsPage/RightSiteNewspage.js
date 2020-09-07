import React, { useState } from 'react';
import moment from 'moment';
import { Avatar, Card, Input, Tag, Affix } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_NEWS_BY_MOSTPOPULAR, GET_JOBS } from '../../graphql/query';

const RightSiteNewspage = () => {
  // const [lastjob, setLastjob] = useState([
  //   {
  //     img: '/img/jobsuche_blue.jpg',
  //     titile: 'KOOMPI Company',
  //     pos: 'Graphic Design',
  //     Date: '20/20/2020',
  //   },
  //   {
  //     img: '/img/jobsuche_blue.jpg',
  //     titile: 'KOOMPI Company',
  //     pos: 'Graphic Design',
  //     Date: '20/20/2020',
  //   },
  //   {
  //     img: '/img/jobsuche_blue.jpg',
  //     titile: 'KOOMPI Company',
  //     pos: 'Graphic Design',
  //     Date: '20/20/2020',
  //   },
  // ]);
  const DisplayJobs = () => {
    const { loading, error, data, refetch } = useQuery(GET_JOBS);
    if (loading) {
      return 'laoding....';
    }
    console.log(data);
    if (error) return `Error! ${error.message}`;
    return (
      <div style={{ marginTop: '30px' }}>
        {data.allJob.slice(0, 6).map((res, index) => {
          return (
            <div style={{ display: 'flex' }}>
              <div style={{ marginBottom: '12px' }}>
                <Avatar
                  // style={{ borderRadius: '40px' }}
                  shape="square"
                  size="large"
                  src={'http://localhost:8080/' + res.image}
                />
              </div>
              <div
                style={{
                  display: ' flex',
                  paddingLeft: '12px',
                  marginBottom: '24px',
                  marginTop: '-12px',
                }}
              >
                <div>
                  <h3 style={{ marginBottom: '-8px' }}>{res.company}</h3>
                  <span>{res.position}</span>
                  <br></br>
                  <span>
                    {moment.unix(res.createAt / 1000).format('YYYY-MM-DD')}
                  </span>
                </div>
                {/* <div style={{ paddingLeft: '12px' }}>
                  <Tag color="default">featured</Tag>
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  const { loading, error, data, refetch } = useQuery(GET_NEWS_BY_MOSTPOPULAR);
  if (loading) {
    return 'laoding....';
  }
  console.log(data);
  if (error) return `Error! ${error.message}`;
  return (
    <React.Fragment>
      <div className="right-site-news">
        {/* <Affix offsetTop={49}> */}
        <div>
          <h4
            style={{
              border: '1px solid #C4C4C4',
              borderLeft: '5px solid #373738',
              padding: '10px 10px 10px 10px',
            }}
          >
            Most Popular
          </h4>
        </div>
        <div style={{ marginTop: '30px' }}>
          {data.allNewsbyType.slice(0, 6).map((res, index) => {
            return (
              <div style={{ display: ' flex', marginTop: '19px' }}>
                <Avatar
                  size="large"
                  shape="square"
                  src={'http://localhost:8080/' + res.image}
                />
                <span style={{ paddingLeft: '12px', color: '#010101' }}>
                  {res.title.length <= 60
                    ? res.title
                    : res.title.substring(0, 60) + '......'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Subscribe box */}
        <div style={{ marginTop: '30px' }}>
          <Card
            className="subscribe-box"
            style={{ width: 300, backgroundColor: ' #275178' }}
          >
            <h1 style={{ color: '#FFFFFF' }}>Subscribe</h1>
            <span style={{ color: '#FFFFFF' }}>
              Get all latest content delivered to your email a few times a
              month.
            </span>
            <div style={{ marginTop: '12px' }}>
              <Input placeholder="Email" />
            </div>
          </Card>
        </div>

        {/* Lastes Jobs site */}
        <div style={{ marginTop: ' 30px' }}>
          <h4
            style={{
              border: '1px solid #C4C4C4',
              borderLeft: '5px solid #042F82',
              padding: '10px 10px 10px 10px',
            }}
          >
            Lastest Jobs
          </h4>
          <DisplayJobs />
        </div>
      </div>
      {/* </Affix> */}
    </React.Fragment>
  );
};

export default RightSiteNewspage;
