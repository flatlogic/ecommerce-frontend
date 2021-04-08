import React from 'react';
import { Row, Col } from 'reactstrap';

import Widget from "components/admin/Widget/Widget";

const QuickStart = () => (
  <Row>
    <Col md={10}>
      <Widget>
        <h5>Requirements:</h5>
        <ol>
          <li>1. Mac OS X, Windows, or Linux</li>
          <li>2. Yarn package + Node.js v6.5 or newer</li>
          <li>3. Running our <a href="https://github.com/flatlogic/ecommerce-backend" rel="noopener noreferrer" target="_blank">Node.js backend</a>
              <span className="small text-muted"> (Required only in full stack version)</span></li>
        </ol>
        <h5>Quick Start:</h5>
        <ol>
          <li>1. Run <code>yarn install</code></li>
          <li>2. Run <code>yarn start</code></li>
        </ol>
        <ol>
          <li>3. Set up postgres environment</li>
          <li>
            <ul>
              <li>
                <code> ##### Adjust local db:</code>
              </li><br/>
              <li>
                <code> ###### 1.  Install postgres:</code>
              </li><br/>
              <li>
                <code> - MacOS:<br/>
                  - `brew install postgres`</code>
              </li><br/>
              <li>
                <code> - Ubuntu:<br/>
                - `sudo apt update`<br/>
                - `sudo apt install postgresql postgresql-contrib`</code>
              </li><br/>
              <li>
                <code> ###### 2. Create db and admin user:<br/>
 - Before run and test connection, make sure you have created a database as described in the above configuration. You can use the `psql` command to create a user and database.<br/>
   - `psql -U postgres`</code><br/>
              </li><br/>
              <li>
                <code> - Type this command to creating a new database.<br/>
  - `postgres=> CREATE DATABASE development OWNER postgres;`<br/>
  - `postgres=> \q`</code>
              </li><br/>
              <li>
                <code> ##### Setup database tables:<br/>
 - `yarn reset`</code>
              </li><br/>
              <li>
                <code> ##### Start development build:<br/>
 - `yarn start:dev`</code>
              </li><br/>
              <li>
                <code>  ##### Start production build:<br/>
 - `yarn start`</code>
              </li><br/>
            </ul>
          </li>
          <li>4. Open backend code run <code>yarn install</code></li>
          <li>5. Run <code>yarn start:dev</code></li>
        </ol>
        <h5>There are also other npm tasks:</h5>
        <ul>
          <li><code>yarn build</code>: if you need just to build the app (without running a dev server)</li>
          <li><code>yarn lint</code>: to check the source code for syntax errors and potential issues</li><br/>
        </ul>
      </Widget>
      <p>For more instruction please refer to Sing App React readme.md.</p>
    </Col>
  </Row>
);

export default QuickStart;
