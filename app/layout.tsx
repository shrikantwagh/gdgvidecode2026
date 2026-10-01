import type { Metadata } from "next";import "./globals.css";
export const metadata:Metadata={title:"Fourfold — A friendly rivalry",description:"Invite a friend to a live two-player game of connect four.",icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
