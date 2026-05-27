#!/usr/bin/env bun
import {
  getGAClient,
  getPropertyId,
  getDateRange,
  fmtN,
  fmtPct,
  fmtDur,
  fmtDate,
  TRAVEL_REFERRAL_DOMAINS,
} from "./client";

const args = process.argv.slice(2);
const cmd = args[0];

const HELP = `
GA4 CLI for rentz.uz

USAGE
  bun run cli.ts <command> [days] [limit]

GENERAL
  test                       Verify API connection
  summary [days=7]           Users, sessions, engagement overview
  engagement [days=7]        Daily breakdown
  pages [days=7] [limit=20]  Top page paths by views
  landing [days=7] [limit=20] Top landing pages

ACQUISITION
  channels [days=7]          sessionDefaultChannelGroup breakdown
  traffic [days=7]           sessionSource / sessionMedium
  travel-referrals [days=7]  Sessions from travel/booking platforms
  demographics [days=7]      Countries + devices

CAR RENTAL
  car-interest [days=7] [limit=15]  Top car pages (/cars/*)
  booking-funnel [days=7]           Booking form events
  lead-events [days=7]              Messenger / callback / contact events
  destinations [days=7] [limit=10]  Top destination pages
`.trim();

const printHr = (n = 65) => console.log("─".repeat(n));

async function runReport(body: any) {
  const ga = await getGAClient();
  const res = await ga.properties.runReport({
    property: getPropertyId(),
    requestBody: body,
  });
  return res.data;
}

// ----------- GENERAL -----------

async function cmdTest() {
  console.log("Testing GA4 connection…");
  console.log(`Property: ${getPropertyId()}`);
  const res = await runReport({
    dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
    metrics: [{ name: "activeUsers" }],
  });
  const users = Number(res.rows?.[0]?.metricValues?.[0]?.value || 0);
  console.log(`OK. activeUsers (7d) = ${fmtN(users)}`);
}

async function cmdSummary(days: number) {
  const { startDate, endDate } = getDateRange(days);
  const res = await runReport({
    dateRanges: [{ startDate, endDate }],
    metrics: [
      { name: "activeUsers" },
      { name: "newUsers" },
      { name: "sessions" },
      { name: "screenPageViews" },
      { name: "averageSessionDuration" },
      { name: "bounceRate" },
      { name: "engagementRate" },
      { name: "sessionsPerUser" },
    ],
  });
  const m = res.rows?.[0]?.metricValues || [];

  console.log(`\nGA4 Summary — last ${days}d (${startDate} → ${endDate})`);
  printHr();
  console.log(`Active Users:        ${fmtN(Number(m[0]?.value || 0))}`);
  console.log(`New Users:           ${fmtN(Number(m[1]?.value || 0))}`);
  console.log(`Sessions:            ${fmtN(Number(m[2]?.value || 0))}`);
  console.log(`Page Views:          ${fmtN(Number(m[3]?.value || 0))}`);
  console.log(`Avg Session Duration: ${fmtDur(Number(m[4]?.value || 0))}`);
  console.log(`Engagement Rate:      ${fmtPct(Number(m[6]?.value || 0) * 100)}`);
  console.log(`Bounce Rate:          ${fmtPct(Number(m[5]?.value || 0) * 100)}`);
  console.log(`Sessions / User:      ${Number(m[7]?.value || 0).toFixed(2)}`);
  console.log();
}

async function cmdEngagement(days: number) {
  const { startDate, endDate } = getDateRange(days);
  const res = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "date" }],
    metrics: [
      { name: "activeUsers" },
      { name: "sessions" },
      { name: "engagementRate" },
      { name: "averageSessionDuration" },
    ],
    orderBys: [{ dimension: { dimensionName: "date" } }],
  });

  console.log(`\nEngagement by day — last ${days}d`);
  printHr();
  console.log("Date    Users    Sessions  Engagement   Avg Time");
  for (const row of res.rows || []) {
    const date = fmtDate(row.dimensionValues?.[0]?.value || "");
    const users = Number(row.metricValues?.[0]?.value || 0);
    const sessions = Number(row.metricValues?.[1]?.value || 0);
    const eng = Number(row.metricValues?.[2]?.value || 0) * 100;
    const dur = Number(row.metricValues?.[3]?.value || 0);
    console.log(
      `${date.padEnd(7)} ${fmtN(users).padStart(6)}  ${fmtN(sessions).padStart(8)}  ${fmtPct(eng).padStart(10)}   ${fmtDur(dur)}`
    );
  }
  console.log();
}

