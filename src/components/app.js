const { BrowserRouter, Switch, Route } = require("react-router-dom");
const { useState, useEffect } = require("react");
const supabase = require("../utils/supabase");
const Nav = require("./nav");
const Login = require("./login");
const About = require("./about");
const Home = require("./home");
const Contact = require("./contact");
const Chat = require("./chat");

function App() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <BrowserRouter>
      {!session && <Login />}
      {session && (
        <div>
          <Nav />
          <div>
            <Switch>
              <Route exact={true} path="/">
                <Home />
              </Route>
              <Route path="/chat">
                <Chat user={session.user} />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
            </Switch>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

module.exports = App;
