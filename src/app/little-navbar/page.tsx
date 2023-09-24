import NavBarModal from "@/components/NavBarModal";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import SideBar from "@/components/SideBar";

const littleNavbar = async () => {
  return (
    <NavBarModal>
      <SideBar />
      {/* <motion.div 
				className='slide-in'
				initial={{ scaleY: 0 }}
				animate={{ scaleY: 0 }}
				exit={{ scaleY: 1 }}
				transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
			>
			</motion.div> */}
      {/* <motion.div
				className='slide-in'
				initial={{ scaleY: 0 }}
				animate={{ scaleY: 0 }}
				exit={{ scaleY: 1 }}
				transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
			></motion.div>
		</AnimatePresence> */}
    </NavBarModal>
  );
};

export default littleNavbar;
