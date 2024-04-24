"use client";

import Script from "next/script";

const SCRIPT = "https://penkle.com/scripts/penkle.min.js";

type Props = {
  domain: string;
};

export function PenkleAnalytics({ domain }: Props) {
  return <Script async defer data-domain={domain} src={SCRIPT} />;
}
