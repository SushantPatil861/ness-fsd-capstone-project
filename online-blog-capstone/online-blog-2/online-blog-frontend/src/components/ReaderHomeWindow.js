import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PostListComponent from './PostListWindow';

export default function ReaderHomeComponent() {
    const [key, setKey] = useState('ByTag');

    return (
      <div style={{margin : "5rem"}}>
      <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="ByTag" title="For You">
          <PostListComponent searchBy="tags"/>
        </Tab>
        <Tab eventKey="ByFollowing" title="Following">
          <PostListComponent searchBy="following"/>
        </Tab>
      </Tabs>
      </div>
    );
}