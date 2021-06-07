import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { twCascade } from "@mariusmarais/tailwind-cascade";

const convertBreadcrumb = (string = "") => {
  const cleansedStr = string
    .replace(/-/g, " ")
    .replace(/oe/g, "ö")
    .replace(/ae/g, "ä")
    .replace(/ue/g, "ü")
    .toLowerCase();
  return cleansedStr.replace(/^./, cleansedStr[0]?.toUpperCase() || "");
};

const Breadcrumbs = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.replace(/\?.*$/, "").split("/");
      linkPath.shift();

      const pathArray = linkPath
        .filter((a) => a !== "")
        .map((path, i) => {
          return {
            breadcrumb: path,
            href: "/" + linkPath.slice(0, i + 1).join("/"),
          };
        });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav aria-label="breadcrumbs">
      <ol className={`flex flex-row justify-items-start items-center py-5`}>
        <li>
          <Link href={"/"}>
            <span className={breadcrumbs.length ? "text-gray-400" : ""}>
              {convertBreadcrumb("HOME")}
            </span>
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, i) => {
          return (
            <li key={breadcrumb.href} className={`flex flex-row items-center`}>
              <span className={`text-gray-400 px-2`}>{">"}</span>
              <Link href={breadcrumb.href}>
                <a
                  className={twCascade(
                    i !== breadcrumbs.length - 1 && "text-gray-400"
                  )}
                >
                  {convertBreadcrumb(breadcrumb.breadcrumb)}
                </a>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