async function cmdPages(days: number, limit: number) {
  const { startDate, endDate } = getDateRange(days);
  const res = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "pagePath" }],
    metrics: [
      { name: "screenPageViews" },
      { name: "activeUsers" },
      { name: "averageSessionDuration" },
      { name: "bounceRate" },
    ],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit,
  });

  console.log(`\nTop ${limit} pages — last ${days}d`);
  printHr();
  let i = 1;
  for (const row of res.rows || []) {
    const path = row.dimensionValues?.[0]?.value || "—";
    const views = Number(row.metricValues?.[0]?.value || 0);
    const users = Number(row.metricValues?.[1]?.value || 0);
    const dur = Number(row.metricValues?.[2]?.value || 0);
    const bounce = Number(row.metricValues?.[3]?.value || 0) * 100;
    console.log(
      `${String(i).padStart(2)}. ${path}\n    views=${fmtN(views)} users=${fmtN(users)} time=${fmtDur(dur)} bounce=${fmtPct(bounce)}`
    );
    i++;
  }
  console.log();
}

async function cmdLanding(days: number, limit: number) {
  const { startDate, endDate } = getDateRange(days);
  const res = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "landingPage" }],
    metrics: [
      { name: "sessions" },
      { name: "activeUsers" },
      { name: "bounceRate" },
    ],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit,
  });

  console.log(`\nTop ${limit} landing pages — last ${days}d`);
  printHr();
  let i = 1;
  for (const row of res.rows || []) {
    const path = row.dimensionValues?.[0]?.value || "—";
    const sessions = Number(row.metricValues?.[0]?.value || 0);
    const users = Number(row.metricValues?.[1]?.value || 0);
    const bounce = Number(row.metricValues?.[2]?.value || 0) * 100;
    console.log(
      `${String(i).padStart(2)}. ${path}\n    sessions=${fmtN(sessions)} users=${fmtN(users)} bounce=${fmtPct(bounce)}`
    );
    i++;
  }
  console.log();
}

// ----------- ACQUISITION -----------

async function cmdChannels(days: number) {
  const { startDate, endDate } = getDateRange(days);
  const res = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "sessionDefaultChannelGroup" }],
    metrics: [
      { name: "sessions" },
      { name: "activeUsers" },
      { name: "newUsers" },
      { name: "engagementRate" },
      { name: "averageSessionDuration" },
    ],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  });

  console.log(`\nChannels — last ${days}d`);
  printHr();
  for (const row of res.rows || []) {
    const ch = row.dimensionValues?.[0]?.value || "—";
    const sessions = Number(row.metricValues?.[0]?.value || 0);
    const users = Number(row.metricValues?.[1]?.value || 0);
    const newU = Number(row.metricValues?.[2]?.value || 0);
    const eng = Number(row.metricValues?.[3]?.value || 0) * 100;
    const dur = Number(row.metricValues?.[4]?.value || 0);
    console.log(
      `${ch}\n  sessions=${fmtN(sessions)} users=${fmtN(users)} (${fmtN(newU)} new) eng=${fmtPct(eng)} time=${fmtDur(dur)}`
    );
  }
  console.log();
}

async function cmdTraffic(days: number) {
  const { startDate, endDate } = getDateRange(days);
  const res = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
    metrics: [
      { name: "sessions" },
      { name: "activeUsers" },
      { name: "bounceRate" },
    ],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 25,
  });

  console.log(`\nTraffic sources — last ${days}d`);
  printHr();
  for (const row of res.rows || []) {
    const src = row.dimensionValues?.[0]?.value || "—";
    const med = row.dimensionValues?.[1]?.value || "—";
    const sessions = Number(row.metricValues?.[0]?.value || 0);
    const users = Number(row.metricValues?.[1]?.value || 0);
    const bounce = Number(row.metricValues?.[2]?.value || 0) * 100;
    console.log(
      `${src} / ${med}\n  sessions=${fmtN(sessions)} users=${fmtN(users)} bounce=${fmtPct(bounce)}`
    );
  }
  console.log();
}

async function cmdTravelReferrals(days: number) {
  const { startDate, endDate } = getDateRange(days);
  const res = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "sessionSource" }],
    metrics: [{ name: "sessions" }, { name: "activeUsers" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 100,
  });

  console.log(`\nTravel / booking referrals — last ${days}d`);
  printHr();
  let hits = 0;
  for (const row of res.rows || []) {
    const src = (row.dimensionValues?.[0]?.value || "").toLowerCase();
    const sessions = Number(row.metricValues?.[0]?.value || 0);
    const users = Number(row.metricValues?.[1]?.value || 0);
    if (TRAVEL_REFERRAL_DOMAINS.some((d) => src.includes(d))) {
      console.log(`  ${src}  sessions=${fmtN(sessions)} users=${fmtN(users)}`);
      hits++;
    }
  }
  if (hits === 0) {
    console.log("No travel platform referrals matched for this period.");
  }
  console.log();
}

