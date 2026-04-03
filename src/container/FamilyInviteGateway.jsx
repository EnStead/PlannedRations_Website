import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import Avatar from "../assets/Avater.jpg";
import "./familyInviteGateway.css";

const MORPH_LINES = [
  "invited you to join",
  "wants to stay accountable",
  "wants to hit goals together",
];

const APP_STORE_URL = "https://apps.apple.com";
const PLAY_STORE_URL = "https://play.google.com/store/apps";

const getDeviceType = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  return "desktop";
};

const FamilyInviteGateway = () => {
  const { token: routeToken } = useParams();
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const token = routeToken || params.get("token") || "invite";

  const familyName = params.get("familyName") || "The Johnson Family";
  const invitedBy = params.get("invitedBy") || "Bami";
  const members = Number(params.get("members") || 4);
  const maxMembers = Number(params.get("maxMembers") || 6);
  const forceState = params.get("state");
  const hasNetworkError = params.get("error") === "network";
  const appInstalled = params.get("installed") === "1";

  const isFull = forceState === "full" || members >= maxMembers;
  const isInvalid = forceState === "invalid";
  const deviceType = getDeviceType();

  const [showFallback, setShowFallback] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);

  const inviteDeepLink = `plannedrations://family/invite/${encodeURIComponent(token)}${location.search}`;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let fallbackTimer;

    if (!isInvalid && !isFull) {
      window.location.href = inviteDeepLink;
      fallbackTimer = setTimeout(() => setShowFallback(true), 1500);
    } else {
      fallbackTimer = setTimeout(() => setShowFallback(true), 400);
    }

    return () => clearTimeout(fallbackTimer);
  }, [inviteDeepLink, isFull, isInvalid]);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = window.setInterval(() => {setLineIndex((prev) => (prev + 1) % MORPH_LINES.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return undefined;

    const onOrientation = (event) => {
      const x = Math.max(-1, Math.min(1, (event.gamma || 0) / 45));
      const y = Math.max(-1, Math.min(1, (event.beta || 0) / 45));
      setParallax({ x, y });
    };

    window.addEventListener("deviceorientation", onOrientation);
    return () => window.removeEventListener("deviceorientation", onOrientation);
  }, [reduceMotion]);

  const onPointerMove = (event) => {
    if (reduceMotion) return;
    const { clientX, clientY, currentTarget } = event;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((clientY - rect.top) / rect.height - 0.5) * 2;
    setParallax({ x, y });
  };

  const onPointerLeave = () => setParallax({ x: 0, y: 0 });

  const storeUrl =
    deviceType === "ios" ? APP_STORE_URL : deviceType === "android" ? PLAY_STORE_URL : APP_STORE_URL;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(storeUrl)}`;

  const systemMessage = showFallback ? "Could not open app automatically." : "Opening app...";
  const memberText = `${Math.min(members, maxMembers)} of ${maxMembers} members currently in the family`;

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-brand-secondary via-brand-background1 to-brand-offwhite px-4 py-8 sm:px-8"
      onMouseMove={onPointerMove}
      onMouseLeave={onPointerLeave}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,.35),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(122,97,255,.18),transparent_50%)]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <div className="phone-shell relative w-[90%] max-w-[390px] rounded-[2.4rem] border border-white/70 bg-brand-offwhite p-3 shadow-[0_24px_80px_rgba(21,21,21,.2)] backdrop-blur-sm sm:w-[360px]">
          <div className="relative overflow-hidden rounded-[2rem] bg-white p-4 sm:p-5">
            <div className="system-overlay mb-4 flex items-center justify-center rounded-full border border-brand-planoff bg-white/70 px-3 py-1 text-[11px] font-medium text-brand-muted backdrop-blur-md">
              {systemMessage}
            </div>

            <div className="mb-4 flex items-center justify-between text-xs text-brand-muted">
              <span>9:41</span>
              <img src={Logo} alt="PlannedRations logo" className="h-5 w-auto" />
              <span>5G 100%</span>
            </div>

            <section
              className={`invite-card rounded-3xl border border-brand-planoff bg-brand-offwhite p-4 transition-all duration-500 ease-in-out ${reduceMotion ? "" : "invite-card-enter"}`}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={Avatar} alt={`${familyName} avatar`} className="h-12 w-12 rounded-full object-cover ring-2 ring-white" />
                  <div>
                    <h1 className={`font-heading text-lg font-bold text-brand-head ${reduceMotion ? "" : "family-shimmer"}`}>
                      {familyName}
                    </h1>
                    <p className="text-xs text-brand-muted">{memberText}</p>
                  </div>
                </div>
                {isFull ? <span className="rounded-full bg-brand-red px-2 py-0.5 text-[10px] font-bold text-white">Full</span> : null}
              </div>

              <p className="min-h-11 text-sm leading-6 text-brand-subtext">
                {invitedBy}{" "}
                <span className={reduceMotion ? "" : "morph-fade"} key={lineIndex}>
                  {MORPH_LINES[lineIndex]}
                </span>{" "}
                this family.
              </p>

              <p className="mt-3 text-sm text-brand-muted">
                Share meal plans, track progress, and grow healthier together.
              </p>

              <div className={`mt-5 transition-opacity duration-300 ${showFallback ? "opacity-100" : "opacity-0"}`}>
                {isInvalid ? (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-brand-head">This invite link isn&apos;t valid.</p>
                    <a
                      href="/contact"
                      className="inline-flex w-full items-center justify-center rounded-full border border-brand-primary px-4 py-3 text-sm font-semibold text-brand-primary transition-colors duration-200 ease-in-out hover:bg-brand-primary hover:text-white"
                    >
                      Request a new invite
                    </a>
                  </div>
                ) : isFull ? (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-brand-head">Family is full</p>
                    <p className="text-xs text-brand-muted">This family already has 6 members.</p>
                    <a
                      href={inviteDeepLink.replace("/invite/", "/create-family/")}
                      className="inline-flex w-full items-center justify-center rounded-full bg-brand-primary px-4 py-3 text-sm font-semibold text-white transition-transform duration-200 ease-in-out hover:scale-[1.01]"
                    >
                      Start Your Own Family
                    </a>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {appInstalled ? (
                      <a
                        href={inviteDeepLink}
                        className={`primary-pulse inline-flex w-full items-center justify-center rounded-full bg-brand-primary px-4 py-3 text-sm font-semibold text-white transition-transform duration-200 ease-in-out hover:scale-[1.01] ${reduceMotion ? "no-motion" : ""}`}
                      >
                        Open App & Join Family
                      </a>
                    ) : (
                      <>
                        <a
                          href={storeUrl}
                          className={`primary-pulse inline-flex w-full items-center justify-center rounded-full bg-brand-primary px-4 py-3 text-sm font-semibold text-white transition-transform duration-200 ease-in-out hover:scale-[1.01] ${reduceMotion ? "no-motion" : ""}`}
                        >
                          {deviceType === "ios" && "Download on the App Store"}
                          {deviceType === "android" && "Get it on Google Play"}
                          {deviceType === "desktop" && "Scan to Download"}
                        </a>
                        {deviceType === "desktop" ? (
                          <div className="rounded-2xl border border-brand-planoff bg-white p-3 text-center">
                            <img src={qrUrl} alt="QR code to download PlannedRations app" className="mx-auto h-[140px] w-[140px]" />
                          </div>
                        ) : null}
                      </>
                    )}
                    <a
                      href={inviteDeepLink}
                      className="inline-flex w-full items-center justify-center rounded-full border border-brand-primary px-4 py-2.5 text-sm font-medium text-brand-primary transition-colors duration-200 ease-in-out hover:bg-brand-primary hover:text-white"
                    >
                      Try opening the app again
                    </a>
                  </div>
                )}
              </div>
            </section>

            {hasNetworkError ? <div className="mt-3 rounded-xl bg-brand-orange/10 px-3 py-2 text-xs text-brand-orange">Connection issue. Try again.</div> : null}
          </div>
        </div>
      </div>

      {[
        { emoji: "\u{1F955}", x: "8%", y: "20%", scale: "text-2xl" },
        { emoji: "\u{1F951}", x: "84%", y: "16%", scale: "text-3xl" },
        { emoji: "\u{1F41F}", x: "10%", y: "76%", scale: "text-2xl" },
        { emoji: "\u{1F966}", x: "82%", y: "78%", scale: "text-3xl" },
      ].map((item, idx) => (
        <div
          key={item.emoji}
          aria-hidden="true"
          className={`food-float pointer-events-none absolute hidden rounded-full border border-white/60 bg-white/70 p-3 shadow-soft backdrop-blur-md sm:flex ${item.scale}`}
          style={{
            left: item.x,
            top: item.y,
            transform: `translate(${parallax.x * (idx + 1) * 4}px, ${parallax.y * (idx + 1) * 4}px)`,
            animationDelay: `${idx * 0.2}s`,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </main>
  );
};

export default FamilyInviteGateway;
