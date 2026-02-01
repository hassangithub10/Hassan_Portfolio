"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-charcoal">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10"></div>
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[120px] bg-blue-900/30"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[100px] bg-lime/10"></div>
            </div>

            <div className="relative z-10 text-center px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-[12rem] md:text-[20rem] font-heading font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent leading-none select-none"
                >
                    404
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="space-y-6 -mt-10 md:-mt-20 relative"
                >
                    <h2 className="text-2xl md:text-4xl text-white font-light tracking-wide">
                        Signal Lost in the Void
                    </h2>
                    <p className="text-white/40 max-w-md mx-auto">
                        The frequency you are looking for does not exist or has been moved to another dimension.
                    </p>

                    <div className="pt-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-lime text-charcoal rounded-full font-bold hover:scale-105 transition-transform"
                        >
                            Return to Base
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