async function cmdDemographics(days: number) {
  const { startDate, endDate } = getDateRange(days);
  const countries = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "country" }],
    metrics: [{ name: "activeUsers" }, { name: "sessions" }],
    orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
    limit: 10,
  });
  const devices = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "deviceCategory" }],
    metrics: [{ name: "activeUsers" }, { name: "sessions" }],
    orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
  });

  console.log(`\nCountries (top 10) — last ${days}d`);
  printHr();
  for (const row of countries.rows || []) {
    const c = row.dimensionValues?.[0]?.value || "—";
    const u = Number(row.metricValues?.[0]?.value || 0);
    const s = Number(row.metricValues?.[1]?.value || 0);
    console.log(`  ${c.padEnd(20)} users=${fmtN(u)} sessions=${fmtN(s)}`);
  }

  console.log(`\nDevices — last ${days}d`);
  printHr();
  for (const row of devices.rows || []) {
    const d = row.dimensionValues?.[0]?.value || "—";
    const u = Number(row.metricValues?.[0]?.value || 0);
    const s = Number(row.metricValues?.[1]?.value || 0);
    console.log(`  ${d.padEnd(10)} users=${fmtN(u)} sessions=${fmtN(s)}`);
  }
  console.log();
}

// ----------- CAR RENTAL -----------

async function cmdCarInterest(days: number, limit: number) {
  const { startDate, endDate } = getDateRange(days);
  const res = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "pagePath" }],
    metrics: [
      { name: "screenPageViews" },
      { name: "activeUsers" },
      { name: "averageSessionDuration" },
    ],
    dimensionFilter: {
      filter: {
        fieldName: "pagePath",
        stringFilter: { value: "/cars/", matchType: "BEGINS_WITH" },
      },
    },
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 100,
  });

  const listing: Array<{ path: string; views: number; users: number; dur: number }> = [];
  const detail: Array<{ path: string; views: number; users: number; dur: number }> = [];
  for (const row of res.rows || []) {
    const path = row.dimensionValues?.[0]?.value || "";
    const views = Number(row.metricValues?.[0]?.value || 0);
    const users = Number(row.metricValues?.[1]?.value || 0);
    const dur = Number(row.metricValues?.[2]?.value || 0);
    const segments = path.replace(/\/$/, "").split("/").filter(Boolean);
    if (segments.length <= 2) listing.push({ path, views, users, dur });
    else detail.push({ path, views, users, dur });
  }

  console.log(`\nCar interest — last ${days}d`);
  printHr();
  if (listing.length > 0) {
    console.log("Catalog listing pages:");
    for (const r of listing.slice(0, limit)) {
      console.log(
        `  ${r.path.padEnd(40)} views=${fmtN(r.views)} users=${fmtN(r.users)} time=${fmtDur(r.dur)}`
      );
    }
  }
  console.log(`\nTop car detail pages (top ${limit}):`);
  for (const r of detail.slice(0, limit)) {
    console.log(
      `  ${r.path.padEnd(40)} views=${fmtN(r.views)} users=${fmtN(r.users)} time=${fmtDur(r.dur)}`
    );
  }
  console.log();
}

