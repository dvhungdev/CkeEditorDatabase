import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import React, { Suspense, useEffect, useState } from 'react';
import './App.css';
import Convert1Page from './pages/Convert1Page';
import Convert2Page from './pages/Convert2Page';
import Editor1Page from './pages/Editor1Page';
import Convert3Page from './pages/Convert3Page';
// import Convert2Page from './pages/Convert2Page';
// import Convert3Page from './pages/Convert3Page';

const TYPE_CONVERT = {
  FULL_TEXT: 0,
  LINE_TEXT: 1,
  LINE_TEXT_SPACE: 2,
  LINE_TEXT_SPACE_IN_NGHIENG: 3,
  LINE_FULL: 4,
}

const TYPE_COLOR = {
  RED: 0,
  BLUE: 1
}

function App() {

  return (
    <div className="app">
      <h3>Editor văn bản to Database</h3>
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <ul>
            <li>
              <a href='/editor1'>Tools tổng hợp</a>
            </li>
            <li>
              <a href='/editor2'>Sắp xếp đáp án</a>
            </li>
          </ul>
          <Switch>
            <Redirect exact from="/" to="/editor1" />

            <Route path="/editor1" component={Editor1Page} />
            <Route path="/editor2" component={Convert3Page} />
            <Route path="/convert1" component={Convert1Page} />
            <Route path="/convert2" component={Convert2Page} />
          </Switch>
        </BrowserRouter>
      </Suspense>

    </div >
  );
}

export default App;
