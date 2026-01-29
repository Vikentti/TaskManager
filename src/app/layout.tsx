import type {Metadata} from 'next';
import {Lexend_Deca} from 'next/font/google';
import './globals.scss';
import {SITE_NAME} from "@/shared/constants/seo.constants";
import {Providers} from "@/app/providers";
import {Toaster} from "sonner";
import NavPanel from "@/widgets/layout-navigation/NavPanel/NavPanel";
import {headers} from "next/headers";

const lex = Lexend_Deca({
  variable: '--font-lex',
  subsets: ['latin'],
  weight: ['700', '600', '400'],
  display: "swap",
  style: "normal"
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: 'Productive tool for managing your task project-wise conveniently',
};




export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${lex.variable}`}>

    <Providers>
      <NavPanel/>
      {children}

      <Toaster
        theme="dark"
        position='bottom-right'
        duration={1500}
      />
    </Providers>
    </body>
    </html>
  );
}
