import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arthur Nilo — Links",
  description:
    "Contatos e links de Arthur Nilo — portfólio, GitHub, LinkedIn e e-mail.",
};

export default function LinksLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
