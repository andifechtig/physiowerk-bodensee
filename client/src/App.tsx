import NotFound from "@/pages/NotFound";
import { lazy, Suspense, useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { SiteLayout } from "./components/SiteLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { CANONICAL_REDIRECTS } from "./site-config";

const AppPage = lazy(() => import("./pages/AppPage"));
const Career = lazy(() => import("./pages/Career"));
const Coaching = lazy(() => import("./pages/Coaching"));
const Contact = lazy(() => import("./pages/Contact"));
const Courses = lazy(() => import("./pages/Courses"));
const Imprint = lazy(() => import("./pages/Imprint"));
const Physiotherapy = lazy(() => import("./pages/Physiotherapy"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Team = lazy(() => import("./pages/Team"));
const Training = lazy(() => import("./pages/Training"));

function CanonicalRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.history.replaceState(null, "", to);
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
          <Route path="/physiotherapie/" component={Physiotherapy} />
          <Route path="/medizinisches-training-und-fitness/" component={Training} />
          <Route path="/team-praxis/" component={Team} />
          <Route path="/karriere/" component={Career} />
          <Route path="/coaching/" component={Coaching} />
          <Route path="/app/" component={AppPage} />
          <Route path="/kurse/" component={Courses} />
          <Route path="/kontakt/" component={Contact} />
          <Route path="/impressum/" component={Imprint} />
          <Route path="/datenschutzerklaerung/" component={Privacy} />
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
