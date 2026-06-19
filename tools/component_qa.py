#!/usr/bin/env python3
"""Component-level browser QA for the RLC static site.

Runs a local static server, drives gstack browse against key component instances,
and writes screenshots + metrics for PageHero/MetaRow/CtaGroup variants.

Usage:
    python3 tools/component_qa.py

Outputs:
    .gstack/design-reports/component-qa-<timestamp>/
"""

from __future__ import annotations

import json
import os
import re
import socket
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GSTACK_BROWSE = Path.home() / ".hermes/skills/gstack/browse/dist/browse"

ROUTES = [
    {"path": "/pages/gallery.html", "variant": "editorial", "selector": ".gallery-hero"},
    {"path": "/pages/contact.html", "variant": "standard", "selector": ".subpage-intro"},
    {"path": "/pages/events.html", "variant": "standard", "selector": ".subpage-intro"},
    {"path": "/pages/news.html", "variant": "standard/news", "selector": ".subpage-intro"},
    {"path": "/pages/facilities.html", "variant": "visual", "selector": ".subpage-intro"},
    {"path": "/pages/team.html", "variant": "visual", "selector": ".subpage-intro"},
    {"path": "/pages/training.html", "variant": "data-heavy", "selector": ".subpage-intro"},
    {"path": "/pages/abendlauf.html", "variant": "data-heavy", "selector": ".subpage-intro"},
    {"path": "/pages/stats.html", "variant": "data-heavy", "selector": ".subpage-intro"},
    {"path": "/pages/datenschutz.html", "variant": "compact", "selector": ".subpage-intro"},
    {"path": "/pages/impressum.html", "variant": "compact", "selector": ".subpage-intro"},
    {"path": "/pages/membership-info.html", "variant": "process", "selector": ".subpage-intro"},
    {"path": "/pages/register.html", "variant": "process", "selector": ".subpage-intro"},
    {"path": "/pages/sponsors.html", "variant": "standard", "selector": ".subpage-intro"},
]

VIEWPORTS = [
    {"name": "desktop", "size": "1440x900"},
    {"name": "mobile", "size": "390x844"},
]

METRICS_JS = r"""
(() => {
  const hero = document.querySelector('.gallery-hero, .subpage-intro');
  const bySel = (sel) => hero ? hero.querySelector(sel) : null;
  const all = (sel) => hero ? Array.from(hero.querySelectorAll(sel)) : [];
  const rect = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {top: r.top, right: r.right, bottom: r.bottom, left: r.left, width: r.width, height: r.height};
  };
  const gap = (a, b) => {
    const ar = rect(a);
    const br = rect(b);
    if (!ar || !br) return null;
    return Math.round((br.top - ar.bottom) * 10) / 10;
  };
  const rows = (items) => {
    const tops = [];
    for (const item of items) {
      const r = item.getBoundingClientRect();
      let bucket = tops.find((row) => Math.abs(row.top - r.top) <= 3);
      if (!bucket) {
        bucket = {top: r.top, count: 0};
        tops.push(bucket);
      }
      bucket.count += 1;
    }
    return tops.sort((a, b) => a.top - b.top).map((row) => row.count);
  };

  const eyebrow = bySel('.subpage-eyebrow, .gallery-eyebrow');
  const h1 = bySel('h1');
  const lead = bySel('.subpage-lead, .gallery-hero__lead');
  const metaRow = bySel('.subpage-meta-row, .gallery-hero__meta');
  const actions = bySel('.subpage-actions, .gallery-hero__actions');
  const metaItems = metaRow ? Array.from(metaRow.children).filter((el) => el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height > 0) : [];
  const ctas = actions ? Array.from(actions.querySelectorAll('a, button')).filter((el) => el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height > 0) : [];
  const ctaHeights = ctas.map((el) => Math.round(el.getBoundingClientRect().height * 10) / 10);

  return JSON.stringify({
    url: location.pathname,
    title: document.title,
    viewport: {width: window.innerWidth, height: window.innerHeight},
    heroClass: hero ? hero.className : null,
    heroRect: rect(hero),
    h1Text: h1 ? h1.textContent.trim().replace(/\s+/g, ' ') : null,
    gaps: {
      eyebrowToH1: gap(eyebrow, h1),
      h1ToLead: gap(h1, lead),
      leadToMeta: gap(lead, metaRow),
      metaToActions: gap(metaRow, actions),
      leadToActions: gap(lead, actions),
    },
    meta: {
      rowClass: metaRow ? metaRow.className : null,
      count: metaItems.length,
      visibleRows: rows(metaItems),
      gridTemplateColumns: metaRow ? getComputedStyle(metaRow).gridTemplateColumns : null,
    },
    ctas: {
      groupClass: actions ? actions.className : null,
      count: ctas.length,
      minHeight: ctaHeights.length ? Math.min(...ctaHeights) : null,
      heights: ctaHeights,
    },
    overflow: {
      viewportWidth: window.innerWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      overflowX: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - window.innerWidth,
    },
    consoleRiskHint: 'Run browse console separately if this metric fails; this script focuses on layout metrics.'
  });
})()
"""


