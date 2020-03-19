import React, { lazy, Suspense } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

// import Loading from './components/Loading';
import { WithLayoutRoute } from "./routers";
import { PublicLayout } from "./layouts";

// Public
const Tasks = lazy(() => import("./pages/Public/Tasks"));

const Routes = () => {
  return (
    <Suspense fallback={<h1>Waiting for data to be loaded</h1>}>
      <Router>
        <Switch>
          <WithLayoutRoute
            exact
            path="/"
            layout={PublicLayout}
            component={Tasks}
          />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
