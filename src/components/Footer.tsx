import React from "react";
import Link from "next/link";
import { footerLinks } from "@/constant";

type FooterProps = {
  title: string;
  links: Array<string>;
};

const FooterColumn = ({ title, links }: FooterProps) => (
  <div className=" mt-20 grid grid-cols-1 ">
    <h3 className="font-semibold">{title}</h3>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link) => (
        <Link href="/" key={link}>
          {link}
        </Link>
      ))}
    </ul>
  </div>
);

function Footer() {
  return (
    <div className="bg-slate-100 mt-32">
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-2 md:grid-cols-3">
          <div className="flex gap-12 justify-center">
            <FooterColumn
              title={footerLinks[0].title}
              links={footerLinks[0].links}
            />
          </div>
          <div className="flex gap-4 justify-center">
            <FooterColumn
              title={footerLinks[1].title}
              links={footerLinks[1].links}
            />
          </div>
          <div className="flex gap-4 justify-center">
            <FooterColumn
              title={footerLinks[2].title}
              links={footerLinks[2].links}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