def free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind(("127.0.0.1", 0))
        return int(sock.getsockname()[1])


def run(cmd: list[str], *, cwd: Path = ROOT, timeout: int = 45, check: bool = True) -> subprocess.CompletedProcess[str]:
    proc = subprocess.run(cmd, cwd=cwd, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, timeout=timeout)
    if check and proc.returncode != 0:
        raise RuntimeError(f"Command failed ({proc.returncode}): {' '.join(cmd)}\n{proc.stdout}")
    return proc


def extract_json(output: str) -> dict:
    match = re.search(r"\{.*\}", output, flags=re.S)
    if not match:
        raise ValueError(f"No JSON object found in output:\n{output}")
    return json.loads(match.group(0))


def main() -> int:
    if not GSTACK_BROWSE.exists():
        print(f"Missing gstack browse binary: {GSTACK_BROWSE}", file=sys.stderr)
        return 2

    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    out_dir = ROOT / ".gstack" / "design-reports" / f"component-qa-{timestamp}"
    shots_dir = out_dir / "screenshots"
    out_dir.mkdir(parents=True, exist_ok=True)
    shots_dir.mkdir(parents=True, exist_ok=True)
    metrics_file = out_dir / "metrics-eval.js"
    metrics_file.write_text(METRICS_JS, encoding="utf-8")

    port = free_port()
    server = subprocess.Popen(
        [sys.executable, "-m", "http.server", str(port), "--bind", "127.0.0.1"],
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )
    try:
        time.sleep(0.8)
        if server.poll() is not None:
            stdout = server.stdout.read() if server.stdout else ""
            raise RuntimeError(f"Local server failed to start:\n{stdout}")

        results = []
        failures = []
        base = f"http://127.0.0.1:{port}"
        for route in ROUTES:
            for viewport in VIEWPORTS:
                slug = route["path"].strip("/").replace("/", "-").replace(".html", "")
                shot = shots_dir / f"{slug}-{viewport['name']}.png"
                url = base + route["path"]
                record = {"route": route, "viewportName": viewport["name"], "url": url, "screenshot": str(shot.relative_to(ROOT))}
                try:
                    run([str(GSTACK_BROWSE), "viewport", viewport["size"]])
                    run([str(GSTACK_BROWSE), "goto", url], timeout=60)
                    run([str(GSTACK_BROWSE), "wait", "--load"], timeout=20, check=False)
                    metrics = extract_json(run([str(GSTACK_BROWSE), "eval", str(metrics_file)], timeout=30).stdout)
                    record["metrics"] = metrics
                    shot_proc = run([str(GSTACK_BROWSE), "screenshot", str(shot), "--selector", route["selector"]], timeout=45, check=False)
                    record["screenshotExitCode"] = shot_proc.returncode
                    if shot_proc.returncode != 0:
                        record["screenshotError"] = shot_proc.stdout[-1000:]
                    results.append(record)

                    overflow = metrics["overflow"]["overflowX"]
                    min_cta = metrics["ctas"]["minHeight"]
                    meta = metrics["meta"]
                    if overflow > 1:
                        failures.append(f"{route['path']} {viewport['name']}: horizontal overflow {overflow}px")
                    if min_cta is not None and min_cta < 44:
                        failures.append(f"{route['path']} {viewport['name']}: CTA touch target below 44px ({min_cta}px)")
                    if route["variant"] == "process" and viewport["name"] == "mobile" and metrics["heroRect"]["height"] > metrics["viewport"]["height"] * 1.25:
                        failures.append(
                            f"{route['path']} {viewport['name']}: process hero too tall ({round(metrics['heroRect']['height'], 1)}px for {metrics['viewport']['height']}px viewport)"
                        )
                    if "subpage-meta-row--4" in (meta.get("rowClass") or ""):
                        allowed_rows = ([4], [2, 2]) if viewport["name"] == "desktop" else ([2, 2], [1, 1, 1, 1])
                        if meta.get("visibleRows") not in allowed_rows:
                            failures.append(
                                f"{route['path']} {viewport['name']}: 4-meta layout rendered as {meta.get('visibleRows')}, expected one of {allowed_rows}"
                            )
                except Exception as exc:  # keep collecting other routes
                    record["error"] = str(exc)
                    results.append(record)
                    failures.append(f"{route['path']} {viewport['name']}: {exc}")

        (out_dir / "metrics.json").write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")

        lines = [
            "# RLC Component QA Report",
            "",
            f"Generated: `{timestamp}`",
            f"Base URL: `{base}`",
            "",
            "## Summary",
            "",
            f"- Checked routes: {len(ROUTES)}",
            f"- Viewports per route: {', '.join(v['name'] + ' ' + v['size'] for v in VIEWPORTS)}",
            f"- Metric records: {len(results)}",
            f"- Failures: {len(failures)}",
            "",
        ]
        if failures:
            lines += ["## Failures", ""] + [f"- {f}" for f in failures] + [""]
        else:
            lines += ["## Failures", "", "None. Layout metric gates passed for this run.", ""]

        lines += ["## Per-route metrics", ""]
        for item in results:
            route = item["route"]["path"]
            viewport = item["viewportName"]
            if "metrics" not in item:
                lines.append(f"- `{route}` `{viewport}`: ERROR `{item.get('error', 'unknown')}`")
                continue
            m = item["metrics"]
            lines.append(
                f"- `{route}` `{viewport}` `{item['route']['variant']}`: "
                f"heroHeight={round(m['heroRect']['height'], 1) if m.get('heroRect') else 'n/a'}px, "
                f"overflowX={m['overflow']['overflowX']}px, "
                f"meta={m['meta']['count']} rows={m['meta']['visibleRows']}, "
                f"ctas={m['ctas']['count']} minCta={m['ctas']['minHeight']}px, "
                f"gaps={m['gaps']}, screenshot=`{item['screenshot']}`"
            )

        lines += ["", "## Files", "", "- `metrics.json`", "- `screenshots/*.png`", ""]
        (out_dir / "REPORT.md").write_text("\n".join(lines), encoding="utf-8")

        print(json.dumps({
            "report_dir": str(out_dir),
            "report": str(out_dir / "REPORT.md"),
            "metrics": str(out_dir / "metrics.json"),
            "screenshots": str(shots_dir),
            "failures": failures,
            "records": len(results),
        }, ensure_ascii=False, indent=2))
        return 1 if failures else 0
    finally:
        server.terminate()
        try:
            server.wait(timeout=3)
        except subprocess.TimeoutExpired:
            server.kill()


if __name__ == "__main__":
    raise SystemExit(main())
