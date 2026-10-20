import { useEffect } from "react";
import { RouterProvider, useRouter } from "./lib/router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WhatsAppFab } from "./components/WhatsAppFab";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";

/** Sets the base offset so content clears the fixed header. */
function HeaderOffset() {
  useEffect(() => {
    document.documentElement.style.setProperty("--header-h", "112px");
  }, []);
  return null;
}

function Routes() {
  const { segments, path, query } = useRouter();

  // Deep-link anchors such as #/services#buying
  useEffect(() => {
    const anchor = window.location.hash.split("#")[2];
    if (!anchor) return;
    const el = document.getElementById(anchor);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }, [path]);

  const [root, second] = segments;

  switch (root) {
    case undefined:
      return <Home />;
    case "properties":
      return <Listings query={query} />;
    case "property":
      return <PropertyDetail id={second ?? ""} />;
    case "about":
      return <About />;
    case "services":
      return <Services />;
    case "contact":
      return <Contact />;
    case "legal":
      return <Legal />;
    default:
      return <Home />;
  }
}

export default function App() {
  return (
    <RouterProvider>
      <HeaderOffset />
      <div className="flex min-h-screen flex-col bg-cream-100">
        <button
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("main-content")?.focus();
            document.getElementById("main-content")?.scrollIntoView();
          }}
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-navy-950 focus:px-5 focus:py-3 focus:text-[0.72rem] focus:font-semibold focus:uppercase focus:tracking-[0.16em] focus:text-cream-100"
        >
          Skip to content
        </button>
        <Navbar />
        <main
          id="main-content"
          tabIndex={-1}
          style={{ paddingTop: "var(--header-h, 112px)" }}
          className="flex-1 focus:outline-none"
        >
          <Routes />
        </main>
        <Footer />
        <WhatsAppFab />
      </div>
    </RouterProvider>
  );
}
