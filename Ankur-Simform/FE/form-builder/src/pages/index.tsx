import React from "react";
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import PageFallback from "../components/ErrorBoundary/fallbacks/PageFallback";
import Forms from "./routes/forms";
import AddForm from "./routes/addForm";
import Thanks from "./routes/thanks";
import FillUpForm from "./routes/fillupForm";
import PageLayout from "./Layout";

const Page: React.FC = () => {
  return (
    <PageLayout>
      <ErrorBoundary
        fallback={PageFallback}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Forms} />
            <Route exact path="/addForm" component={AddForm} />
            <Route exact path="/forms/:accessToken" component={FillUpForm} />
            <Route exact path="/thanks" component={Thanks} />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </BrowserRouter>
      </ErrorBoundary>
    </PageLayout>
  );
};

export default Page;
