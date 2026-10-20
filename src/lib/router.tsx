import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";

/**
 * Minimal hash-based router.
 * Routes look like: #/properties?intent=rent  or  #/property/meridian-residence
 * No dependencies, works from any static host (including a single-file build).
 */

export type RouteState = {
  /** e.g. "/properties" */
  path: string;
  /** path split into segments, e.g. ["properties"] */
  segments: string[];
  /** parsed query params */
  query: Record<string, string>;
  /** raw hash without the leading "#" */
  raw: string;
};

function parseHash(hash: string): RouteState {
  let raw = hash.replace(/^#/, "") || "/";
  // Drop any in-page anchor: "#/services#buying" -> "/services"
  const anchorIndex = raw.indexOf("#", 1);
  if (anchorIndex > -1) raw = raw.slice(0, anchorIndex);
  const [pathPart, queryPart = ""] = raw.split("?");
  const path = pathPart.startsWith("/") ? pathPart : `/${pathPart}`;
  const query: Record<string, string> = {};
  if (queryPart) {
    for (const pair of queryPart.split("&")) {
      if (!pair) continue;
      const [key, value = ""] = pair.split("=");
      query[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  }
  const segments = path.split("/").filter(Boolean);
  return { path, segments, query, raw };
}

const RouterContext = createContext<RouteState>({
  path: "/",
  segments: [],
  query: {},
  raw: "/",
});

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<RouteState>(() =>
    parseHash(typeof window === "undefined" ? "" : window.location.hash),
  );

  useEffect(() => {
    const onChange = () => {
      const next = parseHash(window.location.hash);
      setRoute(next);
      // Anchor links inside a page (e.g. #/contact#form) keep their scroll target.
      const anchor = window.location.hash.split("#")[2];
      if (anchor) {
        requestAnimationFrame(() => {
          document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
        });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return <RouterContext.Provider value={route}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}

export function navigate(to: string) {
  const target = to.startsWith("#") ? to : `#${to}`;
  if (window.location.hash === target) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.location.hash = target;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

export function Link({ to, children, onClick, ...rest }: LinkProps) {
  const handle = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      e.preventDefault();
      navigate(to);
    },
    [to, onClick],
  );
  return (
    <a href={`#${to}`} onClick={handle} {...rest}>
      {children}
    </a>
  );
}

/** True when the current route starts with the given path. */
export function useIsActive(path: string) {
  const { path: current } = useRouter();
  return useMemo(() => {
    if (path === "/") return current === "/";
    return current === path || current.startsWith(`${path}/`);
  }, [current, path]);
}