async function cmdBookingFunnel(days: number) {
  const { startDate, endDate } = getDateRange(days);

  const carPages = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
    dimensionFilter: {
      filter: {
        fieldName: "pagePath",
        stringFilter: { value: "/cars/", matchType: "BEGINS_WITH" },
      },
    },
  });

  const events = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }, { name: "totalUsers" }],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        inListFilter: {
          values: [
            "booking_submitted",
            "booking_form_opened",
            "callback_requested",
            "messenger_click",
          ],
        },
      },
    },
  });

  console.log(`\nBooking funnel — last ${days}d`);
  printHr();

  let totalViews = 0;
  let totalUsers = 0;
  for (const row of carPages.rows || []) {
    totalViews += Number(row.metricValues?.[0]?.value || 0);
    totalUsers += Number(row.metricValues?.[1]?.value || 0);
  }
  console.log(`Step 1 — Car page views: ${fmtN(totalViews)} (${fmtN(totalUsers)} users)`);

  console.log("\nStep 2-3 — Events:");
  const eventMap: Record<string, { count: number; users: number }> = {};
  for (const row of events.rows || []) {
    const ev = row.dimensionValues?.[0]?.value || "";
    eventMap[ev] = {
      count: Number(row.metricValues?.[0]?.value || 0),
      users: Number(row.metricValues?.[1]?.value || 0),
    };
  }

  for (const ev of ["booking_form_opened", "booking_submitted", "callback_requested", "messenger_click"]) {
    const d = eventMap[ev] || { count: 0, users: 0 };
    console.log(`  ${ev.padEnd(30)} count=${fmtN(d.count)} users=${fmtN(d.users)}`);
  }

  const opened = eventMap["booking_form_opened"]?.users || 0;
  const submitted = eventMap["booking_submitted"]?.users || 0;
  if (opened > 0) {
    console.log(`\n  Conversion opened → submitted: ${fmtPct((submitted / opened) * 100)}`);
  }
  if (totalUsers > 0) {
    const allLeads = (eventMap["booking_submitted"]?.users || 0) +
      (eventMap["callback_requested"]?.users || 0) +
      (eventMap["messenger_click"]?.users || 0);
    console.log(`  Overall car-view → any lead: ${fmtPct((allLeads / totalUsers) * 100)}`);
  }
  console.log();
}

async function cmdLeadEvents(days: number) {
  const { startDate, endDate } = getDateRange(days);
  const res = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }, { name: "totalUsers" }],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        inListFilter: {
          values: [
            "messenger_click",
            "callback_requested",
            "booking_submitted",
            "booking_form_opened",
            "contact_form_submitted",
            "generate_lead",
          ],
        },
      },
    },
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
  });

  console.log(`\nLead events — last ${days}d`);
  printHr();
  if (!res.rows?.length) {
    console.log("No lead events for this period.");
  } else {
    for (const row of res.rows) {
      const ev = row.dimensionValues?.[0]?.value || "—";
      const count = Number(row.metricValues?.[0]?.value || 0);
      const users = Number(row.metricValues?.[1]?.value || 0);
      console.log(`  ${ev.padEnd(30)} count=${fmtN(count)} users=${fmtN(users)}`);
    }
  }
  console.log();
}

async function cmdDestinations(days: number, limit: number) {
  const { startDate, endDate } = getDateRange(days);
  const res = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "pagePath" }],
    metrics: [
      { name: "screenPageViews" },
      { name: "activeUsers" },
      { name: "averageSessionDuration" },
    ],
    dimensionFilter: {
      filter: {
        fieldName: "pagePath",
        stringFilter: { value: "/destinations", matchType: "BEGINS_WITH" },
      },
    },
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit,
  });

  console.log(`\nDestination pages — last ${days}d`);
  printHr();
  for (const row of res.rows || []) {
    const path = row.dimensionValues?.[0]?.value || "—";
    const views = Number(row.metricValues?.[0]?.value || 0);
    const users = Number(row.metricValues?.[1]?.value || 0);
    const dur = Number(row.metricValues?.[2]?.value || 0);
    console.log(
      `  ${path.padEnd(40)} views=${fmtN(views)} users=${fmtN(users)} time=${fmtDur(dur)}`
    );
  }
  console.log();
}

// ----------- MAIN -----------

async function main() {
  if (!cmd || ["help", "--help", "-h"].includes(cmd)) {
    console.log(HELP);
    return;
  }
  const a1 = args[1];
  const a2 = args[2];
  const days = a1 ? parseInt(a1) : 7;
  const limit = a2 ? parseInt(a2) : 20;

  try {
    switch (cmd) {
      case "test": await cmdTest(); break;
      case "summary": await cmdSummary(days); break;
      case "engagement": await cmdEngagement(days); break;
      case "pages": await cmdPages(days, limit); break;
      case "landing": await cmdLanding(days, limit); break;
      case "channels": await cmdChannels(days); break;
      case "traffic": await cmdTraffic(days); break;
      case "travel-referrals": await cmdTravelReferrals(days); break;
      case "demographics": await cmdDemographics(days); break;
      case "car-interest": await cmdCarInterest(days, a2 ? parseInt(a2) : 15); break;
      case "booking-funnel": await cmdBookingFunnel(days); break;
      case "lead-events": await cmdLeadEvents(days); break;
      case "destinations": await cmdDestinations(days, a2 ? parseInt(a2) : 10); break;
      default:
        console.error(`Unknown command: ${cmd}`);
        console.log(HELP);
        process.exit(1);
    }
  } catch (err: any) {
    console.error("Error:", err.message);
    if (err.code === 403) {
      console.error("OAuth user doesn't have access to this GA4 property.");
    }
    process.exit(1);
  }
}

main();
