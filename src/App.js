import "./App.scss";
import React, {useEffect,useState} from "react";
import routes from "./routes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./pages/layout";
import { ToastContainer} from "react-toastify";
import Progress from "./components/loading/Progress.jsx";

const App = () => {
  const [animate, setAnimate] = useState(false)
  const handleProgress = (value) => {
    setAnimate(value)
  }
  return (
    <div className="app">
      <Router>
        <Progress
          isAnimating={animate}
          key="1"
          animationDuration={10}
          incrementDuration={100}
        />
        <ToastContainer />
        <Switch>
          {[...routes].map(({ path, component: Component }) => {
            return (
              <Route
                key={path}
                path={path}
                exact
                render={() => (
                  <Layout className="ant-layout-content">
                    <Component handleProgress={handleProgress} />
                  </Layout>
                )}
              />
            );
          })}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
