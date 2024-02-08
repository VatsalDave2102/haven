import { Link } from "react-router-dom";
import { Logo } from "../index";

const Footer = () => {
  const company = ["Features", "Pricing", "Affiliate Program", "Press Kit"];
  const support = ["Account", "Help", "Contact Us", "Customer Support"];
  const legal = ["Terms & Conditions", "Privacy Policy", "Licensing"];

  const footerLinks = [
    { name: "Company", links: company },
    { name: "Support", links: support },
    { name: "Legals", links: legal },
  ];
  return (
    <footer className="relative overflow-hidden py-10 bg-secondary border-t-4 border-primary">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center gap-1">
                <Logo />
                <h1 className="font-bold text-3xl text-primary tracking-wide ">
                  aven
                </h1>
              </div>
              <div>
                <p className="text-sm text-primary">
                  &copy; Copyright 2023. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>
          {footerLinks.map((linkHeader) => (
            <div
              className="w-full p-6 md:w-1/2 lg:w-2/12"
              key={linkHeader.name}
            >
              <div className="h-full">
                <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-primary">
                  {linkHeader.name}
                </h3>
                <ul>
                  {linkHeader.links.map((link) => (
                    <li className="mb-4" key={link}>
                      <Link
                        className=" text-base font-medium text-slate-400 hover:text-primary transition"
                        to="/"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
