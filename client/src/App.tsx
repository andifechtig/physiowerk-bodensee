import NotFound from "@/pages/NotFound";
import { Suspense, useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { SiteLayout } from "./components/SiteLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { CANONICAL_REDIRECTS } from "./site-config";

import { AppPage, Career, Coaching, Contact, Courses, Imprint, Physiotherapy, Privacy, Team, Training } from "./routes";

function CanonicalRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.history.replaceState(null, "", to + window.location.search + window.location.hash);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, [to]);
  return null;
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  return (
    <SiteLayout>
      <ScrollToTop />
      <Suspense fallback={<div className="route-loading" role="status">Seite wird geladen</div>}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/physiotherapie/" component={Physiotherapy.Component} />
          <Route path="/medizinisches-training-und-fitness/" component={Training.Component} />
          <Route path="/team-praxis/" component={Team.Component} />
          <Route path="/karriere/" component={Career.Component} />
          <Route path="/coaching/" component={Coaching.Component} />
          <Route path="/app/" component={AppPage.Component} />
          <Route path="/kurse/" component={Courses.Component} />
          <Route path="/kontakt/" component={Contact.Component} />
          <Route path="/impressum/" component={Imprint.Component} />
          <Route path="/datenschutzerklaerung/" component={Privacy.Component} />
          {Object.entries(CANONICAL_REDIRECTS).map(([from, to]) => (
            <Route key={from} path={from}>
              {() => <CanonicalRedirect to={to} />}
            </Route>
          ))}
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </SiteLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <Router />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
