"use client";

import ModalProvider from "@/components/modal/ModalProvider";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

interface ProvidersProps {
	children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
	return (
		<SessionProvider
			refetchInterval={300}
			// refetchWhenOffline={false}
			// session={session}
			refetchOnWindowFocus={false}
		>
			<ToastContainer
				autoClose={6000}
				pauseOnHover
				newestOnTop
				position="top-center"
				closeButton={false}
				hideProgressBar
			/>
			<ModalProvider />

			{children}
		</SessionProvider>
	);
}
