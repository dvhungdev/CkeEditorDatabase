import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import React, { Suspense, useEffect, useState } from 'react';
import './App.css';
import Convert1Page from './pages/Convert1Page';
import Convert2Page from './pages/Convert2Page';
import Convert3Page from './pages/Convert3Page';

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
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/convert1" />

            <Route path="/convert1" component={Convert1Page} />
            <Route path="/convert2" component={Convert2Page} />
            <Route path="/convert3" component={Convert3Page} />
          </Switch>
        </BrowserRouter>
      </Suspense>

    </div >
  );
}

export default App;
