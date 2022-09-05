import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import React from 'react';
import './less/Dynamic.less'

function Dynamic() {
  return (
    <div className='dynamic-content'>
      <Timeline mode="alternate">
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
        <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
          beatae vitae dicta sunt explicabo.
        </Timeline.Item>
        <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
          Technical testing 2015-09-01
        </Timeline.Item>
      </Timeline>
    </div>
  );
}

export default Dynamic;
